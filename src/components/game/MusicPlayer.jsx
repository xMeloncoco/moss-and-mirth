/**
 * MusicPlayer.jsx
 * Embeds a YouTube video via the IFrame API with play/pause and volume controls.
 * Never auto-plays. Persists visibility & volume to localStorage.
 * compact=true → floating 🎵 button that expands to a small panel.
 */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { getMusicPreference, setMusicPreference } from '../../lib/localStorage'

const VIDEO_ID = 'TCp-0kOHij8'

// Load the YouTube IFrame API script once per page
let ytApiReady = false
let ytApiCallbacks = []

function loadYouTubeAPI(onReady) {
  if (ytApiReady) { onReady(); return }
  ytApiCallbacks.push(onReady)
  if (document.getElementById('yt-iframe-api')) return

  window.onYouTubeIframeAPIReady = () => {
    ytApiReady = true
    ytApiCallbacks.forEach(cb => cb())
    ytApiCallbacks = []
  }

  const script = document.createElement('script')
  script.id = 'yt-iframe-api'
  script.src = 'https://www.youtube.com/iframe_api'
  document.head.appendChild(script)
}

export default function MusicPlayer({ compact = false }) {
  const prefs = getMusicPreference()
  const [visible, setVisible] = useState(prefs.visible ?? false)
  const [volume, setVolume] = useState(prefs.volume ?? 50)
  const [playing, setPlaying] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)

  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const volumeRef = useRef(volume)

  // Sync volume ref so event handlers see fresh value
  volumeRef.current = volume

  // Save prefs to localStorage whenever they change
  useEffect(() => {
    setMusicPreference({ visible, volume })
  }, [visible, volume])

  // Initialise or destroy the YT player when visibility changes
  useEffect(() => {
    if (!visible) {
      // Destroy existing player to free resources
      if (playerRef.current) {
        try { playerRef.current.destroy() } catch (_) {}
        playerRef.current = null
        setPlayerReady(false)
        setPlaying(false)
      }
      return
    }

    loadYouTubeAPI(() => {
      if (playerRef.current) return // already created
      if (!containerRef.current) return

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(volumeRef.current)
            setPlayerReady(true)
          },
          onStateChange: (event) => {
            const state = event.data
            setPlaying(state === window.YT.PlayerState.PLAYING)
          },
        },
      })
    })
  }, [visible])

  // Apply volume changes to player while it exists
  const applyVolume = useCallback((v) => {
    if (playerRef.current && playerReady) {
      try { playerRef.current.setVolume(v) } catch (_) {}
    }
  }, [playerReady])

  function handleVolumeChange(e) {
    const v = Number(e.target.value)
    setVolume(v)
    applyVolume(v)
  }

  function handlePlayPause() {
    if (!playerRef.current || !playerReady) return
    try {
      if (playing) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
    } catch (_) {}
  }

  function handleOpen() {
    setVisible(true)
  }

  function handleHide() {
    setVisible(false)
  }

  // ── Compact mode ──────────────────────────────────────────────────────────

  if (compact) {
    return (
      <div className="relative">
        {!visible && (
          <button
            onClick={handleOpen}
            aria-label="Open music player"
            className="w-12 h-12 bg-forest border border-gold/30 rounded-full shadow-lg
              flex items-center justify-center text-xl hover:bg-gold/10 transition-colors"
          >
            🎵
          </button>
        )}

        {visible && (
          <div className="bg-forest border border-gold/30 rounded-2xl shadow-xl p-3 w-64 flex flex-col gap-3">
            {/* Hidden YT div */}
            <div className="hidden">
              <div ref={containerRef} />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-body text-gold text-xs uppercase tracking-wide">
                🎵 Forest Ambience
              </span>
              <button
                onClick={handleHide}
                className="font-body text-sage/60 hover:text-cream text-xs transition-colors"
                aria-label="Hide music player"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayPause}
                disabled={!playerReady}
                className="w-9 h-9 bg-gold text-forest rounded-full flex items-center justify-center
                  text-base hover:brightness-110 transition disabled:opacity-40 shrink-0"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? '⏸' : '▶'}
              </button>

              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                className="flex-1 accent-gold"
              />
              <span className="font-body text-sage text-xs w-6 text-right tabular-nums">
                {volume}
              </span>
            </div>

            {!playerReady && (
              <p className="font-body text-sage/50 text-xs text-center">Loading…</p>
            )}
          </div>
        )}
      </div>
    )
  }

  // ── Desktop / sidebar mode ────────────────────────────────────────────────

  return (
    <div className="p-3 flex flex-col gap-3">
      {/* Hidden YT container (always mounted when visible) */}
      {visible && (
        <div className="hidden">
          <div ref={containerRef} />
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="font-body text-sage text-xs uppercase tracking-wide">
          🎵 Music
        </span>
        {visible ? (
          <button
            onClick={handleHide}
            className="font-body text-sage/60 hover:text-cream text-xs transition-colors"
            aria-label="Hide music player"
          >
            hide
          </button>
        ) : (
          <button
            onClick={handleOpen}
            className="font-body text-sage text-xs border border-sage/30 rounded px-2 py-0.5
              hover:text-cream hover:border-cream/30 transition-colors"
            aria-label="Show music player"
          >
            show
          </button>
        )}
      </div>

      {visible && (
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayPause}
            disabled={!playerReady}
            className="w-8 h-8 bg-gold text-forest rounded-full flex items-center justify-center
              text-sm hover:brightness-110 transition disabled:opacity-40 shrink-0"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? '⏸' : '▶'}
          </button>

          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
            className="flex-1 accent-gold"
          />
          <span className="font-body text-sage text-xs w-6 text-right tabular-nums">
            {volume}
          </span>
        </div>
      )}

      {visible && !playerReady && (
        <p className="font-body text-sage/50 text-xs text-center">Loading player…</p>
      )}
    </div>
  )
}
