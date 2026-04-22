import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoginModal from '../components/auth/LoginModal'
import AdminDashboard from '../components/admin/AdminDashboard'

export default function AdminPage() {
  const { session, isAdmin, loading } = useAuth()
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false)

  if (loading) return (
    <div className="min-h-screen bg-forest flex items-center justify-center">
      <p className="font-body text-sage animate-pulse">Checking access…</p>
    </div>
  )

  if (!session) return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-center gap-6">
      <h1 className="font-display text-gold text-2xl">Admin Access</h1>
      <p className="font-body text-cream/70 text-sm">Please sign in to continue.</p>
      <button
        onClick={() => setShowLogin(true)}
        className="bg-gold text-forest font-body font-semibold rounded-lg px-6 py-2.5 hover:brightness-110"
      >
        Sign in
      </button>
      <button onClick={() => navigate('/')} className="font-body text-sage text-xs hover:text-cream">
        ← Back to home
      </button>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  )

  if (!isAdmin) return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-center gap-4">
      <h1 className="font-display text-danger text-2xl">Access Denied</h1>
      <p className="font-body text-cream/70 text-sm">Your account does not have admin privileges.</p>
      <button onClick={() => navigate('/')} className="font-body text-sage text-xs hover:text-cream underline">
        Back to home
      </button>
    </div>
  )

  return <AdminDashboard />
}
