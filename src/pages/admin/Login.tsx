import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login, useAuth } from '../../lib/auth'
import { useT } from '../../i18n'

export default function Login() {
  const t = useT()
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // Already signed in? Go straight to the dashboard.
  if (!loading && user) {
    return <Navigate to="/panda87/dashboard" replace />
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email, password)
      navigate('/panda87/dashboard', { replace: true })
    } catch {
      setError(t('login.error'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="login-card">
        <div className="login-head">
          <span className="brand-mark accent" aria-hidden="true">
            ◢◣
          </span>
          <h1 className="mono">
            Fusion<span className="accent">Lab</span> :: {t('login.title')}
          </h1>
          <p className="mono dim">{t('login.subtitle')}</p>
        </div>

        <form onSubmit={onSubmit} className="login-form">
          <label>
            <span className="mono">{t('login.userLabel')}</span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@fusionlab.pt"
              autoFocus
            />
          </label>
          <label>
            <span className="mono">{t('login.passwordLabel')}</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <p className="login-error mono">{error}</p>}

          <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
            {busy ? t('login.submitting') : t('login.submit')}
          </button>
        </form>

        <p className="login-hint mono dim">{t('login.hint')}</p>
        <Link to="/" className="login-back mono dim">
          {t('login.back')}
        </Link>
      </div>
    </div>
  )
}
