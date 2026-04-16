/**
 * gameStore.js
 * Zustand store for all in-memory game state.
 * Supabase sync logic added in Phase 2/3.
 */
import { create } from 'zustand'

const initialGameState = {
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

export const useGameStore = create((set) => ({
  // Active session
  sessionId: null,
  snapshotId: null,
  playerName: '',
  gameState: { ...initialGameState },

  // Deck (shuffled at game start, not persisted)
  deck: [],

  setSession: (sessionId, snapshotId, playerName) =>
    set({ sessionId, snapshotId, playerName }),

  setGameState: (gameState) => set({ gameState }),

  setDeck: (deck) => set({ deck }),

  resetGame: () =>
    set({
      sessionId: null,
      snapshotId: null,
      playerName: '',
      gameState: { ...initialGameState },
      deck: [],
    }),
}))
