import { create } from 'zustand'
import { supabase } from '../lib/supabase'

let draftTimer = null

export const useAdminStore = create((set, get) => ({
  // Draft state (mirrors content_drafts row)
  draftId: null,
  draft: null,           // { cards_data, oracle_tables_data, rules_text_data }
  savedDraft: null,      // last version saved to Supabase — compare for "unsaved" badge
  draftSaveStatus: 'saved', // 'saved' | 'saving' | 'error'

  // Version history
  snapshots: [],
  snapshotsLoading: false,

  // ── Load ────────────────────────────────────────────────────────────────

  loadDraft: async () => {
    const { data, error } = await supabase
      .from('content_drafts')
      .select('*')
      .limit(1)
      .single()
    if (error) throw error
    set({ draftId: data.id, draft: { ...data }, savedDraft: { ...data } })
  },

  loadSnapshots: async () => {
    set({ snapshotsLoading: true })
    const { data: snaps } = await supabase
      .from('content_snapshots')
      .select('id, label, created_at')
      .order('created_at', { ascending: false })

    // Count games per snapshot
    const counts = await Promise.all(
      (snaps ?? []).map(async s => {
        const { count } = await supabase
          .from('game_sessions')
          .select('id', { count: 'exact', head: true })
          .eq('snapshot_id', s.id)
        return { ...s, gameCount: count ?? 0 }
      })
    )
    set({ snapshots: counts, snapshotsLoading: false })
  },

  // ── Draft mutations ─────────────────────────────────────────────────────

  setDraftCards: (cards_data) => {
    set(s => ({ draft: { ...s.draft, cards_data } }))
    get().scheduleDraftSave()
  },

  setDraftOracleTables: (oracle_tables_data) => {
    set(s => ({ draft: { ...s.draft, oracle_tables_data } }))
    get().scheduleDraftSave()
  },

  setDraftRules: (rules_text_data) => {
    set(s => ({ draft: { ...s.draft, rules_text_data } }))
    get().scheduleDraftSave()
  },

  scheduleDraftSave: () => {
    clearTimeout(draftTimer)
    draftTimer = setTimeout(() => get().saveDraftNow(), 3000)
  },

  saveDraftNow: async () => {
    const { draftId, draft } = get()
    if (!draftId || !draft) return
    set({ draftSaveStatus: 'saving' })
    const { error } = await supabase
      .from('content_drafts')
      .update({
        cards_data: draft.cards_data,
        oracle_tables_data: draft.oracle_tables_data,
        rules_text_data: draft.rules_text_data,
        last_edited_at: new Date().toISOString(),
      })
      .eq('id', draftId)
    if (error) {
      set({ draftSaveStatus: 'error' })
      console.error('[adminStore] draft save failed:', error)
    } else {
      set({ draftSaveStatus: 'saved', savedDraft: { ...draft } })
    }
  },

  // ── Publish ─────────────────────────────────────────────────────────────

  publishVersion: async (label) => {
    const { draft } = get()
    if (!draft) throw new Error('No draft loaded')
    const { data, error } = await supabase
      .from('content_snapshots')
      .insert({
        label,
        cards_data: draft.cards_data,
        oracle_tables_data: draft.oracle_tables_data,
        rules_text_data: draft.rules_text_data,
      })
      .select()
      .single()
    if (error) throw error
    await get().loadSnapshots()
    return data
  },

  hasUnsavedChanges: () => {
    const { draft, savedDraft } = get()
    if (!draft || !savedDraft) return false
    return JSON.stringify(draft) !== JSON.stringify(savedDraft)
  },
}))
