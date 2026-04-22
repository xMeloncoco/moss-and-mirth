/**
 * StoryJournal.jsx
 * Two-tab journal: free-form writing textarea + read-only community log.
 * Debounces setJournal calls at 500 ms and shows autosave indicator.
 */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useGameStore } from '../../store/gameStore'
import { exportJournal } from '../../lib/exportUtils'

export default function StoryJournal() {
  const { journal, gameState, setJournal } = useGameStore()
  const forestName = gameState?.forestName ?? 'journal'
  const communityLog = gameState?.communityLog ?? []

  const [activeTab, setActiveTab] = useState('write')
  const [localText, setLocalText] = useState(journal ?? '')
  const [saveState, setSaveState] = useState('saved') // 'saved' | 'saving'
  const debounceRef = useRef(null)

  // Keep localText in sync if journal changes externally (e.g. after load)
  useEffect(() => {
    setLocalText(journal ?? '')
  }, [journal])

  const handleChange = useCallback((e) => {
    const value = e.target.value
    setLocalText(value)
    setSaveState('saving')

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setJournal(value)
      setSaveState('saved')
    }, 500)
  }, [setJournal])

  // Clean up on unmount
  useEffect(() => () => clearTimeout(debounceRef.current), [])

  const wordCount = localText.trim() ? localText.trim().split(/\s+/).length : 0

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Top toolbar */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex gap-0">
          {['write', 'log'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-body text-sm px-4 py-1.5 rounded-t-lg capitalize transition-colors
                ${activeTab === tab
                  ? 'bg-parchment/10 text-gold border border-gold/30 border-b-0'
                  : 'text-sage hover:text-cream'
                }`}
            >
              {tab === 'write' ? '✍ Write' : '📜 Log'}
            </button>
          ))}
        </div>

        <button
          onClick={() => exportJournal(localText, forestName)}
          className="font-body text-xs text-sage border border-sage/30 rounded px-2 py-1
            hover:text-cream hover:border-cream/30 transition-colors"
          title="Export journal as .txt"
        >
          ↓ Export
        </button>
      </div>

      {/* Write tab */}
      {activeTab === 'write' && (
        <div className="flex flex-col flex-1 gap-2 min-h-0">
          <textarea
            value={localText}
            onChange={handleChange}
            placeholder="Write your forest story here… what happened today? What does the light look like through the canopy?"
            className="flex-1 min-h-[220px] bg-forest border border-gold/20 rounded-xl px-4 py-3
              font-body text-cream text-sm leading-relaxed resize-none focus:outline-none focus:border-gold
              placeholder:text-sage/35 transition-colors"
          />

          {/* Footer: word count + save indicator */}
          <div className="flex items-center justify-between shrink-0">
            <span className="font-body text-sage/50 text-xs">{wordCount} words</span>
            <span
              className={`font-body text-xs transition-opacity duration-300
                ${saveState === 'saving' ? 'text-sage animate-pulse' : 'text-sage/50'}`}
            >
              {saveState === 'saving' ? 'saving…' : 'saved'}
            </span>
          </div>
        </div>
      )}

      {/* Log tab */}
      {activeTab === 'log' && (
        <div className="flex-1 overflow-y-auto min-h-0">
          {communityLog.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <p className="font-body text-sage text-sm text-center">
                No log entries yet.<br />
                <span className="text-sage/60 text-xs">End a day to add the first one.</span>
              </p>
            </div>
          ) : (
            <ol className="flex flex-col gap-3">
              {[...communityLog].reverse().map((entry, idx) => (
                <li
                  key={`${entry.day}-${idx}`}
                  className="bg-parchment/5 border border-gold/15 rounded-xl p-4"
                >
                  <p className="font-body text-gold text-xs uppercase tracking-widest mb-1.5">
                    Day {entry.day}
                  </p>
                  <p className="font-body text-cream text-sm leading-relaxed whitespace-pre-line">
                    {entry.text || <span className="text-sage/50 italic">No note recorded.</span>}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  )
}
