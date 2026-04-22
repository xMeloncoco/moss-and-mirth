import React, { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import {
  drawCard, getCardEvent, rollD20, getD20Outcome,
  applyFlawModifier, applyHarmonyModifier, SUIT_LABELS, OUTCOME_LABELS
} from '../../lib/tarotEngine'
import { useToast } from '../../store/toastStore'

const PHASE = { IDLE:'idle', DRAWN:'drawn', RESOLVED:'resolved' }

export default function CardDraw({ onEndDay }) {
  const { gameState, deck, popDeckCard, applyHarmonyDelta, addCardToHistory } = useGameStore()
  const addToast = useToast()

  const [phase, setPhase]             = useState(PHASE.IDLE)
  const [card, setCard]               = useState(null)
  const [orientation, setOrientation] = useState('upright')
  const [flipped, setFlipped]         = useState(false)      // CSS flip done
  const [showFace, setShowFace]       = useState(false)
  const [d20Roll, setD20Roll]         = useState(null)
  const [outcomeNote, setOutcomeNote] = useState('')
  const [harmonySpent, setHarmonySpent] = useState(0)
  const [finalOrientation, setFinalOrientation] = useState('upright')

  const today = gameState?.dayCount ?? 1
  const alreadyDrawn = (gameState?.cardHistory ?? []).some(h => h.day === today)

  const characters = gameState?.characters ?? []
  const harmony    = gameState?.harmony ?? {}
  const event      = card ? getCardEvent(card, finalOrientation) : null

  // Flaw warning: any character with flawSuit matching drawn card suit
  const flawedChars = card
    ? characters.filter(c => c.flawSuit === card.suit)
    : []

  // ── Draw ──────────────────────────────────────────────────────────────────

  function handleDraw() {
    if (!deck.length) { addToast('The deck is empty! Start a new game to reshuffle.', 'error'); return }
    const raw = popDeckCard()
    const { card: drawn, orientation: ori } = drawCard([raw])
    setCard(drawn)
    setOrientation(ori)
    setFinalOrientation(ori)
    setFlipped(false)
    setShowFace(false)
    setPhase(PHASE.DRAWN)
    setD20Roll(null)
    setOutcomeNote('')
    setHarmonySpent(0)
    // Animate flip after a tick
    setTimeout(() => {
      setFlipped(true)
      setTimeout(() => setShowFace(true), 300)
    }, 100)
  }

  // ── Spend harmony to flip reversed → upright ─────────────────────────────

  function handleFlipToUpright() {
    const suitVal = harmony[card.suit] ?? 0
    if (suitVal < 1) { addToast('Not enough harmony to flip this card.', 'error'); return }
    applyHarmonyDelta({ [card.suit]: -1 })
    setHarmonySpent(1)
    setFinalOrientation('upright')
  }

  // ── Roll d20 ──────────────────────────────────────────────────────────────

  function handleRoll() {
    let roll = rollD20()
    // Apply flaw modifier (first flawed character)
    if (flawedChars.length) roll = applyFlawModifier(roll, flawedChars[0], card)
    // Apply harmony modifier
    roll = applyHarmonyModifier(roll, card.suit, harmony)
    roll = Math.max(1, Math.min(20, roll))
    setD20Roll(roll)
  }

  // ── Confirm & End Day ─────────────────────────────────────────────────────

  function handleConfirm() {
    // Apply card's harmony delta (only once)
    const harmonyCost = event?.harmony ?? {}

    // Crit bonus: if roll in 16-20, +1 to the card's suit
    const outcome = d20Roll ? getD20Outcome(d20Roll) : null
    const critBonus = outcome === 'crit' ? { [card.suit]: 1 } : {}

    // Merge: card harmony + crit
    const combinedDelta = { ...harmonyCost }
    for (const [s, v] of Object.entries(critBonus)) {
      combinedDelta[s] = (combinedDelta[s] ?? 0) + v
    }
    if (Object.keys(combinedDelta).length) applyHarmonyDelta(combinedDelta)

    // Record in history
    addCardToHistory({
      day: today,
      cardId: card.id,
      orientation: finalOrientation,
      harmonySpent,
      d20Roll,
      outcomeNote,
    })

    setPhase(PHASE.RESOLVED)
    onEndDay?.()
  }

  // ── Render ────────────────────────────────────────────────────────────────

  const suitMeta = card ? SUIT_LABELS[card.suit] ?? {} : {}

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
      {/* Day header */}
      <div className="text-center">
        <p className="font-body text-sage text-sm">Day {today}</p>
        <h2 className="font-display text-gold text-xl">
          {phase === PHASE.IDLE ? 'Draw today\'s card' : card?.name}
        </h2>
      </div>

      {/* Card scene */}
      <div className="card-scene w-48 h-72">
        <div className={`card-inner w-full h-full ${flipped ? 'flipped' : ''}`}>
          {/* Back */}
          <div className="card-face w-full h-full rounded-2xl bg-forest border-2 border-gold/30
            flex items-center justify-center shadow-xl">
            <span className="text-6xl select-none">🍄</span>
          </div>
          {/* Front */}
          <div className="card-back w-full h-full rounded-2xl bg-parchment
            flex flex-col items-center justify-center gap-2 shadow-xl p-4">
            {showFace && card && (
              <>
                <span className="text-3xl">{suitMeta.emoji}</span>
                <p className="font-display text-forest text-base font-semibold text-center leading-tight">
                  {card.name}
                </p>
                <span className={`font-body text-xs px-2 py-0.5 rounded-full
                  ${finalOrientation === 'reversed' ? 'bg-danger/20 text-danger' : 'bg-sage/20 text-forest'}`}>
                  {finalOrientation}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* IDLE — draw button */}
      {phase === PHASE.IDLE && !alreadyDrawn && (
        <button onClick={handleDraw}
          className="w-full bg-gold text-forest font-body font-semibold py-3 rounded-xl hover:brightness-110 transition text-base">
          Draw Card for Today
        </button>
      )}
      {phase === PHASE.IDLE && alreadyDrawn && (
        <p className="font-body text-sage text-sm text-center">You've already drawn today.<br/>Confirm and end the day to continue.</p>
      )}

      {/* DRAWN — event + resolution */}
      {phase === PHASE.DRAWN && showFace && event && (
        <div className="w-full flex flex-col gap-4">
          {/* Event text */}
          <div className="bg-parchment/10 border border-gold/20 rounded-xl p-4">
            <p className="font-body text-cream text-sm leading-relaxed">{event.text}</p>
            {Object.keys(event.harmony ?? {}).length > 0 && (
              <div className="flex gap-2 flex-wrap mt-3">
                {Object.entries(event.harmony).map(([s, v]) => (
                  <span key={s} className={`font-body text-xs px-2 py-0.5 rounded-full
                    ${v>0?'bg-sage/20 text-sage':'bg-danger/20 text-danger'}`}>
                    {v>0?'+':''}{v} {SUIT_LABELS[s]?.label ?? s}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Flip to upright option */}
          {finalOrientation === 'reversed' && (harmony[card.suit] ?? 0) > 0 && (
            <button onClick={handleFlipToUpright}
              className="w-full border border-gold/40 text-gold font-body text-sm py-2 rounded-lg hover:bg-gold/10 transition">
              Spend 1 {SUIT_LABELS[card.suit]?.label ?? card.suit} harmony to flip upright
            </button>
          )}

          {/* Flaw warning */}
          {flawedChars.length > 0 && (
            <div className="bg-danger/10 border border-danger/30 rounded-lg px-4 py-2">
              <p className="font-body text-danger text-xs">
                ⚠ {flawedChars.map(c=>c.name).join(', ')} {flawedChars.length>1?'have':'has'} a flaw here (–1 to roll)
              </p>
            </div>
          )}

          {/* d20 roll */}
          <div className="flex flex-col gap-2">
            <button onClick={handleRoll}
              className="w-full border border-gold/30 text-cream font-body text-sm py-2 rounded-lg hover:border-gold hover:text-gold transition">
              {d20Roll ? `Re-roll (current: ${d20Roll})` : '🎲 Roll d20'}
            </button>
            {d20Roll !== null && (
              <div className="text-center">
                <span className="font-display text-4xl text-gold">{d20Roll}</span>
                <p className={`font-body text-sm mt-1 ${OUTCOME_LABELS[getD20Outcome(d20Roll)]?.color}`}>
                  {OUTCOME_LABELS[getD20Outcome(d20Roll)]?.label} ({OUTCOME_LABELS[getD20Outcome(d20Roll)]?.range})
                </p>
                {getD20Outcome(d20Roll) === 'crit' && (
                  <p className="font-body text-gold text-xs mt-1">+1 {SUIT_LABELS[card.suit]?.label} bonus!</p>
                )}
              </div>
            )}
          </div>

          {/* Outcome note */}
          <textarea
            value={outcomeNote}
            onChange={e => setOutcomeNote(e.target.value)}
            placeholder="Optional: what happened? (a few words)"
            rows={2}
            className="w-full bg-forest border border-gold/20 rounded-lg px-3 py-2 font-body text-cream text-sm resize-none focus:outline-none focus:border-gold placeholder:text-sage/40"
          />

          {/* Confirm */}
          <button onClick={handleConfirm}
            className="w-full bg-gold text-forest font-body font-semibold py-3 rounded-xl hover:brightness-110 transition">
            Confirm &amp; End Day
          </button>
        </div>
      )}

      {/* RESOLVED */}
      {phase === PHASE.RESOLVED && (
        <div className="text-center">
          <p className="font-body text-sage text-sm">Day {today} complete. A new day begins…</p>
        </div>
      )}
    </div>
  )
}
