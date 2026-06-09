import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery'
import { InstagramIcon } from '../components/icons'
import { useT } from '../i18n'

export default function Home() {
  const t = useT()

  return (
    <>
      <section className="hero">
        <div className="hero-grid-overlay" aria-hidden="true" />
        <div className="container hero-content">
          <span className="kicker mono">{t('home.kicker')}</span>
          <h1 className="hero-title">
            <span className="print-title">
              <span className="print-text">{t('home.titleA')}</span>
              <span className="print-nozzle" aria-hidden="true" />
            </span>
          </h1>
          <p className="hero-sub">{t('home.sub')}</p>
          <div className="hero-actions">
            <Link to="/#gallery" className="btn btn-primary">
              {t('home.viewGallery')}
            </Link>
            <a
              href="https://instagram.com/fusionlab0"
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost"
            >
              <InstagramIcon /> {t('home.follow')}
            </a>
          </div>

          <dl className="hero-stats">
            <div>
              <dt className="mono accent">{t('home.stat1Value')}</dt>
              <dd>{t('home.stat1Label')}</dd>
            </div>
            <div>
              <dt className="mono accent">{t('home.stat2Value')}</dt>
              <dd>{t('home.stat2Label')}</dd>
            </div>
            <div>
              <dt className="mono accent">{t('home.stat3Value')}</dt>
              <dd>{t('home.stat3Label')}</dd>
            </div>
          </dl>
        </div>
      </section>

      <Gallery />

      <section className="section about">
        <div className="container about-grid">
          <div>
            <span className="kicker mono">{t('home.aboutKicker')}</span>
            <h2>{t('home.aboutTitle')}</h2>
            <p>{t('home.aboutP1')}</p>
            <p>{t('home.aboutP2')}</p>
            <Link to="/contact" className="btn btn-primary">
              {t('home.aboutCta')}
            </Link>
          </div>
          <pre className="code-block mono" aria-hidden="true">
            {t('home.terminal')}
          </pre>
        </div>
      </section>
    </>
  )
}
