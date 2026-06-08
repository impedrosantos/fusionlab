// Lightweight client-side auth for the static demo backoffice.
// NOTE: This is a front-end-only gate for a static site. There is no real
// backend yet — credentials live here so the demo works without a server.
// Swap this module for a real API call when a backend is introduced.

const SESSION_KEY = 'fusionlab.session'

// Demo credentials. Change these before going live, or wire up a real backend.
const DEMO_USER = 'admin'
const DEMO_PASS = 'fusionlab'

export function login(username: string, password: string): boolean {
  if (username.trim() === DEMO_USER && password === DEMO_PASS) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ user: username, at: Date.now() }))
    return true
  }
  return false
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY)
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) !== null
}

export function currentUser(): string | null {
  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return (JSON.parse(raw) as { user: string }).user
  } catch {
    return null
  }
}
