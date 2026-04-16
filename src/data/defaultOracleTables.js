/**
 * defaultOracleTables.js
 * Seed data for all oracle / inspiration tables.
 * Verena can edit these via the Admin panel.
 *
 * Structure:
 *   { id, label, entries: string[] }
 *
 * d20 roll → entries[roll - 1] (1-indexed for players, 0-indexed here)
 */

export const defaultOracleTables = [
  {
    id: 'npc-names',
    label: 'NPC Names',
    entries: [
      'Bramble', 'Sorrel', 'Finch', 'Clover', 'Wren',
      'Thicket', 'Dewdrop', 'Sable', 'Fern', 'Lichen',
      'Cobblestone', 'Nutmeg', 'Yarrow', 'Moth', 'Hazel',
      'Pippin', 'Toadstool', 'Sedge', 'Burrow', 'Coppice',
    ],
  },
  {
    id: 'npc-roles',
    label: 'NPC Roles',
    entries: [
      'Wandering herbalist', 'Disgraced elder', 'Curious youngling',
      'Gruff woodcutter', 'Soft-spoken healer', 'Nervous messenger',
      'Stubborn farmer', 'Joyful baker', 'Grieving parent', 'Bold scout',
      'Anxious merchant', 'Wise beekeeper', 'Secretive cartographer',
      'Cheerful musician', 'Reluctant guard', 'Forgotten scholar',
      'Resourceful tinkerer', 'Melancholy weaver', 'Ambitious young mayor', 'Lost pilgrim',
    ],
  },
  {
    id: 'npc-wants',
    label: 'What the NPC Wants',
    entries: [
      'To be heard', 'A safe place to sleep', 'A rare ingredient', 'Forgiveness',
      'Proof of their skill', 'Someone to share a meal with', 'A lost object returned',
      'A difficult truth told gently', 'Help with a heavy burden', 'A second chance',
      'News from afar', 'A promise kept', 'Protection for someone else',
      'Permission to leave', 'Recognition for their work', 'A secret kept',
      'More time', 'Companionship', 'Honest advice', 'An act of kindness',
    ],
  },
  {
    id: 'sidequests',
    label: 'Community Sidequests',
    entries: [
      'The old bridge is rotting — it must be repaired before winter.',
      'A strange illness has spread among the honeybees.',
      'A child has gone missing in the deep woods.',
      'The communal well has run dry.',
      'A traveling troupe wants to perform — the community is divided.',
      'Stores of grain have been gnawed through by unseen creatures.',
      'An old feud between two families threatens the harvest.',
      'A beautiful but toxic plant is spreading through the gardens.',
      'Someone has been stealing from the communal store.',
      'A flood has damaged three family homes.',
      'A newcomer is hiding a dangerous secret.',
      'The community mill has broken and repairs require rare parts.',
      'Two elders disagree on the location of a new meeting hall.',
      'A fire has destroyed the healers\' herb garden.',
      'An animal companion has escaped and is causing mischief.',
      'Strange music is heard at night from the eastern hollow.',
      'The seasonal festival preparations have gone wrong.',
      'A debt long forgotten has returned to complicate things.',
      'The community\'s only map is found to be wrong.',
      'A rare bird has nested in an inconvenient place.',
    ],
  },
  {
    id: 'weather',
    label: 'Forest Weather',
    entries: [
      'Clear and bright — sunbeams pierce the canopy',
      'Soft morning mist that clings until noon',
      'Steady gentle rain — everything smells of petrichor',
      'Overcast and still — a quiet, grey day',
      'Unseasonable warmth — insects buzz lazily',
      'Light frost on the undergrowth at dawn',
      'Gusting wind that shakes the treetops',
      'Thick fog — visibility a few paces',
      'Sudden downpour that passes quickly',
      'Heavy snowfall that muffles all sound',
      'Patchy clouds and shifting light',
      'A hot, humid stillness before a storm',
      'Rainbow arching over the eastern grove',
      'Ice storm — travel is difficult',
      'Perfect mild weather — rare and golden',
      'Sleet and mud underfoot',
      'Rolling thunderstorm approaching from the west',
      'Eerie stillness — even the birds are quiet',
      'Dappled shade and a cool breeze',
      'Blazing summer sun with no cover',
    ],
  },
  {
    id: 'complications',
    label: 'Unexpected Complications',
    entries: [
      'A key tool breaks at the worst moment.',
      'An old ally has changed sides.',
      'Help arrives — but it comes with conditions.',
      'The wrong person overhears a private conversation.',
      'A needed resource is found, but it belongs to someone else.',
      'An assumed truth turns out to be a rumour.',
      'Two urgent tasks arise at exactly the same time.',
      'A plan that worked before fails now.',
      'Someone is hurt — not seriously, but it changes the mood.',
      'The weather turns against the community.',
      'A newcomer joins just as things get complicated.',
      'An old secret surfaces at the worst time.',
      'The most experienced person is unavailable.',
      'Something valuable is lost or misplaced.',
      'A misunderstanding escalates before it can be corrected.',
      'A shortcut leads somewhere unexpected.',
      'An animal causes chaos at a crucial moment.',
      'An unexpected visitor demands hospitality.',
      'A fire — small, but distracting.',
      'The season changes faster than expected.',
    ],
  },
]
