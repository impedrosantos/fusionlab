import { useT } from '../i18n'

export default function Cookies() {
  const t = useT()
  return (
    <article className="section legal">
      <div className="container container-narrow">
        <span className="kicker mono">{t('cookies.kicker')}</span>
        <h1>{t('cookies.title')}</h1>
        <p className="dim mono">{t('cookies.updated', { year: new Date().getFullYear() })}</p>

        <p>{t('cookies.intro')}</p>

        <h2>{t('cookies.whatTitle')}</h2>
        <p>{t('cookies.whatText')}</p>

        <h2>{t('cookies.useTitle')}</h2>
        <ul>
          <li>
            <strong>{t('cookies.essentialLabel')}</strong> {t('cookies.essentialText')}
          </li>
          <li>
            <strong>{t('cookies.contentLabel')}</strong> {t('cookies.contentText')}
          </li>
          <li>
            <strong>{t('cookies.trackingLabel')}</strong> {t('cookies.trackingText')}
          </li>
        </ul>

        <h2>{t('cookies.manageTitle')}</h2>
        <p>{t('cookies.manageText')}</p>
      </div>
    </article>
  )
}
