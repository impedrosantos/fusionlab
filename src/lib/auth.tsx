// Firebase Authentication for the backoffice. Users are created and managed in
// the Firebase console (Authentication → Users). Any signed-in user may access
// the backoffice; remove a user there to revoke access.
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from './firebase'

interface AuthValue {
  /** The signed-in Firebase user, or null when signed out. */
  user: User | null
  /** True until the initial auth state has been resolved. */
  loading: boolean
}

const AuthContext = createContext<AuthValue | null>(null)

/** Provides the current Firebase auth state to the app. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(auth.currentUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  const value = useMemo<AuthValue>(() => ({ user, loading }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/** Hook returning the current auth state ({ user, loading }). */
export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}

/** Sign in with email + password. Throws on failure (e.g. wrong credentials). */
export async function login(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email.trim(), password)
}

/** Sign the current user out. */
export async function logout(): Promise<void> {
  await signOut(auth)
}
