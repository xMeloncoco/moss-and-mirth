/**
 * CommunityUpdate.jsx
 * Full-screen modal shown at end of day.
 * Celebrates completed ideas with confetti, lets player write a log note.
 */
import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { useGameStore } from '../../store/gameStore'

export default function CommunityUpdate({ completedIdeas = [], onDone }) {
  const { gameState, addCommunityLog } = useGameStore()
  const dayCount = gameState?.dayCount ?? 1
  const [note, setNote] = useState('')

  // Fire confetti once on mount when ideas were completed
  useEffect(() => {
    if (completedIdeas.length > 0) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#C8973A', '#F0E8D0', '#7FA085', '#1C3326'],
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSave() {
    const text = note.trim()
    // Always add a log entry (even if blank — caller can decide)
    addCommunityLog(text)
    onDone()
  }

  function handleSkip() {
    onDone()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      // Clicking the backdrop does nothing — user must choose Save or Skip
    >
      <div
        className="bg-forest border border-gold/30 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col gap-6 p-6 md:p-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Heading */}
        <div className="text-center">
          <p className="font-body text-sage text-sm uppercase tracking-widest mb-1">
            End of Day
          </p>
          <h2 className="font-display text-gold text-2xl leading-snug">
            Day {dayCount} is over.
          </h2>
          <p className="font-body text-cream/70 text-sm mt-2">
            What happened in the forest today?
          </p>
        </div>

        {/* Celebration section */}
        {completedIdeas.length > 0 && (
          <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 flex flex-col gap-3">
            <p className="font-display text-gold text-base text-center">
              🎉 {completedIdeas.length === 1 ? 'A project is complete!' : 'Projects complete!'}
            </p>
            <ul className="flex flex-col gap-2">
              {completedIdeas.map(idea => (
                <li
                  key={idea.id}
                  className="flex items-center gap-2 bg-forest/50 rounded-lg px-3 py-2"
                >
                  <span className="text-gold text-base">✓</span>
                  <div>
                    <p className="font-body text-cream text-sm">{idea.title}</p>
                    {idea.resourceCost && (
                      <p className="font-body text-sage/70 text-xs">{idea.resourceCost}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Note textarea */}
        <div className="flex flex-col gap-2">
          <label className="font-body text-sage text-xs uppercase tracking-wide">
            Community log note <span className="normal-case text-sage/60">(optional)</span>
          </label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="The first leaves are turning gold at the forest's edge…"
            rows={4}
            autoFocus
            className="bg-forest border border-gold/20 rounded-xl px-4 py-3 font-body text-cream
              text-sm leading-relaxed resize-none focus:outline-none focus:border-gold
              placeholder:text-sage/35 transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleSkip}
            className="font-body text-sm text-sage hover:text-cream border border-sage/30
              hover:border-cream/30 rounded-lg px-4 py-2 transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleSave}
            className="font-body text-sm font-semibold bg-gold text-forest rounded-lg
              px-6 py-2 hover:brightness-110 transition"
          >
            Save &amp; Continue
          </button>
        </div>
      </div>
    </div>
  )
}
