import { Link } from 'react-router-dom'
import { useT } from '../i18n'

export default function NotFound() {
  const t = useT()
  return (
    <div className="notfound">
      <div className="container">
        <span className="kicker mono accent">{t('notFound.kicker')}</span>
        <h1 className="mono">{t('notFound.title')}</h1>
        <p>{t('notFound.text')}</p>
        <Link to="/" className="btn btn-primary">
          {t('notFound.back')}
        </Link>
      </div>
    </div>
  )
}
