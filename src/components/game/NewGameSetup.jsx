import React, { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { useToast } from '../../store/toastStore'

const SPECIES = ['Hare','Fox','Raccoon','Squirrel','Hedgehog','Boar','Owl','Mouse','Bird','Toad']
const SUITS   = ['cups','pentacles','wands','swords']
const SUIT_LABELS = { cups:'Community', pentacles:'Resources', wands:'Ambition', swords:'Resilience' }

function emptyChar() {
  return { name:'', species:'Hare', role:'', trait:'', flaw:'', flawSuit:'cups',
           modifiers:{ cups:1, pentacles:1, wands:1, swords:1 } }
}

export default function NewGameSetup({ onComplete }) {
  const { createSession } = useGameStore()
  const addToast = useToast()

  const [step, setStep] = useState(1)
  const [forestName, setForestName] = useState('')
  const [abundance, setAbundance] = useState(['','','',''])
  const [scarcity, setScarcity]   = useState([''])
  const [charCount, setCharCount] = useState(1)
  const [chars, setChars]         = useState([emptyChar(), emptyChar()])
  const [submitting, setSubmitting] = useState(false)

  // ── Step 1 helpers ────────────────────────────────────────────────────────

  function setAbundanceItem(i, v) {
    const a = [...abundance]; a[i] = v; setAbundance(a)
  }
  function addScarcity() { if (scarcity.length < 4) setScarcity([...scarcity, '']) }
  function setScarcityItem(i, v) {
    const s = [...scarcity]; s[i] = v; setScarcity(s)
  }

  // ── Step 2 helpers ────────────────────────────────────────────────────────

  function updateChar(idx, field, value) {
    setChars(prev => prev.map((c, i) => i === idx ? { ...c, [field]: value } : c))
  }
  function updateModifier(charIdx, suit, delta) {
    setChars(prev => prev.map((c, i) => {
      if (i !== charIdx) return c
      const mods = { ...c.modifiers }
      const total = Object.values(mods).reduce((a,b) => a+b, 0)
      if (delta > 0 && total >= 4) return c
      const next = mods[suit] + delta
      if (next < 0) return c
      return { ...c, modifiers: { ...mods, [suit]: next } }
    }))
  }

  // ── Validation ─────────────────────────────────────────────────────────────

  function validateStep1() {
    if (!forestName.trim()) return 'Please name your forest.'
    if (!abundance.some(a => a.trim())) return 'Add at least one abundance item.'
    if (!scarcity[0].trim()) return 'Add at least one scarcity item.'
    return null
  }
  function validateStep2() {
    for (let i = 0; i < charCount; i++) {
      const c = chars[i]
      if (!c.name.trim()) return `Character ${i+1} needs a name.`
      if (!c.role.trim()) return `Character ${i+1} needs a role.`
      const total = Object.values(c.modifiers).reduce((a,b) => a+b, 0)
      if (total !== 4) return `Character ${i+1}: distribute exactly 4 harmony points (currently ${total}).`
    }
    return null
  }

  function goNext() {
    const err = step === 1 ? validateStep1() : validateStep2()
    if (err) { addToast(err, 'error'); return }
    setStep(s => s + 1)
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

  async function handleStart() {
    const err = validateStep2()
    if (err) { addToast(err, 'error'); return }
    setSubmitting(true)
    try {
      const activeChars = chars.slice(0, charCount)
      const playerName = activeChars.map(c => c.name).join(' & ')
      const initialGameState = {
        characters: activeChars,
        harmony: { cups: 0, pentacles: 0, wands: 0, swords: 0 },
        forestName: forestName.trim(),
        abundance: abundance.filter(a => a.trim()),
        scarcity: scarcity.filter(s => s.trim()),
        ideas: [],
        cardHistory: [],
        dayCount: 1,
        communityLog: [],
        mapData: {},
      }
      const session = await createSession(playerName, initialGameState)
      onComplete?.(session.id)
    } catch (e) {
      addToast(e.message ?? 'Could not start game. Is the database seeded?', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1,2,3].map(n => (
          <React.Fragment key={n}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-sm font-semibold
              ${step === n ? 'bg-gold text-forest' : step > n ? 'bg-sage/40 text-cream' : 'border border-gold/30 text-sage'}`}>
              {n}
            </div>
            {n < 3 && <div className={`flex-1 h-px ${step > n ? 'bg-sage/40' : 'bg-gold/20'}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* ── Step 1: Forest ── */}
      {step === 1 && (
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-2xl text-gold">Name Your Forest</h2>
          <Field label="Forest Name">
            <input value={forestName} onChange={e => setForestName(e.target.value)}
              placeholder="e.g. Thornveil Hollow" className={inputCls} />
          </Field>
          <Field label="Abundance — What does your forest have? (up to 4)">
            <p className="font-body text-sage text-xs mb-2">
              We have {abundance.filter(a=>a).join(', ') || '…'}, but {scarcity.filter(s=>s).join(', ') || '…'} is scarce.
            </p>
            {abundance.map((a, i) => (
              <input key={i} value={a} onChange={e => setAbundanceItem(i, e.target.value)}
                placeholder={`Abundance item ${i+1}`} className={`${inputCls} mb-2`} />
            ))}
          </Field>
          <Field label="Scarcity — What is hard to find?">
            {scarcity.map((s, i) => (
              <input key={i} value={s} onChange={e => setScarcityItem(i, e.target.value)}
                placeholder={`Scarcity item ${i+1}`} className={`${inputCls} mb-2`} />
            ))}
            {scarcity.length < 4 && (
              <button onClick={addScarcity} className="font-body text-sage text-xs hover:text-gold">+ Add scarcity</button>
            )}
          </Field>
        </div>
      )}

      {/* ── Step 2: Characters ── */}
      {step === 2 && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-gold">Create Characters</h2>
            <div className="flex gap-2">
              {[1,2].map(n => (
                <button key={n} onClick={() => setCharCount(n)}
                  className={`font-body text-sm px-3 py-1 rounded-md border transition
                    ${charCount===n ? 'bg-gold text-forest border-gold' : 'border-gold/30 text-sage hover:border-gold'}`}>
                  {n} character{n>1?'s':''}
                </button>
              ))}
            </div>
          </div>

          {chars.slice(0, charCount).map((char, idx) => (
            <CharacterForm key={idx} char={char} idx={idx}
              onChange={(f,v) => updateChar(idx, f, v)}
              onModifier={(s,d) => updateModifier(idx, s, d)} />
          ))}
        </div>
      )}

      {/* ── Step 3: Review ── */}
      {step === 3 && (
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-2xl text-gold">Ready to Begin?</h2>
          <div className="border border-gold/20 rounded-xl p-5 flex flex-col gap-4 bg-parchment/5">
            <div>
              <p className="font-body text-sage text-xs uppercase tracking-wide mb-1">Forest</p>
              <p className="font-display text-gold text-xl">{forestName}</p>
              <p className="font-body text-cream/70 text-sm mt-1">
                Abundance: {abundance.filter(a=>a).join(', ') || '—'}<br/>
                Scarcity: {scarcity.filter(s=>s).join(', ') || '—'}
              </p>
            </div>
            {chars.slice(0,charCount).map((c,i) => (
              <div key={i} className="border-t border-gold/10 pt-4">
                <p className="font-body text-sage text-xs uppercase tracking-wide mb-1">Character {i+1}</p>
                <p className="font-display text-cream">{c.name} the {c.species} {c.role}</p>
                <p className="font-body text-cream/60 text-xs mt-1">Trait: {c.trait}</p>
                <p className="font-body text-cream/60 text-xs">Flaw: {c.flaw} ({SUIT_LABELS[c.flawSuit]})</p>
                <div className="flex gap-3 mt-2">
                  {SUITS.map(s => (
                    <span key={s} className="font-body text-xs text-sage">
                      {SUIT_LABELS[s][0]}: <span className="text-gold font-semibold">{c.modifiers[s] >= 0 ? '+' : ''}{c.modifiers[s]}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button onClick={() => setStep(s => s-1)}
            className="flex-1 border border-gold/30 text-sage font-body py-2.5 rounded-lg hover:text-cream hover:border-gold/60 transition">
            Back
          </button>
        )}
        {step < 3 ? (
          <button onClick={goNext}
            className="flex-1 bg-gold text-forest font-body font-semibold py-2.5 rounded-lg hover:brightness-110 transition">
            Continue
          </button>
        ) : (
          <button onClick={handleStart} disabled={submitting}
            className="flex-1 bg-gold text-forest font-body font-semibold py-2.5 rounded-lg hover:brightness-110 transition disabled:opacity-50">
            {submitting ? 'Starting…' : 'Start Adventure 🍄'}
          </button>
        )}
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

const inputCls = 'w-full bg-forest border border-gold/30 rounded-md px-3 py-2 font-body text-cream text-sm focus:outline-none focus:border-gold placeholder:text-sage/40'

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-cream text-sm">{label}</label>
      {children}
    </div>
  )
}

function CharacterForm({ char, idx, onChange, onModifier }) {
  const totalMods = Object.values(char.modifiers).reduce((a,b) => a+b, 0)
  return (
    <div className="border border-gold/20 rounded-xl p-5 bg-parchment/5 flex flex-col gap-4">
      <h3 className="font-display text-gold text-lg">Character {idx+1}</h3>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Name">
          <input value={char.name} onChange={e => onChange('name', e.target.value)} placeholder="Bramble" className={inputCls} />
        </Field>
        <Field label="Species">
          <select value={char.species} onChange={e => onChange('species', e.target.value)} className={inputCls}>
            {SPECIES.map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Role in the community">
        <input value={char.role} onChange={e => onChange('role', e.target.value)} placeholder="e.g. healer, builder, wanderer" className={inputCls} />
      </Field>
      <Field label="Defining trait">
        <input value={char.trait} onChange={e => onChange('trait', e.target.value)} placeholder="Something they are known for" className={inputCls} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Flaw">
          <input value={char.flaw} onChange={e => onChange('flaw', e.target.value)} placeholder="Their weakness" className={inputCls} />
        </Field>
        <Field label="Flaw applies to">
          <select value={char.flawSuit} onChange={e => onChange('flawSuit', e.target.value)} className={inputCls}>
            {SUITS.map(s => <option key={s} value={s}>{SUIT_LABELS[s]}</option>)}
          </select>
        </Field>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-cream text-sm">Harmony modifiers</label>
          <span className={`font-body text-xs ${totalMods===4?'text-sage':'text-danger'}`}>
            {totalMods}/4 distributed
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {SUITS.map(s => (
            <div key={s} className="flex items-center gap-2 border border-gold/20 rounded-md px-3 py-2">
              <span className="font-body text-sage text-xs flex-1">{SUIT_LABELS[s]}</span>
              <button onClick={() => onModifier(s, -1)} className="text-sage hover:text-cream w-5 text-center">−</button>
              <span className="font-body text-gold text-sm w-4 text-center">{char.modifiers[s]}</span>
              <button onClick={() => onModifier(s, +1)} className="text-sage hover:text-cream w-5 text-center">+</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
