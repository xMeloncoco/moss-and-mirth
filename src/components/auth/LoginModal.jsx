/**
 * LoginModal.jsx
 * Admin-only login form. No self-registration — one account managed in Supabase.
 * Shown when the user navigates to /admin while not authenticated.
 */
import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function LoginModal({ onClose }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      onClose?.()
    } catch (err) {
      setError(err.message ?? 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-forest border border-gold/30 rounded-xl p-8 w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-2xl text-gold mb-1">Admin Login</h2>
        <p className="font-body text-sage text-sm mb-6">Moss & Mirth — admin access only</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-body text-cream text-sm" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                bg-forest border border-gold/30 rounded-md px-3 py-2
                font-body text-cream text-sm
                focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50
                placeholder:text-sage
              "
              placeholder="admin@example.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-body text-cream text-sm" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                bg-forest border border-gold/30 rounded-md px-3 py-2
                font-body text-cream text-sm
                focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50
                placeholder:text-sage
              "
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="font-body text-danger text-sm bg-danger/10 border border-danger/30 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="
                flex-1 bg-gold text-forest font-body font-semibold text-sm
                rounded-md px-4 py-2 transition-all
                hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="
                  px-4 py-2 border border-gold/30 text-sage font-body text-sm
                  rounded-md hover:text-cream hover:border-gold/60 transition-colors
                "
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
