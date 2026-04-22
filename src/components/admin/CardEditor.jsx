/**
 * CardEditor.jsx
 * Browse and inline-edit card upright/reversed interpretations.
 * Reads / writes draft.cards_data via adminStore.
 */
import React, { useState, useRef, useCallback } from 'react'
import { useAdminStore } from '../../store/adminStore'
import Badge from '../ui/Badge'

// ── Constants ────────────────────────────────────────────────────────────────

const SUIT_ORDER = ['major', 'cups', 'pentacles', 'wands', 'swords']

const SUIT_LABELS = {
  major:     'Major Arcana',
  cups:      'Cups',
  pentacles: 'Pentacles',
  wands:     'Wands',
  swords:    'Swords',
}

const SUIT_FILTER_OPTIONS = [
  { value: 'all',       label: 'All Suits' },
  { value: 'major',     label: 'Major Arcana' },
  { value: 'cups',      label: 'Cups' },
  { value: 'pentacles', label: 'Pentacles' },
  { value: 'wands',     label: 'Wands' },
  { value: 'swords',    label: 'Swords' },
]

// ── Harmony badges ────────────────────────────────────────────────────────────

const HARMONY_LABELS = {
  cups:      'Community',
  pentacles: 'Resources',
  wands:     'Spirit',
  swords:    'Conflict',
}

function HarmonyBadges({ harmony }) {
  if (!harmony || Object.keys(harmony).length === 0) return null
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {Object.entries(harmony).map(([suit, val]) => (
        <span
          key={suit}
          className={`
            inline-block px-1.5 py-0.5 rounded text-xs font-body
            ${val > 0 ? 'bg-green-900/40 text-green-300' : 'bg-danger/30 text-danger'}
          `}
        >
          {val > 0 ? '+' : ''}{val} {HARMONY_LABELS[suit] ?? suit}
        </span>
      ))}
    </div>
  )
}

// ── Inline editable textarea ─────────────────────────────────────────────────

