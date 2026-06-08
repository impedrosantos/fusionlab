import { Link } from 'react-router-dom'
import { useT } from '../i18n'

export default function Footer() {
  const t = useT()
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-name">
            Fusion<span className="accent">Lab</span>
          </span>
          <p className="footer-tagline">{t('footer.tagline')}</p>
          <a
            className="footer-ig"
            href="https://instagram.com/fusionlab0"
            target="_blank"
            rel="noreferrer noopener"
          >
            <InstagramIcon /> @fusionlab0
          </a>
        </div>

        <nav className="footer-links" aria-label={t('footer.studio')}>
          <span className="footer-col-title">{t('footer.studio')}</span>
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/contact">{t('nav.contact')}</Link>
        </nav>

        <nav className="footer-links" aria-label={t('footer.legal')}>
          <span className="footer-col-title">{t('footer.legal')}</span>
          <Link to="/privacy-policy">{t('footer.privacy')}</Link>
          <Link to="/cookies">{t('footer.cookies')}</Link>
        </nav>
      </div>

      <div className="container footer-bottom">
        <span className="mono dim">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </span>
        <span className="mono dim">{t('footer.builtWith')}</span>
      </div>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  )
}
