/**
 * HowToPlay.jsx
 * Full-screen modal showing the game's rules text from the content snapshot.
 */
import React, { useEffect } from 'react'
import { useGameStore } from '../../store/gameStore'

const SECTIONS = [
  { key: 'concept',        title: 'The Concept' },
  { key: 'howToPlay',      title: 'How to Play' },
  { key: 'harmonyPoints',  title: 'Harmony Points' },
  { key: 'endGame',        title: 'The End Game' },
]

function RulesSection({ title, body }) {
  if (!body) return null

  // Split on newlines and render each non-empty chunk as a paragraph
  const paragraphs = body
    .split(/\n+/)
    .map(p => p.trim())
    .filter(Boolean)

  return (
    <section className="flex flex-col gap-2">
      <h3 className="font-display text-gold text-lg">{title}</h3>
      {paragraphs.map((p, i) => (
        <p key={i} className="font-body text-cream/90 text-sm leading-relaxed">
          {p}
        </p>
      ))}
    </section>
  )
}

export default function HowToPlay({ onClose }) {
  const { snapshotData } = useGameStore()
  const rules = snapshotData?.rules_text_data ?? {}

  // Close on Escape
  useEffect(() => {
    function handler(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/70 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-forest border border-gold/30 rounded-2xl shadow-2xl w-full max-w-2xl my-8
          flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gold/20 shrink-0">
          <h2 className="font-display text-gold text-2xl">How to Play</h2>
          <button
            onClick={onClose}
            aria-label="Close rules"
            className="font-body text-sage hover:text-cream transition-colors text-sm border
              border-sage/30 hover:border-cream/30 rounded-lg px-3 py-1.5"
          >
            ✕ Close
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-6 flex flex-col gap-8">
          {SECTIONS.map(({ key, title }) => (
            <RulesSection key={key} title={title} body={rules[key]} />
          ))}

          {/* Empty state */}
          {SECTIONS.every(s => !rules[s.key]) && (
            <p className="font-body text-sage text-sm text-center py-8">
              No rules text found.<br />
              <span className="text-sage/60 text-xs">Ask the admin to add rules content.</span>
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gold/20 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="font-body text-sm bg-gold text-forest font-semibold px-6 py-2
              rounded-lg hover:brightness-110 transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
