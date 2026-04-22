/**
 * tarotEngine.js — all card and dice logic.
 */

export function buildDeck(snapshotData) {
  return snapshotData.cards_data ?? []
}

export function shuffleDeck(deck) {
  const arr = [...deck]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Draw the top card + assign orientation. Returns { card, orientation }. */
export function drawCard(deck) {
  if (!deck || deck.length === 0) throw new Error('Deck is empty')
  const card = deck[0]
  const orientation = Math.random() < 0.5 ? 'upright' : 'reversed'
  return { card, orientation }
}

/** Returns the text + harmony delta for the current orientation. */
export function getCardEvent(card, orientation) {
  return card[orientation] ?? { text: '', harmony: {} }
}

export function rollD20() {
  return Math.floor(Math.random() * 20) + 1
}

/** Maps a roll to an outcome bracket. */
export function getD20Outcome(roll) {
  if (roll <= 5)  return 'fail'
  if (roll <= 10) return 'partial'
  if (roll <= 15) return 'good'
  return 'crit'
}

/**
 * Subtracts 1 if the character's flawSuit matches the card suit.
 * Natural 20s are immune to the flaw penalty.
 */
export function applyFlawModifier(roll, character, card) {
  if (roll === 20) return roll
  if (character?.flawSuit === card?.suit) return Math.max(1, roll - 1)
  return roll
}

/** Adds the current harmony score for the relevant suit to the roll. */
export function applyHarmonyModifier(roll, suit, harmony) {
  return Math.max(1, roll + (harmony?.[suit] ?? 0))
}

/**
 * Builds a shuffled deck of cards NOT yet drawn in this session.
 * Called on session load and game start.
 */
export function getRemainingDeck(snapshotData, cardHistory) {
  const allCards = snapshotData?.cards_data ?? []
  const drawnIds = new Set((cardHistory ?? []).map(h => h.cardId))
  const remaining = allCards.filter(c => !drawnIds.has(c.id))
  return shuffleDeck(remaining)
}

export const SUITS = ['cups', 'pentacles', 'wands', 'swords']

export const SUIT_LABELS = {
  cups:      { label: 'Community',  emoji: '🫖' },
  pentacles: { label: 'Resources',  emoji: '🪙' },
  wands:     { label: 'Ambition',   emoji: '🪄' },
  swords:    { label: 'Resilience', emoji: '⚔️' },
}

export const OUTCOME_LABELS = {
  fail:    { label: 'Failure',      range: '1–5',   color: 'text-danger' },
  partial: { label: 'Partial',      range: '6–10',  color: 'text-yellow-400' },
  good:    { label: 'Good',         range: '11–15', color: 'text-green-400' },
  crit:    { label: 'Critical!',    range: '16–20', color: 'text-gold' },
}
