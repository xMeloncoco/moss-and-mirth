/**
 * tarotEngine.js
 * Core mechanics: shuffle, draw, d20 roll, harmony modifier application.
 * Filled out in Phase 2.
 */

/**
 * Fisher-Yates shuffle — returns a new shuffled array.
 * @param {Array} deck
 * @returns {Array}
 */
export function shuffle(deck) {
  const arr = [...deck]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Draw the top card from a deck and return { card, orientation, remaining }.
 * Orientation is upright (~70%) or reversed (~30%) by random chance.
 * @param {Array} deck  Array of card objects
 * @returns {{ card: object, orientation: 'upright'|'reversed', remaining: Array }}
 */
export function drawCard(deck) {
  if (deck.length === 0) throw new Error('Deck is empty')
  const [card, ...remaining] = deck
  const orientation = Math.random() < 0.7 ? 'upright' : 'reversed'
  return { card, orientation, remaining }
}

/**
 * Roll a d20.
 * @returns {number} 1–20
 */
export function rollD20() {
  return Math.floor(Math.random() * 20) + 1
}

/**
 * Apply harmony modifier to a d20 roll for the card's suit.
 * @param {number} roll  Raw d20 result
 * @param {string} suit  'cups' | 'pentacles' | 'wands' | 'swords'
 * @param {{ cups: number, pentacles: number, wands: number, swords: number }} harmony
 * @returns {number}  Modified roll (minimum 1)
 */
export function applyHarmonyModifier(roll, suit, harmony) {
  const modifier = harmony[suit] ?? 0
  return Math.max(1, roll + modifier)
}
