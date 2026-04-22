import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import GameBoard from '../components/game/GameBoard'

export default function GamePage() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const { loadSession, sessionId: storeSessionId, gameState } = useGameStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Already loaded (e.g. navigated from NewGameSetup)
    if (storeSessionId === sessionId && gameState) return

    setLoading(true)
    loadSession(sessionId)
      .then(() => setLoading(false))
      .catch(e => {
        setError(e.message ?? 'Could not load game session.')
        setLoading(false)
      })
  }, [sessionId]) // eslint-disable-line

  if (loading) return (
    <div className="min-h-screen bg-forest flex items-center justify-center">
      <p className="font-body text-sage animate-pulse">Loading your forest…</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-center gap-4">
      <p className="font-display text-gold text-xl">Forest not found</p>
      <p className="font-body text-cream/70 text-sm">{error}</p>
      <button onClick={() => navigate('/')} className="font-body text-sage hover:text-cream text-sm underline">
        Back to home
      </button>
    </div>
  )

  if (!gameState) return null

  return <GameBoard />
}
