/**
 * defaultRules.js
 * Editable rulebook text blocks.
 * Verena can update these via the Admin panel without touching code.
 *
 * Keys match the rulesText fields displayed in the How to Play section.
 */

export const defaultRules = {
  concept:
    'You play a small creature living in an enchanted forest, part of a tiny community trying to grow and thrive together. Each day brings a new tarot card that shapes the story — a visitor, a challenge, a moment of beauty or loss. You narrate what happens, track the community\'s wellbeing across four suits, and write it all in a journal. There is no winning or losing. There is only the forest, your neighbours, and what you choose to do with the time you have.',

  howToPlay:
    'Each in-game day follows a simple rhythm. Draw a card from the shuffled tarot deck and read its guidance for the orientation it lands in — upright or reversed. Narrate how your community responds to what the card brings. Adjust the four harmony tracks based on the outcome (each card suggests which suit is affected and by how much). If the card presents a challenge, roll a d20 and add your harmony modifier for the relevant suit; a high result means things go well, a low result means complications arise. Write a journal entry to capture the day. Then advance the day counter and begin again.',

  harmonyPoints:
    'Harmony tracks how well your community is doing across four areas of life, each linked to a tarot suit. Cups measures emotional bonds and morale. Pentacles measures resources, food, and practical needs. Wands measures creative energy and the progress of long-term projects. Swords measures how well the community handles conflict and hard truths. Each track runs from -5 (crisis) to +5 (flourishing). When you draw a card and respond to it, you adjust the relevant track up or down — usually by 1, sometimes by 2 for especially powerful moments. When rolling d20 for a challenge, add the current harmony score for the matching suit.',

  endGame:
    'Moss & Mirth has no fixed ending. Play until the story feels complete — until all your planned community ideas are built, until the forest has changed beyond recognition, or simply until you feel ready to write the final journal entry. Read your journal aloud at the end, from the first day to the last, and let yourself remember what you made.',
}
