import React, { useRef, useState, useCallback } from 'react'
import { Stage, Layer, Line, Text, Image as KImage } from 'react-konva'
import { useGameStore } from '../../store/gameStore'
import { exportMapPNG } from '../../lib/exportUtils'

const TOOLS = ['pen', 'text', 'stamp', 'eraser']
const STAMPS = ['🏠','🌿','🍄','💧','🛒','🌊','🗺️','🪨','🌲','⛺']

const TOOL_ICONS = { pen:'✏️', text:'T', stamp:'🏠', eraser:'⬜' }

export default function MapCanvas() {
  const { gameState, updateMapData } = useGameStore()
  const stageRef   = useRef(null)
  const [tool, setTool]         = useState('pen')
  const [stamp, setStamp]       = useState('🏠')
  const [color, setColor]       = useState('#C8973A')
  const [strokeWidth, setStrokeWidth] = useState(3)
  const [lines, setLines]       = useState(gameState?.mapData?.lines ?? [])
  const [texts, setTexts]       = useState(gameState?.mapData?.texts ?? [])
  const [history, setHistory]   = useState([])

  const isDrawing = useRef(false)

  // ── Konva handlers ────────────────────────────────────────────────────────

  function persist(newLines, newTexts) {
    updateMapData({ lines: newLines, texts: newTexts })
  }

  const handleMouseDown = useCallback((e) => {
    const pos = e.target.getStage().getPointerPosition()

    if (tool === 'stamp') {
      const id = crypto.randomUUID()
      const next = [...texts, { id, type:'stamp', x: pos.x - 16, y: pos.y - 16, text: stamp, fontSize: 32 }]
      setTexts(next)
      persist(lines, next)
      return
    }

    if (tool === 'text') {
      const label = window.prompt('Enter map label:')
      if (!label?.trim()) return
      const id = crypto.randomUUID()
      const next = [...texts, { id, type:'label', x: pos.x, y: pos.y, text: label, fontSize: 14, fill: color }]
      setTexts(next)
      persist(lines, next)
      return
    }

    isDrawing.current = true
    const newLine = {
      id: crypto.randomUUID(),
      tool,
      points: [pos.x, pos.y],
      stroke: tool === 'eraser' ? '#1C3326' : color,
      strokeWidth: tool === 'eraser' ? 20 : strokeWidth,
      lineCap: 'round',
      lineJoin: 'round',
      globalCompositeOperation: tool === 'eraser' ? 'destination-out' : 'source-over',
    }
    setLines(prev => [...prev, newLine])
  }, [tool, stamp, color, strokeWidth, lines, texts])

  const handleMouseMove = useCallback((e) => {
    if (!isDrawing.current) return
    const pos = e.target.getStage().getPointerPosition()
    setLines(prev => {
      const last = prev[prev.length - 1]
      const updated = { ...last, points: [...last.points, pos.x, pos.y] }
      return [...prev.slice(0, -1), updated]
    })
  }, [])

  const handleMouseUp = useCallback(() => {
    if (!isDrawing.current) return
    isDrawing.current = false
    // Persist after drawing stroke
    setLines(prev => {
      persist(prev, texts)
      return prev
    })
  }, [texts])

  function handleUndo() {
    if (lines.length > 0) {
      const prev = lines.slice(0, -1)
      setLines(prev)
      persist(prev, texts)
    } else if (texts.length > 0) {
      const prev = texts.slice(0, -1)
      setTexts(prev)
      persist(lines, prev)
    }
  }

  function handleExport() {
    if (stageRef.current) exportMapPNG(stageRef.current, gameState?.forestName)
  }

  const W = typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 800) : 600
  const H = 450

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap">
        {TOOLS.map(t => (
          <button key={t} onClick={() => setTool(t)}
            className={`px-3 py-1.5 rounded-md font-body text-xs transition border
              ${tool===t ? 'bg-gold text-forest border-gold' : 'border-gold/30 text-sage hover:text-cream'}`}>
            {TOOL_ICONS[t]} {t}
          </button>
        ))}

        {tool === 'stamp' && (
          <div className="flex gap-1 flex-wrap">
            {STAMPS.map(s => (
              <button key={s} onClick={() => setStamp(s)}
                className={`text-xl w-8 h-8 rounded transition ${stamp===s ? 'bg-gold/30 ring-1 ring-gold' : 'hover:bg-parchment/10'}`}>
                {s}
              </button>
            ))}
          </div>
        )}

        {tool === 'pen' && (
          <>
            <input type="color" value={color} onChange={e => setColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer bg-transparent border-0" />
            <input type="range" min={1} max={12} value={strokeWidth} onChange={e => setStrokeWidth(+e.target.value)}
              className="w-20 accent-gold" />
          </>
        )}

        <button onClick={handleUndo} className="font-body text-sage text-xs border border-gold/20 rounded px-2 py-1 hover:text-cream ml-auto">
          ↩ Undo
        </button>
        <button onClick={handleExport} className="font-body text-xs border border-gold/30 text-gold rounded px-2 py-1 hover:bg-gold/10">
          Export PNG
        </button>
      </div>

      {/* Canvas */}
      <div className="border border-gold/20 rounded-xl overflow-hidden bg-forest">
        <Stage
          ref={stageRef}
          width={W} height={H}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          style={{ cursor: tool === 'eraser' ? 'cell' : 'crosshair' }}
        >
          <Layer>
            {lines.map(line => (
              <Line key={line.id} {...line} tension={0.5} />
            ))}
            {texts.map(t => (
              <Text key={t.id} x={t.x} y={t.y} text={t.text}
                fontSize={t.fontSize} fill={t.fill ?? '#C8973A'} fontFamily="Lora, serif" />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  )
}
