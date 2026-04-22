/**
 * AdminDashboard.jsx
 * Top-level admin shell: nav bar, tabs, sidebar version history.
 */
import React, { useEffect, useState } from 'react'
import { useAdminStore } from '../../store/adminStore'
import { useAuth } from '../../hooks/useAuth'
import Tabs from '../ui/Tabs'
import Button from '../ui/Button'
import CardEditor from './CardEditor'
import OracleTableEditor from './OracleTableEditor'
import RulesEditor from './RulesEditor'
import VersionHistory from './VersionHistory'
import PublishModal from './PublishModal'

const TAB_NAMES = ['Cards', 'Oracle Tables', 'Rules']

// ── Save status dot ──────────────────────────────────────────────────────────

function SaveStatus() {
  const draftSaveStatus = useAdminStore(s => s.draftSaveStatus)
  const hasUnsavedChanges = useAdminStore(s => s.hasUnsavedChanges)
  const unsaved = hasUnsavedChanges()

  if (draftSaveStatus === 'saving') {
    return (
      <span className="flex items-center gap-1.5 font-body text-xs text-sage">
        <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
        Saving…
      </span>
    )
  }
  if (draftSaveStatus === 'error') {
    return (
      <span className="flex items-center gap-1.5 font-body text-xs text-danger">
        <span className="w-2 h-2 rounded-full bg-danger" />
        Save failed
      </span>
    )
  }
  if (unsaved) {
    return (
      <span className="flex items-center gap-1.5 font-body text-xs text-gold">
        <span className="w-2 h-2 rounded-full bg-gold" />
        Unsaved
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1.5 font-body text-xs text-sage">
      <span className="w-2 h-2 rounded-full bg-sage" />
      Saved
    </span>
  )
}

// ── Loading skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <div className="h-6 w-48 bg-white/10 rounded animate-pulse" />
      <div className="h-4 w-64 bg-white/5 rounded animate-pulse" />
      {[1, 2, 3].map(i => (
        <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
      ))}
    </div>
  )
}

// ── Main dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const loadDraft = useAdminStore(s => s.loadDraft)
  const loadSnapshots = useAdminStore(s => s.loadSnapshots)
  const draft = useAdminStore(s => s.draft)

  const { logout } = useAuth()

  const [activeTab, setActiveTab] = useState('Cards')
  const [publishOpen, setPublishOpen] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      setLoading(true)
      setLoadError(null)
      try {
        await Promise.all([loadDraft(), loadSnapshots()])
      } catch (err) {
        setLoadError(err.message ?? 'Failed to load admin data.')
      } finally {
        setLoading(false)
      }
    }
    init()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleLogout() {
    try {
      await logout()
    } catch {
      // swallow — auth state change will handle redirect
    }
  }

  return (
    <div className="min-h-screen bg-forest text-cream flex flex-col">
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className="border-b border-gold/20 bg-forest/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-14 gap-4">
          <h1 className="font-display text-lg text-gold tracking-wide shrink-0">
            Moss &amp; Mirth Admin
          </h1>

          <div className="flex items-center gap-3 sm:gap-4">
            <SaveStatus />

            <Button
              variant="primary"
              className="hidden sm:inline-flex text-xs px-3 py-1.5"
              onClick={() => setPublishOpen(true)}
              disabled={loading || !!loadError}
            >
              Publish Version
            </Button>

            <button
              onClick={() => setPublishOpen(true)}
              disabled={loading || !!loadError}
              className="sm:hidden text-gold text-sm font-body hover:text-gold/80 disabled:opacity-40"
              title="Publish Version"
            >
              ↑ Publish
            </button>

            <Button
              variant="ghost"
              className="text-xs px-3 py-1.5"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      {loadError ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <p className="font-display text-gold text-lg">Failed to load draft</p>
            <p className="font-body text-sage text-sm">{loadError}</p>
            <Button
              variant="secondary"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      ) : loading ? (
        <div className="flex-1 max-w-7xl mx-auto w-full">
          <LoadingSkeleton />
        </div>
      ) : (
        <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-0">
          {/* ── Main content ──────────────────────────────────────────── */}
          <main className="flex-1 min-w-0 px-4 sm:px-6 py-6">
            <Tabs
              tabs={TAB_NAMES}
              active={activeTab}
              onChange={setActiveTab}
            />

            <div className="mt-2">
              {activeTab === 'Cards' && <CardEditor />}
              {activeTab === 'Oracle Tables' && <OracleTableEditor />}
              {activeTab === 'Rules' && <RulesEditor />}
            </div>
          </main>

          {/* ── Version history sidebar / bottom ──────────────────────── */}
          <aside className="lg:w-64 xl:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-gold/15">
            <div className="px-4 py-5 lg:sticky lg:top-14 lg:max-h-[calc(100vh-3.5rem)] lg:overflow-y-auto">
              <h2 className="font-display text-gold text-sm tracking-wide mb-3">
                Version History
              </h2>
              <VersionHistory />
            </div>
          </aside>
        </div>
      )}

      {/* ── Publish modal ─────────────────────────────────────────────── */}
      <PublishModal
        open={publishOpen}
        onClose={() => setPublishOpen(false)}
      />
    </div>
  )
}
