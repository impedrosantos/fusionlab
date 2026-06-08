import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, isAuthenticated } from '../../lib/auth'
import { useT } from '../../i18n'

export default function Login() {
  const t = useT()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Already signed in? Go straight to the dashboard.
  if (isAuthenticated()) {
    navigate('/bckfc3d/dashboard', { replace: true })
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (login(username, password)) {
      navigate('/bckfc3d/dashboard', { replace: true })
    } else {
      setError(t('login.error'))
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
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
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

          <button type="submit" className="btn btn-primary btn-block">
            {t('login.submit')}
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
