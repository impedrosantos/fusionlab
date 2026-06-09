import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useT } from '../i18n'

export default function Header() {
  const t = useT()
  const [open, setOpen] = useState(false)

  const links = [{ to: '/contact', label: t('nav.contact') }]

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img className="brand-logo" src="/logo.png" alt="" aria-hidden="true" />
          <span className="brand-name">
            Fusion<span className="accent">Lab</span>
          </span>
          <span className="brand-cursor" aria-hidden="true">
            _
          </span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
