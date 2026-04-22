/**
 * seedSnapshot.js
 * One-time setup script: seeds the first content_snapshot and content_drafts row.
 *
 * Run this ONCE after creating the Supabase tables.
 * You can call seedFirstSnapshot() from the browser console or via the
 * temporary Admin Setup screen shown in App.jsx before the DB is seeded.
 *
 * Must be called while logged in as admin (RLS enforces this).
 */
import { supabase } from '../lib/supabase'
import { defaultCards } from '../data/defaultCards'
import { defaultOracleTables } from '../data/defaultOracleTables'
import { defaultRules } from '../data/defaultRules'

export async function seedFirstSnapshot() {
  const payload = {
    cards_data: defaultCards,
    oracle_tables_data: defaultOracleTables,
    rules_text_data: defaultRules,
  }

  // Insert first content snapshot
  const { data: snapshot, error: snapshotError } = await supabase
    .from('content_snapshots')
    .insert({ label: 'v1.0 — initial release', ...payload })
    .select('id')
    .single()

  if (snapshotError) {
    console.error('Failed to create content_snapshot:', snapshotError)
    throw snapshotError
  }

  console.log('✓ content_snapshot created:', snapshot.id)

  // Check whether a draft row already exists (there should be exactly one)
  const { count } = await supabase
    .from('content_drafts')
    .select('id', { count: 'exact', head: true })

  if (count > 0) {
    console.log('✓ content_drafts row already exists — skipping draft seed.')
    return snapshot
  }

  // Insert the initial draft (same data as the snapshot)
  const { error: draftError } = await supabase
    .from('content_drafts')
    .insert(payload)

  if (draftError) {
    console.error('Failed to create content_drafts row:', draftError)
    throw draftError
  }

  console.log('✓ content_drafts row created.')
  return snapshot
}
