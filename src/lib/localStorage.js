/** Helpers for persisting recent games and device preferences. */

const RECENT_KEY = 'moss-mirth-recent'
const MUSIC_KEY  = 'moss-mirth-music'

export function getRecentGames() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]')
  } catch { return [] }
}

export function saveRecentGame(sessionId, forestName, playerName) {
  const recent = getRecentGames().filter(g => g.sessionId !== sessionId)
  const updated = [{ sessionId, forestName, playerName, savedAt: Date.now() }, ...recent].slice(0, 3)
  localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
}

export function getMusicPreference() {
  try {
    return JSON.parse(localStorage.getItem(MUSIC_KEY) ?? '{"visible":false,"volume":50}')
  } catch { return { visible: false, volume: 50 } }
}

export function setMusicPreference(prefs) {
  localStorage.setItem(MUSIC_KEY, JSON.stringify(prefs))
}
