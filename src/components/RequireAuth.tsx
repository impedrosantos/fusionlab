import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from '../lib/auth'

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation()
  if (!isAuthenticated()) {
    return <Navigate to="/bckfc3d" replace state={{ from: location.pathname }} />
  }
  return <>{children}</>
}
