import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { useGameStore } from '../../store/gameStore'
import { exportJournal } from '../../lib/exportUtils'

const EPILOGUES = {
  cups:
    'Your community grew warm and full of life. Friendships deepened through every hardship. The forest will remember the kindness that lived here.',
  pentacles:
    'The forest thrived in abundance. Shelves were full, trades were fair, and no one went without. You built a place that could weather any season.',
  wands:
    'What was built here will stand for generations. Dreams became stone and timber, gardens and paths. The forest wears your mark with pride.',
  swords:
    'You weathered every storm together. Hard truths were spoken, conflicts faced with grace. The settlement stands resilient against anything the deep wood might send.',
}

export default function EndGameScreen({ onNewGame }) {
  const { gameState, journal, clearSession } = useGameStore()

  useEffect(() => {
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } })
  }, [])

  if (!gameState) return null

  const { characters, harmony, forestName, dayCount, cardHistory, ideas, communityLog } = gameState
  const completedIdeas = ideas.filter(i => i.completed)

  // Find peak harmony suit
  const peakSuit = Object.entries(harmony).sort((a,b) => b[1]-a[1])[0]?.[0] ?? 'cups'
  const epilogue = EPILOGUES[peakSuit]

  const harmonyPeaks = Object.entries(harmony).map(([s, v]) => ({
    suit: s, value: v,
    label: { cups:'Community', pentacles:'Resources', wands:'Ambition', swords:'Resilience' }[s],
  })).sort((a,b) => b.value - a.value)

  function handleExport() {
    exportJournal(journal, forestName)
  }

  function handleNewGame() {
    clearSession()
    onNewGame?.()
  }

  return (
    <div className="min-h-screen bg-forest overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-10">
        {/* Hero */}
        <div className="text-center">
          <div className="text-6xl mb-4 select-none">🍄</div>
          <h1 className="font-display text-4xl text-gold mb-3">Your story has been told,<br/>little creature.</h1>
          <p className="font-body text-cream/70 text-base">
            {forestName} · {dayCount - 1} days · {cardHistory.length} cards drawn
          </p>
        </div>

        {/* Epilogue */}
        <div className="bg-parchment/10 border border-gold/30 rounded-2xl p-6">
          <p className="font-display text-gold text-lg mb-3">Epilogue</p>
          <p className="font-body text-cream leading-relaxed">{epilogue}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Days Played"       value={dayCount - 1} />
          <StatCard label="Cards Drawn"       value={cardHistory.length} />
          <StatCard label="Ideas Completed"   value={completedIdeas.length} />
          <StatCard label="Ideas Remaining"   value={ideas.filter(i=>!i.completed).length} />
        </div>

        {/* Harmony peaks */}
        <div>
          <h2 className="font-display text-gold text-lg mb-4">Harmony at Close</h2>
          <div className="flex flex-col gap-3">
            {harmonyPeaks.map(({ suit, value, label }) => (
              <div key={suit} className="flex items-center gap-3">
                <span className="font-body text-cream text-sm w-24">{label}</span>
                <div className="flex-1 h-2 bg-parchment/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gold/70 rounded-full transition-all"
                    style={{ width: `${Math.max(0, Math.min(100, (value / 20) * 100))}%` }} />
                </div>
                <span className="font-body text-gold text-sm tabular-nums w-8 text-right">
                  {value > 0 ? `+${value}` : value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Characters */}
        <div>
          <h2 className="font-display text-gold text-lg mb-3">The Adventurers</h2>
          <div className="flex flex-col gap-2">
            {characters.map((c, i) => (
              <div key={i} className="font-body text-cream/80 text-sm">
                {c.name} the {c.species} {c.role}
              </div>
            ))}
          </div>
        </div>

        {/* Community log */}
        {communityLog.length > 0 && (
          <div>
            <h2 className="font-display text-gold text-lg mb-3">Community Chronicle</h2>
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-2">
              {communityLog.map((entry, i) => (
                <p key={i} className="font-body text-cream/70 text-sm">
                  <span className="text-sage">Day {entry.day}</span> — {entry.text}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button onClick={handleExport}
            className="w-full border border-gold/40 text-gold font-body font-semibold py-3 rounded-xl hover:bg-gold/10 transition">
            Export Journal as .txt
          </button>
          <button onClick={handleNewGame}
            className="w-full bg-gold text-forest font-body font-semibold py-3 rounded-xl hover:brightness-110 transition">
            Start New Adventure
          </button>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="bg-parchment/5 border border-gold/20 rounded-xl p-4 text-center">
      <p className="font-display text-gold text-2xl">{value}</p>
      <p className="font-body text-sage text-xs mt-1">{label}</p>
    </div>
  )
}
