/** Utilities for exporting game data. */

/** Download the journal as a plain text file. */
export function exportJournal(journal, forestName) {
  const filename = `${(forestName || 'journal').replace(/\s+/g, '_').toLowerCase()}_journal.txt`
  const blob = new Blob([journal], { type: 'text/plain;charset=utf-8' })
  triggerDownload(blob, filename)
}

/** Download a Konva stage as PNG. */
export function exportMapPNG(stage, forestName) {
  const dataURL = stage.toDataURL({ pixelRatio: 2 })
  const filename = `${(forestName || 'map').replace(/\s+/g, '_').toLowerCase()}_map.png`
  const a = document.createElement('a')
  a.href = dataURL
  a.download = filename
  a.click()
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
