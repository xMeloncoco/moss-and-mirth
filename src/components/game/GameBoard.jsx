import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../../store/gameStore'
import CardDraw from './CardDraw'
import HarmonyTracker from './HarmonyTracker'
import IdeasPanel from './IdeasPanel'
import StoryJournal from './StoryJournal'
import InspirationTables from './InspirationTables'
import MapCanvas from './MapCanvas'
import MusicPlayer from './MusicPlayer'
import CommunityUpdate from './CommunityUpdate'
import HowToPlay from './HowToPlay'
import EndGameScreen from './EndGameScreen'
import SaveIndicator from '../ui/SaveIndicator'

const MOBILE_TABS = [
  { id:'game',        label:'Game',        emoji:'🃏' },
  { id:'journal',     label:'Journal',     emoji:'📖' },
  { id:'map',         label:'Map',         emoji:'🗺️' },
  { id:'inspiration', label:'Inspire',     emoji:'🎲' },
]

export default function GameBoard() {
  const navigate = useNavigate()
  const { gameState, advanceDay, clearSession } = useGameStore()
  const [mobileTab, setMobileTab] = useState('game')
  const [sideTab, setSideTab]     = useState('harmony') // 'harmony' | 'ideas' | 'journal'
  const [showHowToPlay, setShowHowToPlay]     = useState(false)
  const [showCommunityUpdate, setShowCommunityUpdate] = useState(false)
  const [showEndGame, setShowEndGame]         = useState(false)
  const [justCompletedIdeas, setJustCompletedIdeas]  = useState([])

  if (!gameState) return null

  const { forestName, dayCount, characters, harmony } = gameState
  const maxHarmony = Math.max(...Object.values(harmony))
  const nearEndGame = maxHarmony >= 20

  function handleEndDay() {
    const newlyDone = advanceDay()
    setJustCompletedIdeas(newlyDone)
    setShowCommunityUpdate(true)
  }

  function handleCommunityUpdateDone() {
    setShowCommunityUpdate(false)
    setJustCompletedIdeas([])
  }

  function handleEndGame() {
    setShowEndGame(true)
  }

  function handleNewGame() {
    clearSession()
    navigate('/')
  }

  if (showEndGame) {
    return <EndGameScreen onNewGame={handleNewGame} />
  }

  return (
    <div className="min-h-screen bg-forest flex flex-col">
      {/* ── Top bar ── */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gold/20 shrink-0">
        <div>
          <h1 className="font-display text-gold text-lg leading-none">{forestName}</h1>
          <p className="font-body text-sage text-xs mt-0.5">
            Day {dayCount} · {characters.map(c => c.name).join(' & ')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SaveIndicator />
          <button onClick={() => setShowHowToPlay(true)}
            className="font-body text-sage text-xs hover:text-cream border border-sage/30 rounded px-2 py-1">
            ? Rules
          </button>
          {nearEndGame && (
            <button onClick={handleEndGame}
              className="font-body text-gold text-xs border border-gold/40 rounded px-2 py-1 hover:bg-gold/10">
              End Adventure
            </button>
          )}
          <button onClick={() => { clearSession(); navigate('/') }}
            className="font-body text-sage text-xs hover:text-cream">
            ← Exit
          </button>
        </div>
      </header>

      {/* ── Desktop layout (md+) ── */}
      <div className="flex-1 hidden md:flex overflow-hidden">
        {/* Main — card draw */}
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <CardDraw onEndDay={handleEndDay} />
        </main>

        {/* Sidebar */}
        <aside className="w-80 border-l border-gold/20 flex flex-col overflow-hidden">
          {/* Sidebar tabs */}
          <div className="flex border-b border-gold/20 shrink-0">
            {[['harmony','♾ Harmony'],['ideas','💡 Ideas'],['journal','📖 Journal']].map(([id,label]) => (
              <button key={id} onClick={() => setSideTab(id)}
                className={`flex-1 font-body text-xs py-2.5 transition
                  ${sideTab===id ? 'text-gold border-b-2 border-gold' : 'text-sage hover:text-cream'}`}>
                {label}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {sideTab === 'harmony'  && <HarmonyTracker />}
            {sideTab === 'ideas'    && <IdeasPanel />}
            {sideTab === 'journal'  && <StoryJournal />}
          </div>
          {/* Music player docked */}
          <div className="shrink-0 border-t border-gold/20">
            <MusicPlayer />
          </div>
        </aside>
      </div>

      {/* ── Mobile layout ── */}
      <div className="flex-1 md:hidden overflow-y-auto pb-20">
        <div className="px-4 py-6">
          {mobileTab === 'game'        && (
            <>
              <CardDraw onEndDay={handleEndDay} />
              <div className="mt-8">
                <HarmonyTracker />
              </div>
            </>
          )}
          {mobileTab === 'journal'     && <StoryJournal />}
          {mobileTab === 'map'         && <MapCanvas />}
          {mobileTab === 'inspiration' && <InspirationTables />}
        </div>
      </div>

      {/* ── Mobile bottom tab bar ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-forest border-t border-gold/20 flex z-30">
        {MOBILE_TABS.map(({ id, label, emoji }) => (
          <button key={id} onClick={() => setMobileTab(id)}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 font-body text-xs transition
              ${mobileTab===id ? 'text-gold' : 'text-sage hover:text-cream'}`}>
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* ── Mobile music player ── */}
      <div className="md:hidden fixed bottom-16 right-4 z-20">
        <MusicPlayer compact />
      </div>

      {/* ── Modals ── */}
      {showHowToPlay && <HowToPlay onClose={() => setShowHowToPlay(false)} />}
      {showCommunityUpdate && (
        <CommunityUpdate
          completedIdeas={justCompletedIdeas}
          onDone={handleCommunityUpdateDone}
        />
      )}
    </div>
  )
}
