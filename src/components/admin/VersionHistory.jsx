/**
 * VersionHistory.jsx
 * Sidebar component showing published content snapshots.
 * Snapshots are loaded by AdminDashboard; this component just reads them.
 */
import React from 'react'
import { useAdminStore } from '../../store/adminStore'

function formatDate(isoString) {
  const d = new Date(isoString)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function VersionHistory() {
  const snapshots = useAdminStore(s => s.snapshots)
  const snapshotsLoading = useAdminStore(s => s.snapshotsLoading)

  if (snapshotsLoading) {
    return (
      <div className="space-y-2 p-1">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-14 rounded-lg bg-white/5 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!snapshots.length) {
    return (
      <p className="font-body text-sage text-sm italic px-1 py-3">
        No versions published yet.
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {snapshots.map((snap, idx) => (
        <li
          key={snap.id}
          className="rounded-lg border border-gold/15 bg-white/5 px-3 py-2.5 flex flex-col gap-0.5"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-sm text-cream leading-tight truncate">
              {snap.label || 'Untitled'}
            </span>
            {idx === 0 && (
              <span className="shrink-0 inline-block px-1.5 py-0.5 rounded text-xs font-body bg-gold text-forest font-semibold">
                Current
              </span>
            )}
          </div>
          <span className="font-body text-xs text-sage">
            {formatDate(snap.created_at)}
          </span>
          <span className="font-body text-xs text-sage/70">
            {snap.gameCount === 1 ? '1 game' : `${snap.gameCount} games`}
          </span>
        </li>
      ))}
    </ul>
  )
}
