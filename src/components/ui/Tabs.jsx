/**
 * Tabs.jsx
 * Simple controlled tabs component.
 *
 * Usage:
 *   <Tabs tabs={['Journal', 'Map']} active={tab} onChange={setTab} />
 */
import React from 'react'

export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 border-b border-gold/20 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 font-body text-sm transition-colors
            ${active === tab
              ? 'text-gold border-b-2 border-gold -mb-px'
              : 'text-sage hover:text-cream'
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
