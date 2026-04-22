/**
 * defaultCards.js
 * All 78 tarot cards adapted for Moss & Mirth.
 * Texts are placeholder flavour matching the cozy forest community tone —
 * Verena can replace them via the Admin panel once the game PDF is available.
 *
 * harmony values reflect the community impact of each card.
 * Empty harmony objects {} mean no harmony change for that draw.
 */

// ─── Major Arcana (0–21) ─────────────────────────────────────────────────────
const majorArcana = [
  {
    id: 'major_0', suit: 'major', number: 0, name: 'The Fool',
    upright: {
      text: 'A youngling wanders in from the forest edge, eyes wide with wonder. A new story begins at your hearth.',
      harmony: { wands: 1 },
    },
    reversed: {
      text: 'Someone rushes in without thinking, trailing chaos behind them.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'major_1', suit: 'major', number: 1, name: 'The Magician',
    upright: {
      text: 'A skilled crafter offers their gifts to the community. The right tools are in the right hands.',
      harmony: { pentacles: 1 },
    },
    reversed: {
      text: 'Resources are squandered or a skill misapplied.',
      harmony: { pentacles: -1 },
    },
  },
  {
    id: 'major_2', suit: 'major', number: 2, name: 'The High Priestess',
    upright: {
      text: 'The forest speaks to those who listen. A quiet knowing guides your steps today.',
      harmony: { cups: 1 },
    },
    reversed: {
      text: 'Something important is being ignored or kept secret.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'major_3', suit: 'major', number: 3, name: 'The Empress',
    upright: {
      text: 'The garden overflows and the table is full. The community grows strong.',
      harmony: { pentacles: 1, cups: 1 },
    },
    reversed: {
      text: 'The land is depleted. Someone\'s needs have been overlooked.',
      harmony: { pentacles: -1 },
    },
  },
  {
    id: 'major_4', suit: 'major', number: 4, name: 'The Emperor',
    upright: {
      text: 'Clear roles and fair expectations bring order to the settlement.',
      harmony: { swords: 1 },
    },
    reversed: {
      text: 'Rules meant to protect have become walls.',
      harmony: { swords: -1 },
    },
  },
  {
    id: 'major_5', suit: 'major', number: 5, name: 'The Hierophant',
    upright: {
      text: 'Old ways offer guidance. Someone shares a story from before your time.',
      harmony: { cups: 1 },
    },
    reversed: {
      text: 'Inherited traditions are being questioned. Tension between old and new.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'major_6', suit: 'major', number: 6, name: 'The Lovers',
    upright: {
      text: 'A deep bond strengthens. A choice is made from the heart.',
      harmony: { cups: 1 },
    },
    reversed: {
      text: 'A relationship is strained. A difficult choice divides rather than unites.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'major_7', suit: 'major', number: 7, name: 'The Chariot',
    upright: {
      text: 'With will and focus, a long-standing obstacle is overcome.',
      harmony: { wands: 1 },
    },
    reversed: {
      text: 'Pushing too hard in the wrong direction. Energy scattered.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'major_8', suit: 'major', number: 8, name: 'Strength',
    upright: {
      text: 'Fear is faced with softness. The hardest thing is done without cruelty.',
      harmony: { cups: 1 },
    },
    reversed: {
      text: 'Doubt bites deep. Someone shrinks from what they need to do.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'major_9', suit: 'major', number: 9, name: 'The Hermit',
    upright: {
      text: 'A trusted elder retreats to the forest for a time. Wisdom is earned in silence.',
      harmony: { cups: 1 },
    },
    reversed: {
      text: 'Isolation tips into loneliness. The community misses someone.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'major_10', suit: 'major', number: 10, name: 'Wheel of Fortune',
    upright: {
      text: 'Fortune turns. Something that was stuck begins to move again.',
      harmony: { wands: 1 },
    },
    reversed: {
      text: 'A fortunate streak ends. Old problems return with the turning wheel.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'major_11', suit: 'major', number: 11, name: 'Justice',
    upright: {
      text: 'A wrong is named and addressed. Fairness is restored to the settlement.',
      harmony: { swords: 1 },
    },
    reversed: {
      text: 'An injustice lingers unaddressed. Someone\'s voice goes unheard.',
      harmony: { swords: -1 },
    },
  },
  {
    id: 'major_12', suit: 'major', number: 12, name: 'The Hanged One',
    upright: {
      text: 'Everything stops for a moment. Looking at things upside-down reveals what was missed.',
      harmony: { cups: 1 },
    },
    reversed: {
      text: 'Stalled. Progress halted by resistance rather than reflection.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'major_13', suit: 'major', number: 13, name: 'Death',
    upright: {
      text: 'An old way of doing things finally ends. The clearing it leaves will allow new growth.',
      harmony: { wands: 1 },
    },
    reversed: {
      text: 'Clinging to what is already over. The forest waits, patient.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'major_14', suit: 'major', number: 14, name: 'Temperance',
    upright: {
      text: 'Even when demands are high, a measured pace keeps things from tipping.',
      harmony: { pentacles: 1, cups: 1 },
    },
    reversed: {
      text: 'Too much of one thing and not enough of another. Something is out of balance.',
      harmony: { pentacles: -1 },
    },
  },
  {
    id: 'major_15', suit: 'major', number: 15, name: 'The Devil',
    upright: {
      text: 'A habit or fear that has held the community back is finally named aloud.',
      harmony: { cups: -1 },
    },
    reversed: {
      text: 'The chains are beginning to loosen. Freedom is closer than it seemed.',
      harmony: { cups: 1 },
    },
  },
  {
    id: 'major_16', suit: 'major', number: 16, name: 'The Tower',
    upright: {
      text: 'Something built on unstable ground collapses. The shock is real, but the air is clearer.',
      harmony: { swords: -1, pentacles: -1 },
    },
    reversed: {
      text: 'A smaller fracture, not total collapse — but a warning well worth heeding.',
      harmony: { swords: -1 },
    },
  },
  {
    id: 'major_17', suit: 'major', number: 17, name: 'The Star',
    upright: {
      text: 'After difficulty, something hopeful appears on the horizon. Rest and tend the wounded.',
      harmony: { cups: 1, wands: 1 },
    },
    reversed: {
      text: 'Hope is flickering. Someone has lost faith in the future.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'major_18', suit: 'major', number: 18, name: 'The Moon',
    upright: {
      text: 'Something strange and dream-like stirs in the deep forest. Trust your instincts tonight.',
      harmony: { cups: 1 },
    },
    reversed: {
      text: 'Confusion spreads. Something important is obscured by fear or wishful thinking.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'major_19', suit: 'major', number: 19, name: 'The Sun',
    upright: {
      text: 'The community shines. A day of warmth and genuine celebration fills the clearing.',
      harmony: { cups: 2, wands: 1 },
    },
    reversed: {
      text: 'The warmth is dimmed. Weariness or worry shadows an otherwise good day.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'major_20', suit: 'major', number: 20, name: 'Judgement',
    upright: {
      text: 'A moment of clarity arrives. It is time to answer the question that has been avoided.',
      harmony: { swords: 1 },
    },
    reversed: {
      text: 'The call is there, but no one is listening. Something important is being denied.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'major_21', suit: 'major', number: 21, name: 'The World',
    upright: {
      text: 'A great effort reaches its end. Take a moment to celebrate everything that has been built.',
      harmony: { cups: 1, pentacles: 1, wands: 1, swords: 1 },
    },
    reversed: {
      text: 'So close to completion. One last unfinished thread keeps the circle open.',
      harmony: { wands: -1 },
    },
  },
]

// ─── Cups (emotional bonds, relationships, morale) ───────────────────────────
const cupsCards = [
  {
    id: 'cups_1', suit: 'cups', number: 1, name: 'Ace of Cups',
    upright: {
      text: 'A small tea gathering forms. A new face joins, warm and welcome.',
      harmony: { cups: 1 },
    },
    reversed: {
      text: 'A new guest arrives, but they do not feel welcome.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'cups_2', suit: 'cups', number: 2, name: 'Two of Cups',
    upright: {
      text: 'Two community members who were strangers discover a deep kinship.',
      harmony: { cups: 1 },
    },
    reversed: {
      text: 'A friendship is strained. Something has created distance between allies.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'cups_3', suit: 'cups', number: 3, name: 'Three of Cups',
    upright: {
      text: 'A small celebration. The community gathers to honour something wonderful.',
      harmony: { cups: 2 },
    },
    reversed: {
      text: 'The celebration feels hollow, or someone is excluded from the joy.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'cups_4', suit: 'cups', number: 4, name: 'Four of Cups',
    upright: {
      text: 'A quiet day of retreat and reflection. Someone needs time to sit with their thoughts.',
      harmony: {},
    },
    reversed: {
      text: 'Withdrawal becomes avoidance. Someone is closed off when they are needed.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'cups_5', suit: 'cups', number: 5, name: 'Five of Cups',
    upright: {
      text: 'Something is lost or mourned. Grief sits quietly at the fireside tonight.',
      harmony: { cups: -1 },
    },
    reversed: {
      text: 'The mourning begins to lift. Eyes turn toward what still remains.',
      harmony: { cups: 1 },
    },
  },
  {
    id: 'cups_6', suit: 'cups', number: 6, name: 'Six of Cups',
    upright: {
      text: 'A memory surfaces — something from the community\'s early days. Warmth from the past.',
      harmony: { cups: 1 },
    },
    reversed: {
      text: 'Nostalgia becomes avoidance. Living too much in what was.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'cups_7', suit: 'cups', number: 7, name: 'Seven of Cups',
    upright: {
      text: 'Many possibilities shimmer but no clear path appears. Dreams abound, decisions are elusive.',
      harmony: {},
    },
    reversed: {
      text: 'Illusions fall away. The choice becomes clear, even if it is difficult.',
      harmony: { wands: 1 },
    },
  },
  {
    id: 'cups_8', suit: 'cups', number: 8, name: 'Eight of Cups',
    upright: {
      text: 'Someone leaves something behind — not with anger, but with quiet knowing.',
      harmony: { cups: -1 },
    },
    reversed: {
      text: 'A departure is reconsidered. Someone chooses to stay and face what is hard.',
      harmony: { wands: 1 },
    },
  },
  {
    id: 'cups_9', suit: 'cups', number: 9, name: 'Nine of Cups',
    upright: {
      text: 'A wish comes true. Content, full, grateful — the community rests in satisfaction.',
      harmony: { cups: 2 },
    },
    reversed: {
      text: 'Satisfaction proves hollow. More was gained than was good.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'cups_10', suit: 'cups', number: 10, name: 'Ten of Cups',
    upright: {
      text: 'The community is whole. Joy and belonging radiate from every hearth.',
      harmony: { cups: 2, wands: 1 },
    },
    reversed: {
      text: 'Cracks appear in what seemed perfect. Old hurts surface.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'cups_11', suit: 'cups', number: 11, name: 'Page of Cups',
    upright: {
      text: 'A young or unexpected creative energy arrives. Something tender and hopeful begins.',
      harmony: { cups: 1 },
    },
    reversed: {
      text: 'Sensitivity misread as weakness. Emotions handled clumsily.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'cups_12', suit: 'cups', number: 12, name: 'Knight of Cups',
    upright: {
      text: 'Someone follows their heart across difficult terrain. Pursuit of beauty or connection.',
      harmony: { cups: 1 },
    },
    reversed: {
      text: 'Moodiness disrupts the community. Romantic trouble spills into daily life.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'cups_13', suit: 'cups', number: 13, name: 'Queen of Cups',
    upright: {
      text: 'A deeply empathic figure holds the emotional space for others. The community feels held.',
      harmony: { cups: 2 },
    },
    reversed: {
      text: 'Emotional giving has exceeded emotional reserves. Burnout threatens.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'cups_14', suit: 'cups', number: 14, name: 'King of Cups',
    upright: {
      text: 'Wise and compassionate leadership. Feelings are honoured without overwhelm.',
      harmony: { cups: 2 },
    },
    reversed: {
      text: 'Emotional manipulation or suppression. Someone\'s pain is controlled rather than held.',
      harmony: { cups: -1 },
    },
  },
]

// ─── Pentacles (resources, food, shelter, practical needs) ───────────────────
const pentaclesCards = [
  {
    id: 'pentacles_1', suit: 'pentacles', number: 1, name: 'Ace of Pentacles',
    upright: {
      text: 'New resources arrive — a gift, a find, or a fortunate trade comes through.',
      harmony: { pentacles: 1 },
    },
    reversed: {
      text: 'A resource promised does not materialise. Plans stall.',
      harmony: { pentacles: -1 },
    },
  },
  {
    id: 'pentacles_2', suit: 'pentacles', number: 2, name: 'Two of Pentacles',
    upright: {
      text: 'Juggling many practical tasks with graceful balance.',
      harmony: { pentacles: 1 },
    },
    reversed: {
      text: 'Too much to manage. Something essential slips.',
      harmony: { pentacles: -1 },
    },
  },
  {
    id: 'pentacles_3', suit: 'pentacles', number: 3, name: 'Three of Pentacles',
    upright: {
      text: 'A collaborative project gains momentum. Different skills combine well today.',
      harmony: { pentacles: 1, wands: 1 },
    },
    reversed: {
      text: 'Poor teamwork or lack of appreciation for a craftsperson\'s effort.',
      harmony: { pentacles: -1 },
    },
  },
  {
    id: 'pentacles_4', suit: 'pentacles', number: 4, name: 'Four of Pentacles',
    upright: {
      text: 'Resources are carefully saved. Security comes from prudent management.',
      harmony: { pentacles: 1 },
    },
    reversed: {
      text: 'Hoarding creates scarcity for others. Generosity is withheld.',
      harmony: { pentacles: -1, cups: -1 },
    },
  },
  {
    id: 'pentacles_5', suit: 'pentacles', number: 5, name: 'Five of Pentacles',
    upright: {
      text: 'A period of scarcity or hardship. Something essential is lacking.',
      harmony: { pentacles: -1 },
    },
    reversed: {
      text: 'Help arrives just in time. The hardship is not permanent.',
      harmony: { pentacles: 1 },
    },
  },
  {
    id: 'pentacles_6', suit: 'pentacles', number: 6, name: 'Six of Pentacles',
    upright: {
      text: 'Fair exchange. Those who have enough share with those who do not.',
      harmony: { pentacles: 1, cups: 1 },
    },
    reversed: {
      text: 'Charity given with conditions. A power imbalance lingers in the giving.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'pentacles_7', suit: 'pentacles', number: 7, name: 'Seven of Pentacles',
    upright: {
      text: 'A long effort is partway done. Pause to assess the harvest so far.',
      harmony: {},
    },
    reversed: {
      text: 'The wait is longer than expected. Doubt creeps in about whether the effort was worth it.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'pentacles_8', suit: 'pentacles', number: 8, name: 'Eight of Pentacles',
    upright: {
      text: 'Focused, diligent work. A craft improves through patient repetition.',
      harmony: { pentacles: 1, wands: 1 },
    },
    reversed: {
      text: 'Drudgery without meaning. The work feels endless and hollow.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'pentacles_9', suit: 'pentacles', number: 9, name: 'Nine of Pentacles',
    upright: {
      text: 'Hard work has paid off. A beautiful, abundant self-sufficiency.',
      harmony: { pentacles: 2 },
    },
    reversed: {
      text: 'Success achieved at a cost. Something of real value was sacrificed.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'pentacles_10', suit: 'pentacles', number: 10, name: 'Ten of Pentacles',
    upright: {
      text: 'The community has built something lasting. Generations will benefit from this work.',
      harmony: { pentacles: 2, cups: 1 },
    },
    reversed: {
      text: 'The foundation is less solid than it appears. Wealth without meaning.',
      harmony: { pentacles: -1 },
    },
  },
  {
    id: 'pentacles_11', suit: 'pentacles', number: 11, name: 'Page of Pentacles',
    upright: {
      text: 'A young apprentice takes their first careful steps into a new skill.',
      harmony: { pentacles: 1 },
    },
    reversed: {
      text: 'A learning opportunity wasted. Impatience sabotages good study.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'pentacles_12', suit: 'pentacles', number: 12, name: 'Knight of Pentacles',
    upright: {
      text: 'Slow and steady, reliable to a fault. The work gets done.',
      harmony: { pentacles: 1 },
    },
    reversed: {
      text: 'Stubbornness blocks progress. The old method refuses to yield.',
      harmony: { pentacles: -1 },
    },
  },
  {
    id: 'pentacles_13', suit: 'pentacles', number: 13, name: 'Queen of Pentacles',
    upright: {
      text: 'A warm, practical caretaker nurtures both people and land with equal care.',
      harmony: { pentacles: 2, cups: 1 },
    },
    reversed: {
      text: 'Practicality without warmth. Needs are met but the heart is cold.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'pentacles_14', suit: 'pentacles', number: 14, name: 'King of Pentacles',
    upright: {
      text: 'Steady, abundant leadership. The community\'s practical needs are well managed.',
      harmony: { pentacles: 2 },
    },
    reversed: {
      text: 'Material comfort used as a form of control. Generosity weaponised.',
      harmony: { pentacles: -1, cups: -1 },
    },
  },
]

// ─── Wands (creativity, ambition, inspiration, projects) ─────────────────────
const wandsCards = [
  {
    id: 'wands_1', suit: 'wands', number: 1, name: 'Ace of Wands',
    upright: {
      text: 'A spark of inspiration. A new project or idea arrives with real energy behind it.',
      harmony: { wands: 1 },
    },
    reversed: {
      text: 'The spark fizzles. A good idea arrives at the wrong moment.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'wands_2', suit: 'wands', number: 2, name: 'Two of Wands',
    upright: {
      text: 'Planning and possibility. A vision for what the community could become.',
      harmony: { wands: 1 },
    },
    reversed: {
      text: 'Plans made but no action taken. The vision fades for lack of commitment.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'wands_3', suit: 'wands', number: 3, name: 'Three of Wands',
    upright: {
      text: 'A project launches. Early results are promising and momentum is building.',
      harmony: { wands: 1 },
    },
    reversed: {
      text: 'Delays or unexpected obstacles in a project already underway.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'wands_4', suit: 'wands', number: 4, name: 'Four of Wands',
    upright: {
      text: 'A milestone reached. The community celebrates before pressing on.',
      harmony: { wands: 1, cups: 1 },
    },
    reversed: {
      text: 'Celebration deferred or recognition withheld. The joy feels incomplete.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'wands_5', suit: 'wands', number: 5, name: 'Five of Wands',
    upright: {
      text: 'Creative conflict — many ideas competing, no clear direction emerges.',
      harmony: { wands: -1 },
    },
    reversed: {
      text: 'The argument finally resolves. A shared direction emerges from the noise.',
      harmony: { wands: 1 },
    },
  },
  {
    id: 'wands_6', suit: 'wands', number: 6, name: 'Six of Wands',
    upright: {
      text: 'Public recognition. Someone\'s effort is celebrated by the whole community.',
      harmony: { wands: 1, cups: 1 },
    },
    reversed: {
      text: 'Credit goes unacknowledged. Success dimmed by ego or jealousy.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'wands_7', suit: 'wands', number: 7, name: 'Seven of Wands',
    upright: {
      text: 'Standing firm under pressure. A difficult position is held with integrity.',
      harmony: { swords: 1 },
    },
    reversed: {
      text: 'Defensiveness has become stubbornness. The hill isn\'t worth the cost.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'wands_8', suit: 'wands', number: 8, name: 'Eight of Wands',
    upright: {
      text: 'Things move fast. Messages arrive, decisions need making, momentum builds.',
      harmony: { wands: 2 },
    },
    reversed: {
      text: 'Things moving too fast. Poor communication leads to costly errors.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'wands_9', suit: 'wands', number: 9, name: 'Nine of Wands',
    upright: {
      text: 'Weary but not done. The final push lies just ahead. Hold on a little longer.',
      harmony: {},
    },
    reversed: {
      text: 'Burned out. The sustained effort has cost more than it should have.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'wands_10', suit: 'wands', number: 10, name: 'Ten of Wands',
    upright: {
      text: 'The burden is heavy but carried. Something will need to be put down soon.',
      harmony: { wands: -1 },
    },
    reversed: {
      text: 'A burden is finally put down or shared. Relief is immediate.',
      harmony: { wands: 1 },
    },
  },
  {
    id: 'wands_11', suit: 'wands', number: 11, name: 'Page of Wands',
    upright: {
      text: 'An enthusiastic newcomer brings fresh ideas and boundless, contagious energy.',
      harmony: { wands: 1 },
    },
    reversed: {
      text: 'Enthusiasm without follow-through. Big talk, little action.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'wands_12', suit: 'wands', number: 12, name: 'Knight of Wands',
    upright: {
      text: 'Bold, daring, perhaps reckless — but unmistakably inspiring.',
      harmony: { wands: 1 },
    },
    reversed: {
      text: 'A daring plan goes wrong. Impulsiveness leaves damage in its wake.',
      harmony: { wands: -1, pentacles: -1 },
    },
  },
  {
    id: 'wands_13', suit: 'wands', number: 13, name: 'Queen of Wands',
    upright: {
      text: 'A magnetic, creative force in the community. Others are drawn and inspired by her energy.',
      harmony: { wands: 2, cups: 1 },
    },
    reversed: {
      text: 'Creative fire turned domineering. Her vision starts crowding out others\'.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'wands_14', suit: 'wands', number: 14, name: 'King of Wands',
    upright: {
      text: 'Visionary leadership. The community is pulled toward ambitious, shared goals.',
      harmony: { wands: 2 },
    },
    reversed: {
      text: 'Ambition without regard for others. The vision becomes a demand.',
      harmony: { wands: -1, cups: -1 },
    },
  },
]

// ─── Swords (conflict, decisions, hard truths, communication) ─────────────────
const swordsCards = [
  {
    id: 'swords_1', suit: 'swords', number: 1, name: 'Ace of Swords',
    upright: {
      text: 'A hard truth arrives with the clarity of a clean cut. Speak it.',
      harmony: { swords: 1 },
    },
    reversed: {
      text: 'The truth is known but not spoken. A slow tension builds.',
      harmony: { swords: -1 },
    },
  },
  {
    id: 'swords_2', suit: 'swords', number: 2, name: 'Two of Swords',
    upright: {
      text: 'A difficult decision must be made. Both options have real costs.',
      harmony: {},
    },
    reversed: {
      text: 'The stalemate finally breaks. The choice can no longer be avoided.',
      harmony: { swords: 1 },
    },
  },
  {
    id: 'swords_3', suit: 'swords', number: 3, name: 'Three of Swords',
    upright: {
      text: 'Grief. Something painful must be acknowledged before it can heal.',
      harmony: { cups: -1, swords: -1 },
    },
    reversed: {
      text: 'The grief begins to ease. The wound is healing, slowly but truly.',
      harmony: { cups: 1 },
    },
  },
  {
    id: 'swords_4', suit: 'swords', number: 4, name: 'Four of Swords',
    upright: {
      text: 'Deliberate rest after conflict. The sword is set down. The body is allowed to recover.',
      harmony: { cups: 1 },
    },
    reversed: {
      text: 'Forced rest, not chosen. Burnout from sustained tension has arrived.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'swords_5', suit: 'swords', number: 5, name: 'Five of Swords',
    upright: {
      text: 'A fight is won, but at cost. Victory arrives with a bitter aftertaste.',
      harmony: { cups: -1 },
    },
    reversed: {
      text: 'Both sides step back. No winner, but the conflict cools.',
      harmony: { swords: 1 },
    },
  },
  {
    id: 'swords_6', suit: 'swords', number: 6, name: 'Six of Swords',
    upright: {
      text: 'A difficult transition. Moving away from what hurt toward calmer waters.',
      harmony: { cups: 1 },
    },
    reversed: {
      text: 'The move is necessary but resisted. Clinging to familiar pain.',
      harmony: { wands: -1 },
    },
  },
  {
    id: 'swords_7', suit: 'swords', number: 7, name: 'Seven of Swords',
    upright: {
      text: 'Something is being done alone, in secret, without community knowledge.',
      harmony: { swords: -1 },
    },
    reversed: {
      text: 'What was hidden comes to light. The community can finally address it.',
      harmony: { swords: 1 },
    },
  },
  {
    id: 'swords_8', suit: 'swords', number: 8, name: 'Eight of Swords',
    upright: {
      text: 'Someone feels trapped by circumstances — but the constraints may be self-imposed.',
      harmony: { swords: -1 },
    },
    reversed: {
      text: 'The binds are loosening. Movement becomes possible again.',
      harmony: { swords: 1 },
    },
  },
  {
    id: 'swords_9', suit: 'swords', number: 9, name: 'Nine of Swords',
    upright: {
      text: 'Anxiety in the night. Worry spirals beyond what the day actually warrants.',
      harmony: { cups: -1, swords: -1 },
    },
    reversed: {
      text: 'The spiral slows. Morning comes and things are less terrible than feared.',
      harmony: { cups: 1 },
    },
  },
  {
    id: 'swords_10', suit: 'swords', number: 10, name: 'Ten of Swords',
    upright: {
      text: 'A definitive, painful ending. It could not have gone on.',
      harmony: { swords: -1, pentacles: -1 },
    },
    reversed: {
      text: 'A painful ending turns, slowly but surely, into a new beginning.',
      harmony: { wands: 1 },
    },
  },
  {
    id: 'swords_11', suit: 'swords', number: 11, name: 'Page of Swords',
    upright: {
      text: 'A sharp mind seeks truth. Questions are raised that others were afraid to ask.',
      harmony: { swords: 1 },
    },
    reversed: {
      text: 'Gossip or careless words cause unintended hurt.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'swords_12', suit: 'swords', number: 12, name: 'Knight of Swords',
    upright: {
      text: 'Swift and decisive — the problem is addressed head-on without hesitation.',
      harmony: { swords: 1 },
    },
    reversed: {
      text: 'Aggression mistaken for action. A blunt approach wounds the community.',
      harmony: { cups: -1, swords: -1 },
    },
  },
  {
    id: 'swords_13', suit: 'swords', number: 13, name: 'Queen of Swords',
    upright: {
      text: 'Clear-eyed, honest, kind in her directness. Truth delivered with real care.',
      harmony: { swords: 2 },
    },
    reversed: {
      text: 'Coldness masquerading as clarity. Cruelty excused as honesty.',
      harmony: { cups: -1 },
    },
  },
  {
    id: 'swords_14', suit: 'swords', number: 14, name: 'King of Swords',
    upright: {
      text: 'Wise, measured authority. Rules exist to protect the community, not to control it.',
      harmony: { swords: 2 },
    },
    reversed: {
      text: 'Tyranny dressed as fairness. Law without compassion.',
      harmony: { swords: -1, cups: -1 },
    },
  },
]

export const defaultCards = [
  ...majorArcana,
  ...cupsCards,
  ...pentaclesCards,
  ...wandsCards,
  ...swordsCards,
]
