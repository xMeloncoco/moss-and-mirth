/**
 * defaultCards.js
 * Seed data for all 78 tarot cards adapted for Moss & Mirth.
 *
 * Each card has:
 *   id          — unique string, e.g. 'major-00', 'cups-01'
 *   suit        — 'major' | 'cups' | 'pentacles' | 'wands' | 'swords'
 *   number      — 0–21 for major; 1–14 for minor (14 = page, 15 = knight, 16 = queen, 17 = king)
 *   name        — display name
 *   uprightText — guidance text when drawn upright
 *   reversedText— guidance text when drawn reversed
 *   keywords    — string[] short tags
 */

// --- Major Arcana (22 cards) ---
const majorArcana = [
  {
    id: 'major-00', suit: 'major', number: 0, name: 'The Fool',
    uprightText: 'A fresh beginning stirs in the undergrowth. Take the leap.',
    reversedText: 'Reckless roots — pause before you wander.',
    keywords: ['beginnings', 'spontaneity', 'innocence'],
  },
  {
    id: 'major-01', suit: 'major', number: 1, name: 'The Magician',
    uprightText: 'All the tools you need are already in your hands. Act.',
    reversedText: 'Skills are scattered. Gather yourself before crafting.',
    keywords: ['willpower', 'skill', 'resourcefulness'],
  },
  {
    id: 'major-02', suit: 'major', number: 2, name: 'The High Priestess',
    uprightText: 'The moss holds secrets. Listen before you speak.',
    reversedText: 'Hidden knowledge is being withheld — even from yourself.',
    keywords: ['intuition', 'mystery', 'patience'],
  },
  {
    id: 'major-03', suit: 'major', number: 3, name: 'The Empress',
    uprightText: 'The forest rewards nurturing. Growth flows from care.',
    reversedText: 'Over-tending smothers. Give space to breathe.',
    keywords: ['abundance', 'nurture', 'nature'],
  },
  {
    id: 'major-04', suit: 'major', number: 4, name: 'The Emperor',
    uprightText: 'Structure steadies the saplings. Establish order.',
    reversedText: 'Rigid roots crack in the storm. Loosen your grip.',
    keywords: ['structure', 'stability', 'authority'],
  },
  {
    id: 'major-05', suit: 'major', number: 5, name: 'The Hierophant',
    uprightText: 'Old traditions carry wisdom. Honor what came before.',
    reversedText: 'Inherited rules may not serve this season.',
    keywords: ['tradition', 'community', 'guidance'],
  },
  {
    id: 'major-06', suit: 'major', number: 6, name: 'The Lovers',
    uprightText: 'A bond deepens beneath the canopy. Choose with your heart.',
    reversedText: 'Disharmony tangles the roots. Face the conflict.',
    keywords: ['connection', 'choice', 'harmony'],
  },
  {
    id: 'major-07', suit: 'major', number: 7, name: 'The Chariot',
    uprightText: 'Drive forward — determination cuts through the thicket.',
    reversedText: 'Rushing leaves the pack behind. Check your direction.',
    keywords: ['determination', 'momentum', 'control'],
  },
  {
    id: 'major-08', suit: 'major', number: 8, name: 'Strength',
    uprightText: 'Gentle persistence outlasts the wildfire. Hold steady.',
    reversedText: 'Inner doubt gnaws. Tend to your courage.',
    keywords: ['courage', 'patience', 'compassion'],
  },
  {
    id: 'major-09', suit: 'major', number: 9, name: 'The Hermit',
    uprightText: 'Step back into the quiet. Solitude carries a lantern.',
    reversedText: 'Isolation has become hiding. Seek the community again.',
    keywords: ['solitude', 'reflection', 'wisdom'],
  },
  {
    id: 'major-10', suit: 'major', number: 10, name: 'Wheel of Fortune',
    uprightText: 'The seasons turn. Ride the change rather than resist it.',
    reversedText: 'Clinging to what was — let the wheel turn.',
    keywords: ['cycles', 'fate', 'change'],
  },
  {
    id: 'major-11', suit: 'major', number: 11, name: 'Justice',
    uprightText: 'Clear eyes and honest action keep the forest balanced.',
    reversedText: 'A wrong goes unaddressed. Truth asks to be spoken.',
    keywords: ['fairness', 'truth', 'accountability'],
  },
  {
    id: 'major-12', suit: 'major', number: 12, name: 'The Hanged One',
    uprightText: 'Hang upside-down in the branches and see it fresh.',
    reversedText: 'The waiting is over. Act on what you now know.',
    keywords: ['pause', 'perspective', 'surrender'],
  },
  {
    id: 'major-13', suit: 'major', number: 13, name: 'Death',
    uprightText: 'The old leaves fall to feed the new. Embrace the ending.',
    reversedText: 'Resisting an ending prolongs the frost.',
    keywords: ['transformation', 'endings', 'release'],
  },
  {
    id: 'major-14', suit: 'major', number: 14, name: 'Temperance',
    uprightText: 'Pour slowly, mix well. Balance is the craft.',
    reversedText: 'Extremes are pulling the community apart.',
    keywords: ['balance', 'moderation', 'flow'],
  },
  {
    id: 'major-15', suit: 'major', number: 15, name: 'The Devil',
    uprightText: 'A comfortable trap. Name what binds you.',
    reversedText: 'Chains loosening — the first step toward freedom.',
    keywords: ['shadow', 'attachment', 'addiction'],
  },
  {
    id: 'major-16', suit: 'major', number: 16, name: 'The Tower',
    uprightText: 'Something built on unstable ground is coming down. Let it.',
    reversedText: 'Avoiding the collapse only delays it.',
    keywords: ['upheaval', 'revelation', 'chaos'],
  },
  {
    id: 'major-17', suit: 'major', number: 17, name: 'The Star',
    uprightText: 'Hope glimmers through the dark canopy. Follow the light.',
    reversedText: 'Despair clouds the stars — rest, then look again.',
    keywords: ['hope', 'healing', 'inspiration'],
  },
  {
    id: 'major-18', suit: 'major', number: 18, name: 'The Moon',
    uprightText: 'Strange paths open in the moonlit forest. Trust your instincts.',
    reversedText: 'Illusions dissolve. Clarity returns with dawn.',
    keywords: ['illusion', 'intuition', 'the unconscious'],
  },
  {
    id: 'major-19', suit: 'major', number: 19, name: 'The Sun',
    uprightText: 'The clearing opens. Joy and vitality flood in.',
    reversedText: 'Clouds dim the joy — a temporary shadow.',
    keywords: ['joy', 'vitality', 'success'],
  },
  {
    id: 'major-20', suit: 'major', number: 20, name: 'Judgement',
    uprightText: 'A call echoes through the forest. Answer it.',
    reversedText: 'Self-doubt keeps you from heeding the call.',
    keywords: ['renewal', 'reckoning', 'awakening'],
  },
  {
    id: 'major-21', suit: 'major', number: 21, name: 'The World',
    uprightText: 'The circle closes. Celebrate what has been completed.',
    reversedText: 'One last thread is unfinished. Find it.',
    keywords: ['completion', 'wholeness', 'integration'],
  },
]

