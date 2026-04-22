import React from 'react'
import { useToastStore } from '../../store/toastStore'

const COLORS = {
  info:    'bg-forest border-gold/40 text-cream',
  success: 'bg-forest border-sage/60 text-cream',
  error:   'bg-forest border-danger/60 text-cream',
}
const ICONS = { info: 'ℹ', success: '✓', error: '✗' }

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()
  if (!toasts.length) return null
  return (
    <div className="fixed bottom-6 right-4 z-[100] flex flex-col gap-2 max-w-xs">
      {toasts.map(t => (
        <div
          key={t.id}
          onClick={() => removeToast(t.id)}
          className={`flex items-start gap-3 border rounded-lg px-4 py-3 shadow-xl cursor-pointer
            text-sm font-body transition-all ${COLORS[t.type] ?? COLORS.info}`}
        >
          <span className="mt-0.5 shrink-0">{ICONS[t.type]}</span>
          <span className="flex-1">{t.message}</span>
        </div>
      ))}
    </div>
  )
}
