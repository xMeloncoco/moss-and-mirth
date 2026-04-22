import React from 'react'
import { useGameStore } from '../../store/gameStore'

const STATES = {
  saved:  { dot: 'bg-sage',        label: 'Saved' },
  saving: { dot: 'bg-gold animate-pulse', label: 'Saving…' },
  error:  { dot: 'bg-danger',      label: 'Save failed' },
}

export default function SaveIndicator({ className = '' }) {
  const status = useGameStore(s => s.saveStatus)
  const { dot, label } = STATES[status] ?? STATES.saved
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className={`w-2 h-2 rounded-full ${dot}`} />
      <span className="font-body text-sage text-xs">{label}</span>
    </div>
  )
}
