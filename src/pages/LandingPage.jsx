import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { getRecentGames } from '../lib/localStorage'
import NewGameSetup from '../components/game/NewGameSetup'

export default function LandingPage() {
  const navigate = useNavigate()
  const { loadSession, clearSession } = useGameStore()

  const [view, setView] = useState('home') // 'home' | 'new' | 'continue'
  const [gameId, setGameId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const recentGames = getRecentGames()

  async function handleContinue(id) {
    const target = id || gameId.trim()
    if (!target) { setError('Please enter a Game ID.'); return }
    setLoading(true); setError('')
    try {
      await loadSession(target)
      navigate(`/game/${target}`)
    } catch (e) {
      setError('This forest could not be found. Check your Game ID.')
    } finally {
      setLoading(false)
    }
  }

  function handleNewGameComplete(sessionId) {
    navigate(`/game/${sessionId}`)
  }

  if (view === 'new') {
    return (
      <div className="min-h-screen bg-forest">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gold/20">
          <button onClick={() => setView('home')} className="font-body text-sage hover:text-cream text-sm">← Back</button>
          <h1 className="font-display text-gold text-xl">New Adventure</h1>
        </div>
        <NewGameSetup onComplete={handleNewGameComplete} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="text-7xl mb-6 select-none" aria-hidden>🍄</div>
        <h1 className="font-display text-5xl text-gold mb-2">Moss & Mirth</h1>
        <p className="font-body text-cream/70 text-base mb-10 leading-relaxed">
          A solo forest community TTRPG companion
        </p>

        {view === 'home' && (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => { clearSession(); setView('new') }}
              className="w-full bg-gold text-forest font-body font-semibold rounded-lg py-3 text-base hover:brightness-110 transition"
            >
              New Adventure
            </button>
            <button
              onClick={() => setView('continue')}
              className="w-full border border-gold/50 text-gold font-body rounded-lg py-3 text-base hover:bg-gold/10 transition"
            >
              Continue Adventure
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="font-body text-sage text-xs mt-2 hover:text-cream transition"
            >
              Admin
            </button>
          </div>
        )}

        {view === 'continue' && (
          <div className="flex flex-col gap-4 text-left">
            <h2 className="font-display text-gold text-xl text-center mb-1">Continue Your Story</h2>

            {recentGames.length > 0 && (
              <div className="flex flex-col gap-2 mb-2">
                <p className="font-body text-sage text-xs text-center">Recent games</p>
                {recentGames.map(g => (
                  <button
                    key={g.sessionId}
                    onClick={() => handleContinue(g.sessionId)}
                    disabled={loading}
                    className="border border-gold/20 rounded-lg px-4 py-3 text-left hover:border-gold/50 hover:bg-gold/5 transition"
                  >
                    <p className="font-body text-cream text-sm">{g.forestName || 'Unnamed forest'}</p>
                    <p className="font-body text-sage text-xs mt-0.5">{g.playerName} · {g.sessionId.slice(0,8)}…</p>
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="font-body text-cream text-sm">Enter Game ID</label>
              <input
                value={gameId}
                onChange={e => { setGameId(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleContinue()}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                className="bg-forest border border-gold/30 rounded-md px-3 py-2 font-body text-cream text-sm focus:outline-none focus:border-gold placeholder:text-sage/50"
              />
              {error && <p className="font-body text-danger text-xs">{error}</p>}
              <button
                onClick={() => handleContinue()}
                disabled={loading}
                className="w-full bg-gold text-forest font-body font-semibold rounded-lg py-2.5 text-sm hover:brightness-110 transition disabled:opacity-50"
              >
                {loading ? 'Loading…' : 'Continue'}
              </button>
              <button onClick={() => setView('home')} className="font-body text-sage text-xs text-center hover:text-cream">Back</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
