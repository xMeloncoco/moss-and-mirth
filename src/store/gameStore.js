import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../lib/supabase'
import { getRemainingDeck } from '../lib/tarotEngine'
import { saveRecentGame } from '../lib/localStorage'

let saveTimer = null

const INITIAL_GAME_STATE = {
  characters: [],
  harmony: { cups: 0, pentacles: 0, wands: 0, swords: 0 },
  forestName: '',
  abundance: [],
  scarcity: [],
  ideas: [],
  cardHistory: [],
  dayCount: 1,
  communityLog: [],
  mapData: {},
}

export const useGameStore = create(
  persist(
    (set, get) => ({
      // ── Session ────────────────────────────────────────────────────────────
      sessionId: null,
      snapshotId: null,
      snapshotData: null,
      playerName: '',
      gameState: null,
      journal: '',

      // ── Ephemeral UI state ──────────────────────────────────────────────
      deck: [],
      saveStatus: 'saved', // 'saved' | 'saving' | 'error'

      // ── Session management ──────────────────────────────────────────────

      clearSession: () => {
        clearTimeout(saveTimer)
        set({
          sessionId: null, snapshotId: null, snapshotData: null,
          playerName: '', gameState: null, journal: '',
          deck: [], saveStatus: 'saved',
        })
      },

      loadSession: async (sessionId) => {
        const { data: session, error } = await supabase
          .from('game_sessions')
          .select('*')
          .eq('id', sessionId)
          .single()
        if (error) throw error

        const { data: snapshot, error: snapErr } = await supabase
          .from('content_snapshots')
          .select('*')
          .eq('id', session.snapshot_id)
          .single()
        if (snapErr) throw snapErr

        const gameState = session.game_state ?? { ...INITIAL_GAME_STATE }
        const deck = getRemainingDeck(snapshot, gameState.cardHistory ?? [])

        set({
          sessionId: session.id,
          snapshotId: session.snapshot_id,
          snapshotData: snapshot,
          playerName: session.player_name,
          gameState,
          journal: session.journal ?? '',
          deck,
          saveStatus: 'saved',
        })

        saveRecentGame(session.id, gameState.forestName, session.player_name)
      },

      createSession: async (playerName, initialGameState) => {
        const { data: snapshots, error: snapErr } = await supabase
          .from('content_snapshots')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
        if (snapErr) throw snapErr
        if (!snapshots?.length) throw new Error('No content snapshot found. Please seed the database first.')

        const snapshot = snapshots[0]
        const { data: session, error } = await supabase
          .from('game_sessions')
          .insert({
            player_name: playerName,
            snapshot_id: snapshot.id,
            game_state: initialGameState,
            journal: '',
          })
          .select()
          .single()
        if (error) throw error

        const deck = getRemainingDeck(snapshot, [])

        set({
          sessionId: session.id,
          snapshotId: snapshot.id,
          snapshotData: snapshot,
          playerName,
          gameState: initialGameState,
          journal: '',
          deck,
          saveStatus: 'saved',
        })

        saveRecentGame(session.id, initialGameState.forestName, playerName)
        return session
      },

      // ── Save ────────────────────────────────────────────────────────────

      saveNow: async () => {
        const { sessionId, gameState, journal } = get()
        if (!sessionId || !gameState) return
        set({ saveStatus: 'saving' })
        const { error } = await supabase
          .from('game_sessions')
          .update({ game_state: gameState, journal })
          .eq('id', sessionId)
        set({ saveStatus: error ? 'error' : 'saved' })
        if (error) console.error('[gameStore] save failed:', error)
      },

      save: () => {
        clearTimeout(saveTimer)
        saveTimer = setTimeout(() => get().saveNow(), 2000)
      },

      // ── Game actions ────────────────────────────────────────────────────

      applyHarmonyDelta: (deltas) => {
        const { gameState } = get()
        const harmony = { ...gameState.harmony }
        for (const [suit, delta] of Object.entries(deltas)) {
          harmony[suit] = Math.max(-5, Math.min(25, (harmony[suit] ?? 0) + delta))
        }
        const next = { ...gameState, harmony }
        set({ gameState: next })
        get().save()
        return harmony
      },

      addCardToHistory: (entry) => {
        const { gameState } = get()
        set({ gameState: { ...gameState, cardHistory: [...gameState.cardHistory, entry] } })
        get().save()
      },

      /**
       * Increment day, decrement momentsLeft for all active ideas.
       * Returns array of ideas that just hit 0 moments (newly done).
       */
      advanceDay: () => {
        const { gameState } = get()
        const ideas = gameState.ideas.map(idea => {
          if (idea.completed) return idea
          const momentsLeft = Math.max(0, (idea.momentsLeft ?? 0) - 1)
          const justCompleted = momentsLeft === 0 && (idea.momentsLeft ?? 0) > 0
          return justCompleted
            ? { ...idea, momentsLeft: 0, completed: true, completedDay: gameState.dayCount }
            : { ...idea, momentsLeft }
        })
        const newlyCompleted = ideas.filter(
          (idea, i) => idea.completed && !gameState.ideas[i].completed
        )
        set({ gameState: { ...gameState, dayCount: gameState.dayCount + 1, ideas } })
        get().save()
        return newlyCompleted
      },

      addIdea: (idea) => {
        const { gameState } = get()
        set({ gameState: { ...gameState, ideas: [...(gameState.ideas ?? []), idea] } })
        get().save()
      },

      completeIdea: (ideaId) => {
        const { gameState } = get()
        const ideas = gameState.ideas.map(idea =>
          idea.id === ideaId
            ? { ...idea, completed: true, completedDay: gameState.dayCount }
            : idea
        )
        set({ gameState: { ...gameState, ideas } })
        get().save()
      },

      addCommunityLog: (text) => {
        const { gameState } = get()
        const entry = { day: gameState.dayCount, text }
        set({ gameState: { ...gameState, communityLog: [...(gameState.communityLog ?? []), entry] } })
        get().save()
      },

      setJournal: (text) => {
        set({ journal: text })
        get().save()
      },

      updateMapData: (mapData) => {
        const { gameState } = get()
        set({ gameState: { ...gameState, mapData } })
        get().save()
      },

      /** Pop the top card from the in-memory deck and return it. */
      popDeckCard: () => {
        const { deck } = get()
        if (!deck.length) return null
        const [card, ...rest] = deck
        set({ deck: rest })
        return card
      },

      /** Re-initialise deck from snapshot minus drawn history (call after loadSession). */
      initDeck: () => {
        const { snapshotData, gameState } = get()
        if (!snapshotData || !gameState) return
        set({ deck: getRemainingDeck(snapshotData, gameState.cardHistory ?? []) })
      },
    }),
    {
      name: 'moss-mirth-game',
      partialize: state => ({
        sessionId: state.sessionId,
        snapshotId: state.snapshotId,
        snapshotData: state.snapshotData,
        playerName: state.playerName,
        gameState: state.gameState,
        journal: state.journal,
      }),
    }
  )
)
