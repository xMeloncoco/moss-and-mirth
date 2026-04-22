/**
 * InspirationTables.jsx
 * Oracle / inspiration tables. Roll individual tables or generate a full NPC.
 * Results are ephemeral; "Add to Journal" appends to the persistent journal.
 */
import React, { useState } from 'react'
import { useGameStore } from '../../store/gameStore'

// The 4 NPC table IDs expected from the snapshot
const NPC_TABLE_IDS = ['npc_species', 'npc_role', 'npc_trait', 'npc_quirk']

function pickRandom(entries) {
  if (!entries?.length) return null
  return entries[Math.floor(Math.random() * entries.length)]
}

function buildNPCSentence({ species, role, trait, quirk }) {
  if (!species && !role && !trait && !quirk) return null
  const parts = [
    species ? `A ${species}` : 'A creature',
    role ? `${role}` : null,
    trait ? `who is ${trait}` : null,
    quirk ? `and ${quirk}` : null,
  ].filter(Boolean)
  return parts.join(' ')
}

export default function InspirationTables() {
  const { snapshotData, journal, setJournal } = useGameStore()
  const tables = snapshotData?.oracle_tables_data ?? []

  // Per-table roll result: { [tableId]: string | null }
  const [results, setResults] = useState({})
  // Full NPC result
  const [npcResult, setNpcResult] = useState(null)
  // "Added" flash per result key
  const [addedKeys, setAddedKeys] = useState({})

  function rollTable(table) {
    const entry = pickRandom(table.entries)
    setResults(prev => ({ ...prev, [table.id]: entry?.text ?? null }))
  }

  function rollFullNPC() {
    const find = (id) => tables.find(t => t.id === id)
    const species = pickRandom(find(NPC_TABLE_IDS[0])?.entries)?.text ?? ''
    const role    = pickRandom(find(NPC_TABLE_IDS[1])?.entries)?.text ?? ''
    const trait   = pickRandom(find(NPC_TABLE_IDS[2])?.entries)?.text ?? ''
    const quirk   = pickRandom(find(NPC_TABLE_IDS[3])?.entries)?.text ?? ''
    const sentence = buildNPCSentence({ species, role, trait, quirk })
    setNpcResult(sentence)
  }

  function addToJournal(text, key) {
    if (!text) return
    const sep = journal ? '\n\n' : ''
    setJournal(journal + sep + text)
    setAddedKeys(prev => ({ ...prev, [key]: true }))
    setTimeout(() => setAddedKeys(prev => ({ ...prev, [key]: false })), 1800)
  }

  if (tables.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="font-body text-sage text-sm text-center">
          No oracle tables found.<br />
          <span className="text-sage/60 text-xs">Ask the admin to seed the content.</span>
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Full NPC generator */}
      <div className="bg-parchment/5 border border-gold/30 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-gold text-base">Generate Full NPC</h2>
          <button
            onClick={rollFullNPC}
            className="font-body text-sm bg-gold text-forest px-3 py-1.5 rounded-lg
              hover:brightness-110 transition font-semibold"
          >
            🎲 Roll NPC
          </button>
        </div>

        {npcResult ? (
          <div className="flex flex-col gap-3">
            <div className="bg-forest border border-gold/20 rounded-xl p-4">
              <p className="font-body text-cream text-sm leading-relaxed italic">
                "{npcResult}"
              </p>
            </div>
            <button
              onClick={() => addToJournal(npcResult, 'npc')}
              className={`font-body text-xs self-end border rounded px-3 py-1 transition-colors
                ${addedKeys['npc']
                  ? 'border-sage/50 text-sage'
                  : 'border-gold/30 text-gold hover:bg-gold/10'}`}
            >
              {addedKeys['npc'] ? '✓ Added' : '+ Add to Journal'}
            </button>
          </div>
        ) : (
          <p className="font-body text-sage/60 text-xs">
            Rolls Species, Role, Trait &amp; Quirk together.
          </p>
        )}
      </div>

      {/* Individual tables */}
      {tables.map(table => {
        const result = results[table.id]
        const addedKey = `table-${table.id}`
        return (
          <div
            key={table.id}
            className="bg-parchment/5 border border-gold/15 rounded-xl p-4 flex flex-col gap-3"
          >
            {/* Table header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-cream text-sm">{table.name}</h3>
                {table.description && (
                  <p className="font-body text-sage/70 text-xs mt-0.5">{table.description}</p>
                )}
              </div>
              <button
                onClick={() => rollTable(table)}
                className="shrink-0 font-body text-xs border border-gold/30 text-gold px-3 py-1
                  rounded-lg hover:bg-gold/10 transition-colors whitespace-nowrap"
              >
                🎲 Roll
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className="flex flex-col gap-2">
                <div className="bg-forest border border-gold/15 rounded-lg px-3 py-2.5">
                  <p className="font-body text-cream text-sm">{result}</p>
                </div>
                <button
                  onClick={() => addToJournal(result, addedKey)}
                  className={`font-body text-xs self-end border rounded px-3 py-1 transition-colors
                    ${addedKeys[addedKey]
                      ? 'border-sage/50 text-sage'
                      : 'border-gold/20 text-gold/70 hover:border-gold hover:text-gold'}`}
                >
                  {addedKeys[addedKey] ? '✓ Added' : '+ Add to Journal'}
                </button>
              </div>
            )}

            {/* Entry count hint */}
            <p className="font-body text-sage/40 text-xs">
              {table.entries?.length ?? 0} entries
            </p>
          </div>
        )
      })}
    </div>
  )
}
