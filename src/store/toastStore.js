import { create } from 'zustand'

export const useToastStore = create((set) => ({
  toasts: [],

  addToast: (message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random()
    set(state => ({ toasts: [...state.toasts, { id, message, type }] }))
    setTimeout(() => set(state => ({ toasts: state.toasts.filter(t => t.id !== id) })), duration)
  },

  removeToast: (id) => set(state => ({ toasts: state.toasts.filter(t => t.id !== id) })),
}))

/** Convenience hook — returns just the addToast function. */
export function useToast() {
  return useToastStore(s => s.addToast)
}
