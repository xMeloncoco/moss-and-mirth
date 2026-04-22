/**
 * RulesEditor.jsx
 * Edits the four sections of draft.rules_text_data inline.
 */
import React, { useState, useEffect } from 'react'
import { useAdminStore } from '../../store/adminStore'

const SECTIONS = [
  { key: 'concept',       label: 'Concept' },
  { key: 'howToPlay',     label: 'How to Play' },
  { key: 'harmonyPoints', label: 'Harmony Points' },
  { key: 'endGame',       label: 'End Game' },
]

function RulesSection({ sectionKey, label, value, onChange }) {
  const [local, setLocal] = useState(value ?? '')

  // Sync if parent value changes (e.g. draft reloaded)
  useEffect(() => {
    setLocal(value ?? '')
  }, [value])

  function handleBlur() {
    if (local !== (value ?? '')) {
      onChange(sectionKey, local)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <label className="font-display text-gold text-sm tracking-wide">
          {label}
        </label>
        <span className="font-body text-sage/60 text-xs">
          {local.length.toLocaleString()} chars
        </span>
      </div>
      <textarea
        value={local}
        onChange={e => setLocal(e.target.value)}
        onBlur={handleBlur}
        rows={6}
        className="
          w-full rounded-md px-3 py-2.5 font-body text-sm text-cream leading-relaxed
          bg-white/5 border border-gold/20
          placeholder:text-sage/50
          focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40
          resize-y min-h-[9rem]
        "
        placeholder={`Enter ${label.toLowerCase()} text…`}
      />
    </div>
  )
}

export default function RulesEditor() {
  const draft = useAdminStore(s => s.draft)
  const setDraftRules = useAdminStore(s => s.setDraftRules)

  const rules = draft?.rules_text_data ?? {}

  function handleChange(key, value) {
    setDraftRules({ ...rules, [key]: value })
  }

  if (!draft) {
    return (
      <div className="space-y-6">
        {SECTIONS.map(s => (
          <div key={s.key} className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
            <div className="h-36 bg-white/5 rounded-md animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {SECTIONS.map(({ key, label }) => (
        <RulesSection
          key={key}
          sectionKey={key}
          label={label}
          value={rules[key]}
          onChange={handleChange}
        />
      ))}
    </div>
  )
}
