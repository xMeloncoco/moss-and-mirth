import React from 'react'
import { useGameStore } from '../../store/gameStore'

const SUITS = [
  { key:'cups',      label:'Community',  emoji:'🫖', color:'bg-blue-400' },
  { key:'pentacles', label:'Resources',  emoji:'🪙', color:'bg-green-400' },
  { key:'wands',     label:'Ambition',   emoji:'🪄', color:'bg-orange-400' },
  { key:'swords',    label:'Resilience', emoji:'⚔️',  color:'bg-slate-400' },
]

const MIN = -5
const MAX = 20
const RANGE = MAX - MIN  // 25

export default function HarmonyTracker() {
  const harmony = useGameStore(s => s.gameState?.harmony ?? {})

  return (
    <div className="flex flex-col gap-3">
      {SUITS.map(({ key, label, emoji, color }) => {
        const value = harmony[key] ?? 0
        const pct   = Math.max(0, Math.min(100, ((value - MIN) / RANGE) * 100))
        const atCrisis   = value <= 0
        const nearEnd    = value >= 18

        return (
          <div key={key} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm flex items-center gap-1.5">
                <span>{emoji}</span>
                <span className={atCrisis ? 'text-danger' : nearEnd ? 'text-gold' : 'text-cream'}>
                  {label}
                </span>
              </span>
              <span className={`font-body text-sm font-semibold tabular-nums
                ${atCrisis ? 'text-danger' : nearEnd ? 'text-gold' : 'text-cream'}`}>
                {value > 0 ? `+${value}` : value}
              </span>
            </div>

            {/* Bar track */}
            <div className="h-2 bg-parchment/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-400 ease-out ${color} ${atCrisis ? 'opacity-40' : ''}`}
                style={{ width: `${pct}%` }}
              />
            </div>

            {atCrisis && (
              <p className="font-body text-danger text-xs">⚠ Crisis — this pillar has crumbled.</p>
            )}
            {nearEnd && (
              <p className="font-body text-gold text-xs">✦ Approaching the end of your story.</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
