import React, { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import LoginModal from './components/auth/LoginModal'
import AdminOnly from './components/auth/AdminOnly'
import { seedFirstSnapshot } from './scripts/seedSnapshot'

export default function App() {
  const { session, isAdmin, loading, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [seedStatus, setSeedStatus] = useState(null) // null | 'seeding' | 'done' | 'error'
  const [seedError, setSeedError] = useState('')

  async function handleSeed() {
    setSeedStatus('seeding')
    setSeedError('')
    try {
      await seedFirstSnapshot()
      setSeedStatus('done')
    } catch (err) {
      setSeedError(err.message ?? 'Seed failed — check console.')
      setSeedStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-forest flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gold/20">
        <div>
          <h1 className="font-display text-2xl text-gold leading-tight">Moss &amp; Mirth</h1>
          <p className="font-body text-sage text-xs mt-0.5">A forest community TTRPG companion</p>
        </div>
        <div className="flex items-center gap-3">
          {loading ? (
            <span className="font-body text-sage text-sm">…</span>
          ) : session ? (
            <>
              <span className="font-body text-sage text-sm hidden sm:inline">
                {isAdmin ? 'Admin' : session.user.email}
              </span>
              <button
                onClick={logout}
                className="font-body text-sm text-sage hover:text-cream transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="font-body text-sm text-sage hover:text-gold transition-colors"
            >
              Admin login
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-md">
          {/* Decorative icon */}
          <div className="text-6xl mb-6 select-none" aria-hidden>🍄</div>

          <h2 className="font-display text-4xl text-gold mb-3">
            Welcome to the Forest
          </h2>
          <p className="font-body text-cream/80 text-lg leading-relaxed mb-8">
            A solo TTRPG about building a small community, one tarot card at a time.
          </p>

          {/* Phase 1 status block */}
          <div className="bg-parchment/5 border border-gold/20 rounded-xl p-6 text-left mb-6">
            <h3 className="font-display text-gold text-lg mb-3">Phase 1 — Foundation</h3>
            <ul className="font-body text-sm space-y-2">
              <StatusLine label="Supabase client" done />
              <StatusLine label="Auth hook (login / logout)" done />
              <StatusLine label="AdminOnly wrapper" done />
              <StatusLine label="LoginModal" done />
              <StatusLine label="78-card deck (defaultCards)" done />
              <StatusLine label="Oracle tables (5 tables)" done />
              <StatusLine label="Rules text blocks" done />
              <StatusLine label="Seed script" done />
              <StatusLine
                label="First content snapshot in DB"
                done={seedStatus === 'done'}
                pending={seedStatus !== 'done'}
              />
            </ul>
          </div>

          {/* Admin-only: DB seed button */}
          <AdminOnly>
            {seedStatus === 'done' ? (
              <div className="font-body text-sm text-sage bg-sage/10 border border-sage/30 rounded-md px-4 py-3">
                Database seeded successfully. Ready for Phase 2.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleSeed}
                  disabled={seedStatus === 'seeding'}
                  className="
                    w-full bg-gold text-forest font-body font-semibold text-sm
                    rounded-md px-4 py-3 transition-all
                    hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {seedStatus === 'seeding' ? 'Seeding database…' : 'Seed database (run once)'}
                </button>
                {seedStatus === 'error' && (
                  <p className="font-body text-danger text-xs">{seedError}</p>
                )}
              </div>
            )}
          </AdminOnly>

          {/* Not logged in as admin */}
          {!session && (
            <p className="font-body text-sage text-xs mt-4">
              Log in as admin to seed the database.
            </p>
          )}
        </div>
      </main>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  )
}

function StatusLine({ label, done, pending }) {
  return (
    <li className="flex items-center gap-2">
      <span className={done ? 'text-sage' : 'text-gold/40'}>
        {done ? '✓' : '○'}
      </span>
      <span className={done ? 'text-cream' : 'text-sage'}>{label}</span>
    </li>
  )
}