// Helper to build a suit
function buildSuit(suit, names) {
  const pips = names.slice(0, 10).map((name, i) => ({
    id: `${suit}-${String(i + 1).padStart(2, '0')}`,
    suit,
    number: i + 1,
    name,
    uprightText: `[${name} upright — to be filled by Verena]`,
    reversedText: `[${name} reversed — to be filled by Verena]`,
    keywords: [],
  }))
  const courts = ['Page', 'Knight', 'Queen', 'King'].map((title, i) => ({
    id: `${suit}-${String(11 + i).padStart(2, '0')}`,
    suit,
    number: 11 + i,
    name: `${title} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
    uprightText: `[${title} of ${suit} upright — to be filled by Verena]`,
    reversedText: `[${title} of ${suit} reversed — to be filled by Verena]`,
    keywords: [],
  }))
  return [...pips, ...courts]
}

const cups = buildSuit('cups', [
  'Ace of Cups', 'Two of Cups', 'Three of Cups', 'Four of Cups',
  'Five of Cups', 'Six of Cups', 'Seven of Cups', 'Eight of Cups',
  'Nine of Cups', 'Ten of Cups',
])

const pentacles = buildSuit('pentacles', [
  'Ace of Pentacles', 'Two of Pentacles', 'Three of Pentacles', 'Four of Pentacles',
  'Five of Pentacles', 'Six of Pentacles', 'Seven of Pentacles', 'Eight of Pentacles',
  'Nine of Pentacles', 'Ten of Pentacles',
])

const wands = buildSuit('wands', [
  'Ace of Wands', 'Two of Wands', 'Three of Wands', 'Four of Wands',
  'Five of Wands', 'Six of Wands', 'Seven of Wands', 'Eight of Wands',
  'Nine of Wands', 'Ten of Wands',
])

const swords = buildSuit('swords', [
  'Ace of Swords', 'Two of Swords', 'Three of Swords', 'Four of Swords',
  'Five of Swords', 'Six of Swords', 'Seven of Swords', 'Eight of Swords',
  'Nine of Swords', 'Ten of Swords',
])

export const defaultCards = [
  ...majorArcana,
  ...cups,
  ...pentacles,
  ...wands,
  ...swords,
]
