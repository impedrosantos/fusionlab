import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useT } from '../i18n'

export default function Header() {
  const t = useT()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/#gallery', label: t('nav.gallery') },
    { to: '/contact', label: t('nav.contact') },
  ]

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            ◢◣
          </span>
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
              end={l.end}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <a
            className="nav-cta"
            href="https://instagram.com/fusionlab0"
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setOpen(false)}
          >
            @fusionlab0
          </a>
        </nav>
      </div>
    </header>
  )
}
