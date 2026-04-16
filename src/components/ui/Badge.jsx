/**
 * Badge.jsx
 * Small label badge. suit prop adds suit-specific colour.
 */
import React from 'react'

const suitColors = {
  cups:      'bg-blue-900/50 text-blue-200',
  pentacles: 'bg-green-900/50 text-green-200',
  wands:     'bg-orange-900/50 text-orange-200',
  swords:    'bg-slate-700/50 text-slate-200',
  major:     'bg-gold/20 text-gold',
}

export default function Badge({ children, suit, className = '' }) {
  const color = suitColors[suit] ?? 'bg-parchment/10 text-cream'
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-body ${color} ${className}`}>
      {children}
    </span>
  )
}
