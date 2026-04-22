/**
 * AdminOnly.jsx
 * Renders children only when the current user is confirmed admin.
 * Renders nothing (not an error) for players or unauthenticated users.
 */
import { useAuth } from '../../hooks/useAuth'

export default function AdminOnly({ children }) {
  const { isAdmin, loading } = useAuth()
  if (loading || !isAdmin) return null
  return children
}
