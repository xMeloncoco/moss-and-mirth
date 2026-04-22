/**
 * defaultOracleTables.js
 * Seed data for NPC and sidequest oracle tables.
 * Verena can edit these via the Admin panel.
 *
 * Each table has { id, name, description?, entries: [{ id, text }] }
 */

export const defaultOracleTables = [
  {
    id: 'npc_species',
    name: 'NPC Species',
    description: 'Roll or pick a random species for a new NPC',
    entries: [
      { id: 'ns_1',  text: 'Hare' },
      { id: 'ns_2',  text: 'Fox' },
      { id: 'ns_3',  text: 'Raccoon' },
      { id: 'ns_4',  text: 'Squirrel' },
      { id: 'ns_5',  text: 'Hedgehog' },
      { id: 'ns_6',  text: 'Boar' },
      { id: 'ns_7',  text: 'Owl' },
      { id: 'ns_8',  text: 'Mouse' },
      { id: 'ns_9',  text: 'Bird' },
      { id: 'ns_10', text: 'Toad' },
    ],
  },
  {
    id: 'npc_role',
    name: 'NPC Forest Role',
    entries: [
      { id: 'nr_1',  text: 'farmer' },
      { id: 'nr_2',  text: 'merchant' },
      { id: 'nr_3',  text: 'builder' },
      { id: 'nr_4',  text: 'scout' },
      { id: 'nr_5',  text: 'healer' },
      { id: 'nr_6',  text: 'tinkerer' },
      { id: 'nr_7',  text: 'storyteller' },
      { id: 'nr_8',  text: 'herbalist' },
      { id: 'nr_9',  text: 'wanderer' },
      { id: 'nr_10', text: 'guardian' },
      { id: 'nr_11', text: 'cook' },
      { id: 'nr_12', text: 'cartographer' },
    ],
  },
  {
    id: 'npc_trait',
    name: 'NPC Personality Trait',
    entries: [
      { id: 'nt_1',  text: 'shy but warm' },
      { id: 'nt_2',  text: 'endlessly curious' },
      { id: 'nt_3',  text: 'loves riddles' },
      { id: 'nt_4',  text: 'hoards small treasures' },
      { id: 'nt_5',  text: 'sings while working' },
      { id: 'nt_6',  text: 'never forgets a face' },
      { id: 'nt_7',  text: 'speaks very quietly' },
      { id: 'nt_8',  text: 'always tired but always there' },
      { id: 'nt_9',  text: 'laughs at odd moments' },
      { id: 'nt_10', text: 'collects buttons and bottle caps' },
    ],
  },
  {
    id: 'npc_quirk',
    name: 'NPC Quirk',
    entries: [
      { id: 'nq_1', text: 'missing one ear' },
      { id: 'nq_2', text: 'wears a tiny hat at all times' },
      { id: 'nq_3', text: 'carries a mysterious locked box' },
      { id: 'nq_4', text: 'smells faintly of cinnamon' },
      { id: 'nq_5', text: 'blinks too slowly, like an owl' },
      { id: 'nq_6', text: 'always knows what time it is somehow' },
    ],
  },
  {
    id: 'sidequest_seeds',
    name: 'Sidequest Seeds',
    description: 'Random exploration hooks to inspire sidequests',
    entries: [
      { id: 'sq_1', text: 'A strange glowing mushroom appeared near the old hollow' },
      { id: 'sq_2', text: 'Someone has been leaving tiny gifts by the stream' },
      { id: 'sq_3', text: 'An unfamiliar bird has been circling the settlement for three days' },
      { id: 'sq_4', text: 'The old stone bridge is crumbling and needs repair before winter' },
      { id: 'sq_5', text: 'A distant melody drifts in from the deep woods at dusk' },
      { id: 'sq_6', text: 'Muddy paw prints appear every morning near the food stores' },
      { id: 'sq_7', text: 'A piece of map is found tucked inside a hollow log' },
      { id: 'sq_8', text: 'One of the berry bushes is blooming out of season' },
    ],
  },
]
