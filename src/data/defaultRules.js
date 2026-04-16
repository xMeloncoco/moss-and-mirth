/**
 * defaultRules.js
 * Seed data for editable rulebook text blocks.
 * Verena can update these via the Admin panel without touching code.
 *
 * Each block has:
 *   id      — unique string key
 *   title   — section heading shown to players
 *   body    — markdown-compatible body text
 */

export const defaultRules = [
  {
    id: 'overview',
    title: 'Welcome to Moss & Mirth',
    body: `Moss & Mirth is a solo or small-group tabletop roleplaying game about building and tending a small forest community. You are its stewards — drawing tarot cards to discover what each day brings, tracking the harmony of your community across four suits, and writing the story of your growing home.

No game master is required. The cards, the oracle tables, and your imagination guide the story.`,
  },
  {
    id: 'the-four-suits',
    title: 'The Four Suits',
    body: `Each tarot suit represents one pillar of your community's wellbeing:

**Cups** — Emotional bonds, relationships, and morale
**Pentacles** — Resources, food, shelter, and practical needs
**Wands** — Creativity, ambition, and long-term projects
**Swords** — Conflict, hard truths, and decisive action

Your community starts with 0 points in each suit. Harmony rises and falls based on how you respond to each day's card.`,
  },
  {
    id: 'a-day-in-the-forest',
    title: 'A Day in the Forest',
    body: `Each in-game day follows this structure:

1. **Draw a card** from the shuffled tarot deck.
2. **Read the guidance** for that card's orientation (upright or reversed).
3. **Decide how your community responds** — narrate freely.
4. **Adjust harmony** based on the outcome (the card will suggest which suit is affected).
5. **Roll d20** if the card calls for a challenge — your harmony modifier for the relevant suit is added.
6. **Write in the journal** to record the day's events.
7. **Advance the day counter** and begin again.`,
  },
  {
    id: 'harmony',
    title: 'Harmony',
    body: `Harmony represents how well your community is thriving in each of the four areas of life.

- Harmony ranges from **-5 to +5** in each suit.
- A suit at -5 means that area of community life is in crisis.
- A suit at +5 means your community is flourishing in that area.
- When rolling d20 for a challenge, add your harmony score for the relevant suit.
- Harmony changes are usually +1 or -1 per day, sometimes more for major events.`,
  },
  {
    id: 'ideas',
    title: 'Community Ideas',
    body: `Ideas are long-term projects your community wants to bring to life — a new meeting hall, a herb garden, a mural on the old barn wall.

Each idea has:
- **Size** (small / medium / large) — determines how many Moments it takes to complete
- **Moments** — each day you spend time on the project costs one Moment
- **Resource cost** — some ideas require specific materials first

When an idea is complete, it may permanently boost harmony in one or more suits.`,
  },
  {
    id: 'characters',
    title: 'Characters',
    body: `Your community is made up of characters — the ones you play and the ones who live alongside you.

Each character has:
- A **name** and **species** (any forest creature or folk you imagine)
- A **role** in the community (healer, builder, storyteller…)
- A **trait** — something they're notably good at
- A **flaw** — a weakness tied to one of the four suits
- **Suit modifiers** — small bonuses or penalties that reflect their nature

When a character acts in their area of expertise, you may apply their modifier to the d20 roll.`,
  },
  {
    id: 'end-of-game',
    title: 'Ending the Game',
    body: `There is no fixed end state. The game ends when your story feels complete.

Common endings:
- All planned Ideas have been completed
- The forest has changed beyond recognition
- You choose to write the final journal entry

At the end, read your journal aloud and reflect on the community you built.`,
  },
]
