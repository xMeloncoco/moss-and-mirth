/**
 * OracleTableEditor.jsx
 * Edits draft.oracle_tables_data — expandable tables with inline editable entries.
 */
import React, { useState } from 'react'
import { useAdminStore } from '../../store/adminStore'
import Button from '../ui/Button'

// ── Small inline text input (single-line or multiline) ──────────────────────
function InlineField({ value, onChange, multiline = false, placeholder = '', className = '' }) {
  const shared = `
    w-full bg-transparent border-b border-gold/20 focus:border-gold/50
    font-body text-sm text-cream placeholder:text-sage/50
    focus:outline-none py-0.5 transition-colors
    ${className}
  `
  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className={`${shared} resize-none`}
      />
    )
  }
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={shared}
    />
  )
}

// ── Single oracle table ─────────────────────────────────────────────────────
function OracleTable({ table, index, total, onUpdate, onMove, onDelete }) {
  const [expanded, setExpanded] = useState(true)

  function updateField(field, val) {
    onUpdate({ ...table, [field]: val })
  }

  function updateEntry(entryId, newText) {
    onUpdate({
      ...table,
      entries: table.entries.map(e => e.id === entryId ? { ...e, text: newText } : e),
    })
  }

  function deleteEntry(entryId) {
    onUpdate({
      ...table,
      entries: table.entries.filter(e => e.id !== entryId),
    })
  }

  function addEntry() {
    const newEntry = { id: `entry_${Date.now()}_${Math.random().toString(36).slice(2)}`, text: '' }
    onUpdate({ ...table, entries: [...(table.entries ?? []), newEntry] })
  }

  return (
    <div className="rounded-xl border border-gold/20 bg-white/5 overflow-hidden">
      {/* Table header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5">
        {/* Reorder buttons */}
        <div className="flex flex-col gap-0.5 shrink-0">
          <button
            onClick={() => onMove(index, -1)}
            disabled={index === 0}
            className="text-sage hover:text-cream disabled:opacity-30 text-xs leading-none px-0.5"
            title="Move up"
          >
            ▲
          </button>
          <button
            onClick={() => onMove(index, 1)}
            disabled={index === total - 1}
            className="text-sage hover:text-cream disabled:opacity-30 text-xs leading-none px-0.5"
            title="Move down"
          >
            ▼
          </button>
        </div>

        {/* Table name */}
        <div className="flex-1 min-w-0">
          <InlineField
            value={table.name ?? ''}
            onChange={val => updateField('name', val)}
            placeholder="Table name…"
            className="font-display text-base text-gold"
          />
        </div>

        {/* Expand toggle & delete */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="font-body text-xs text-sage/60 mr-1">
            {(table.entries ?? []).length} entries
          </span>
          <button
            onClick={() => setExpanded(x => !x)}
            className="px-2 py-1 rounded text-sage hover:text-cream text-sm transition-colors"
            title={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? '▾' : '▸'}
          </button>
          <button
            onClick={onDelete}
            className="px-2 py-1 rounded text-danger/70 hover:text-danger text-sm transition-colors"
            title="Delete table"
          >
            ✕
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* Description */}
          <div className="pt-2">
            <InlineField
              value={table.description ?? ''}
              onChange={val => updateField('description', val)}
              placeholder="Table description (optional)…"
              multiline
              className="text-sage text-xs"
            />
          </div>

          {/* Entries */}
          {(table.entries ?? []).length > 0 ? (
            <ul className="space-y-1">
              {table.entries.map((entry, ei) => (
                <li key={entry.id} className="flex items-start gap-2 group">
                  <span className="font-body text-sage/50 text-xs pt-1.5 w-5 shrink-0 text-right">
                    {ei + 1}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <InlineField
                      value={entry.text}
                      onChange={val => updateEntry(entry.id, val)}
                      placeholder="Entry text…"
                    />
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="text-danger/50 hover:text-danger text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    title="Delete entry"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-body text-sage/50 text-xs italic">No entries yet.</p>
          )}

          {/* Add entry */}
          <button
            onClick={addEntry}
            className="
              mt-1 inline-flex items-center gap-1.5
              font-body text-xs text-sage hover:text-gold
              border border-dashed border-gold/20 hover:border-gold/40
              rounded px-3 py-1.5 transition-colors
            "
          >
            ＋ Add Entry
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main editor ─────────────────────────────────────────────────────────────
export default function OracleTableEditor() {
  const draft = useAdminStore(s => s.draft)
  const setDraftOracleTables = useAdminStore(s => s.setDraftOracleTables)

  const tables = draft?.oracle_tables_data ?? []

  if (!draft) {
    return (
      <div className="space-y-4">
        {[1, 2].map(i => (
          <div key={i} className="h-24 rounded-xl bg-white/5 animate-pulse" />
        ))}
      </div>
    )
  }

  function updateTable(idx, updated) {
    const next = tables.map((t, i) => (i === idx ? updated : t))
    setDraftOracleTables(next)
  }

  function deleteTable(idx) {
    setDraftOracleTables(tables.filter((_, i) => i !== idx))
  }

  function moveTable(idx, direction) {
    const next = [...tables]
    const swapIdx = idx + direction
    if (swapIdx < 0 || swapIdx >= next.length) return
    ;[next[idx], next[swapIdx]] = [next[swapIdx], next[idx]]
    setDraftOracleTables(next)
  }

  function addTable() {
    const newTable = {
      id: `table_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      name: '',
      description: '',
      entries: [],
    }
    setDraftOracleTables([...tables, newTable])
  }

  return (
    <div className="space-y-4">
      {tables.length === 0 && (
        <p className="font-body text-sage italic text-sm py-2">
          No oracle tables yet. Add one below.
        </p>
      )}

      {tables.map((table, idx) => (
        <OracleTable
          key={table.id}
          table={table}
          index={idx}
          total={tables.length}
          onUpdate={updated => updateTable(idx, updated)}
          onMove={(i, dir) => moveTable(i, dir)}
          onDelete={() => deleteTable(idx)}
        />
      ))}

      <div className="pt-2">
        <Button variant="secondary" onClick={addTable}>
          ＋ Add New Table
        </Button>
      </div>
    </div>
  )
}
