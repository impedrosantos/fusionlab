import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth'

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { user, loading } = useAuth()

  // Wait for Firebase to resolve the initial auth state before deciding.
  if (loading) {
    return <p className="empty mono">…</p>
  }
  if (!user) {
    return <Navigate to="/panda87" replace state={{ from: location.pathname }} />
  }
  return <>{children}</>
}