function EditableText({ cardId, orientation, value, onSave }) {
  const [focused, setFocused] = useState(false)
  const [local, setLocal] = useState(value ?? '')
  const textareaRef = useRef(null)

  // Sync if the store value changes from outside
  React.useEffect(() => {
    if (!focused) setLocal(value ?? '')
  }, [value, focused])

  function handleFocus() {
    setFocused(true)
  }

  function handleBlur() {
    setFocused(false)
    if (local !== (value ?? '')) {
      onSave(local)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setLocal(value ?? '')
      setFocused(false)
      textareaRef.current?.blur()
    }
  }

  return (
    <textarea
      ref={textareaRef}
      value={local}
      onChange={e => setLocal(e.target.value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      rows={focused ? 4 : 2}
      placeholder="Enter interpretation…"
      className={`
        w-full bg-transparent font-body text-xs text-cream leading-relaxed
        border rounded px-2 py-1.5 resize-none transition-all duration-150
        placeholder:text-sage/40 focus:outline-none
        ${focused
          ? 'border-gold/50 bg-white/5 ring-1 ring-gold/20'
          : 'border-transparent hover:border-gold/20'
        }
      `}
    />
  )
}

// ── Single card row ──────────────────────────────────────────────────────────

function CardRow({ card, onUpdateCard }) {
  function handleSave(orientation, newText) {
    onUpdateCard({
      ...card,
      [orientation]: { ...card[orientation], text: newText },
    })
  }

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 py-3 px-3 border-b border-white/5 hover:bg-white/[0.03] transition-colors">
      {/* Card name + badge */}
      <div className="flex flex-col gap-1">
        <span className="font-body text-cream text-sm font-semibold leading-tight">
          {card.name}
        </span>
        <div className="flex items-center gap-1 flex-wrap">
          {card.number !== undefined && (
            <span className="font-body text-sage/60 text-xs"># {card.number}</span>
          )}
          <Badge suit={card.suit}>{SUIT_LABELS[card.suit] ?? card.suit}</Badge>
        </div>
      </div>

      {/* Upright */}
      <div>
        <div className="flex items-center gap-1 mb-1">
          <span className="font-body text-xs text-green-400/80 uppercase tracking-wide">Upright</span>
        </div>
        <EditableText
          cardId={card.id}
          orientation="upright"
          value={card.upright?.text}
          onSave={text => handleSave('upright', text)}
        />
        <HarmonyBadges harmony={card.upright?.harmony} />
      </div>

      {/* Reversed */}
      <div>
        <div className="flex items-center gap-1 mb-1">
          <span className="font-body text-xs text-orange-400/80 uppercase tracking-wide">Reversed</span>
        </div>
        <EditableText
          cardId={card.id}
          orientation="reversed"
          value={card.reversed?.text}
          onSave={text => handleSave('reversed', text)}
        />
        <HarmonyBadges harmony={card.reversed?.harmony} />
      </div>
    </div>
  )
}

// ── Suit group ───────────────────────────────────────────────────────────────

function SuitGroup({ suit, cards, onUpdateCard }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="rounded-xl border border-gold/15 overflow-hidden mb-4">
      {/* Group header */}
      <button
        onClick={() => setCollapsed(x => !x)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-white/5 hover:bg-white/10 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <Badge suit={suit}>{SUIT_LABELS[suit] ?? suit}</Badge>
          <span className="font-body text-sage text-xs">{cards.length} cards</span>
        </div>
        <span className="text-sage text-sm">{collapsed ? '▸' : '▾'}</span>
      </button>

      {!collapsed && (
        <div>
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 px-3 py-1.5 border-b border-white/10 bg-white/[0.02]">
            <span className="font-body text-sage/60 text-xs uppercase tracking-wider">Card</span>
            <span className="font-body text-sage/60 text-xs uppercase tracking-wider">Upright</span>
            <span className="font-body text-sage/60 text-xs uppercase tracking-wider">Reversed</span>
          </div>
          {cards.map(card => (
            <CardRow key={card.id} card={card} onUpdateCard={onUpdateCard} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function CardEditor() {
  const draft = useAdminStore(s => s.draft)
  const setDraftCards = useAdminStore(s => s.setDraftCards)

  const [search, setSearch] = useState('')
  const [suitFilter, setSuitFilter] = useState('all')

  const cards = draft?.cards_data ?? []

  const handleUpdateCard = useCallback((updatedCard) => {
    setDraftCards(cards.map(c => c.id === updatedCard.id ? updatedCard : c))
  }, [cards, setDraftCards])

  if (!draft) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />
        ))}
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <p className="font-body text-sage italic text-sm py-4">
        No card data found in draft.
      </p>
    )
  }

  // Filter
  const filtered = cards.filter(card => {
    const matchesSuit = suitFilter === 'all' || card.suit === suitFilter
    const matchesSearch = !search.trim() ||
      card.name.toLowerCase().includes(search.toLowerCase())
    return matchesSuit && matchesSearch
  })

  // Group by suit, respecting order
  const grouped = SUIT_ORDER.reduce((acc, suit) => {
    const suitCards = filtered.filter(c => c.suit === suit)
    if (suitCards.length > 0) acc[suit] = suitCards
    return acc
  }, {})

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search cards by name…"
          className="
            flex-1 rounded-md px-3 py-2 font-body text-sm
            bg-white/10 border border-gold/20 text-cream
            placeholder:text-sage/50
            focus:outline-none focus:ring-2 focus:ring-gold/40
          "
        />
        <select
          value={suitFilter}
          onChange={e => setSuitFilter(e.target.value)}
          className="
            rounded-md px-3 py-2 font-body text-sm
            bg-white/10 border border-gold/20 text-cream
            focus:outline-none focus:ring-2 focus:ring-gold/40
            cursor-pointer
          "
        >
          {SUIT_FILTER_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-forest text-cream">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="font-body text-sage/60 text-xs mb-4">
        Showing {filtered.length} of {cards.length} cards
      </p>

      {/* Card groups */}
      {filtered.length === 0 ? (
        <p className="font-body text-sage italic text-sm py-4">
          No cards match your filters.
        </p>
      ) : (
        Object.entries(grouped).map(([suit, suitCards]) => (
          <SuitGroup
            key={suit}
            suit={suit}
            cards={suitCards}
            onUpdateCard={handleUpdateCard}
          />
        ))
      )}
    </div>
  )
}
