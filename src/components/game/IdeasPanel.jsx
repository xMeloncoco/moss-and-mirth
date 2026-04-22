/**
 * IdeasPanel.jsx
 * Manages community project ideas — create, track progress, celebrate completion.
 */
import React, { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { useToast } from '../../store/toastStore'

const SIZE_OPTIONS = [
  { label: 'Small  (1 moment)',  value: 'Small',  moments: 1 },
  { label: 'Normal (2 moments)', value: 'Normal', moments: 2 },
  { label: 'Big    (3 moments)', value: 'Big',    moments: 3 },
]

function ProgressBar({ value, max }) {
  const pct = max > 0 ? Math.round(((max - value) / max) * 100) : 100
  return (
    <div className="h-2 bg-parchment/10 rounded-full overflow-hidden mt-2">
      <div
        className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

function IdeaCard({ idea, gameState }) {
  const daysLeft = idea.momentsLeft
  const totalDays = idea.momentsTotal

  return (
    <div className="bg-parchment/5 border border-gold/20 rounded-xl p-4 flex flex-col gap-1.5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-cream text-sm leading-snug">{idea.title}</h3>
        <span className="shrink-0 font-body text-sage text-xs border border-sage/30 rounded px-1.5 py-0.5">
          {idea.size}
        </span>
      </div>

      {idea.resourceCost && (
        <p className="font-body text-sage text-xs">
          Needs: <span className="text-cream/80">{idea.resourceCost}</span>
        </p>
      )}

      <div>
        <div className="flex justify-between items-center">
          <span className="font-body text-sage text-xs">Progress</span>
          <span className="font-body text-cream text-xs tabular-nums">
            {totalDays - daysLeft}/{totalDays} days
          </span>
        </div>
        <ProgressBar value={daysLeft} max={totalDays} />
      </div>

      {daysLeft === 1 && (
        <p className="font-body text-gold text-xs mt-0.5">✦ Almost done!</p>
      )}
    </div>
  )
}

function CompletedCard({ idea }) {
  return (
    <div className="bg-parchment/5 border border-gold/30 rounded-xl p-4 flex items-center gap-3 opacity-80">
      <span className="text-gold text-lg shrink-0">✓</span>
      <div className="flex-1 min-w-0">
        <p className="font-display text-cream text-sm leading-snug truncate">{idea.title}</p>
        {idea.completedDay != null && (
          <p className="font-body text-sage text-xs mt-0.5">Completed day {idea.completedDay}</p>
        )}
      </div>
      <span className="shrink-0 font-body text-sage text-xs border border-sage/20 rounded px-1.5 py-0.5">
        {idea.size}
      </span>
    </div>
  )
}

export default function IdeasPanel() {
  const { gameState, addIdea } = useGameStore()
  const addToast = useToast()

  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [size, setSize] = useState('Normal')
  const [resourceCost, setResourceCost] = useState('')
  const [error, setError] = useState('')

  const ideas = gameState?.ideas ?? []
  const active = ideas.filter(i => !i.completed)
  const completed = ideas.filter(i => i.completed)

  // Fire celebration toast for ideas that are newly at 0 but show as completed
  // (advanceDay marks them; we surface a toast here on next render if they just landed)
  React.useEffect(() => {
    const justDone = ideas.filter(
      i => i.completed && i.completedDay === (gameState?.dayCount ?? 1)
    )
    if (justDone.length > 0) {
      justDone.forEach(idea => {
        addToast(`🎉 "${idea.title}" is complete!`, 'success', 5000)
      })
    }
    // Only run when the ideas array reference changes (new data from store)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ideas])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) { setError('Please enter a name for the idea.'); return }
    setError('')

    const sizeOpt = SIZE_OPTIONS.find(o => o.value === size) ?? SIZE_OPTIONS[1]
    addIdea({
      id: crypto.randomUUID(),
      title: trimmed,
      size,
      momentsTotal: sizeOpt.moments,
      momentsLeft: sizeOpt.moments,
      resourceCost: resourceCost.trim() || null,
      completed: false,
      completedDay: null,
    })

    addToast(`Added idea: "${trimmed}"`, 'success')
    setTitle('')
    setSize('Normal')
    setResourceCost('')
    setShowForm(false)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-gold text-base">Community Ideas</h2>
        <button
          onClick={() => setShowForm(v => !v)}
          className="font-body text-sm text-gold border border-gold/40 rounded-md px-3 py-1
            hover:bg-gold/10 transition-colors"
        >
          {showForm ? '✕ Cancel' : '＋ New Idea'}
        </button>
      </div>

      {/* Inline form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-parchment/5 border border-gold/25 rounded-xl p-4 flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1">
            <label className="font-body text-sage text-xs uppercase tracking-wide">
              Idea name
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Build a community garden…"
              autoFocus
              className="bg-forest border border-gold/20 rounded-lg px-3 py-2 font-body text-cream
                text-sm focus:outline-none focus:border-gold placeholder:text-sage/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-body text-sage text-xs uppercase tracking-wide">
              Size
            </label>
            <select
              value={size}
              onChange={e => setSize(e.target.value)}
              className="bg-forest border border-gold/20 rounded-lg px-3 py-2 font-body text-cream
                text-sm focus:outline-none focus:border-gold"
            >
              {SIZE_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-body text-sage text-xs uppercase tracking-wide">
              Resource cost <span className="normal-case text-sage/60">(optional)</span>
            </label>
            <input
              type="text"
              value={resourceCost}
              onChange={e => setResourceCost(e.target.value)}
              placeholder="3 timber, 1 stonemason…"
              className="bg-forest border border-gold/20 rounded-lg px-3 py-2 font-body text-cream
                text-sm focus:outline-none focus:border-gold placeholder:text-sage/40"
            />
          </div>

          {error && (
            <p className="font-body text-danger text-xs">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gold text-forest font-body font-semibold py-2 rounded-lg
              hover:brightness-110 transition text-sm"
          >
            Add Idea
          </button>
        </form>
      )}

      {/* Active ideas */}
      {active.length === 0 && !showForm && (
        <p className="font-body text-sage text-sm text-center py-4">
          No active ideas yet.<br />
          <span className="text-sage/60 text-xs">Press ＋ New Idea to add one.</span>
        </p>
      )}

      {active.length > 0 && (
        <div className="flex flex-col gap-3">
          {active.map(idea => (
            <IdeaCard key={idea.id} idea={idea} gameState={gameState} />
          ))}
        </div>
      )}

      {/* Completed section */}
      {completed.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          <h3 className="font-body text-sage text-xs uppercase tracking-widest">
            Completed
          </h3>
          {completed.map(idea => (
            <CompletedCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  )
}
