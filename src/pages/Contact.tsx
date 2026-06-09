import { useState, type FormEvent } from 'react'
import { useT } from '../i18n'

export default function Contact() {
  const t = useT()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Static demo: no backend yet. Wire this to an email service or API later.
    setSent(true)
  }

  const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <article className="section legal">
      <div className="container container-narrow">
        <span className="kicker mono">{t('contact.kicker')}</span>
        <h1>{t('contact.title')}</h1>
        <p>{t('contact.intro')}</p>

        {sent ? (
          <div className="form-success mono">
            <strong>{t('contact.successTitle')}</strong>
            <p>
              {t('contact.successText', {
                name: form.name || t('contact.successThere'),
                email: form.email || t('contact.successInbox'),
              })}
            </p>
            <button className="btn btn-ghost" onClick={() => setSent(false)}>
              {t('contact.sendAnother')}
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={onSubmit}>
            <label>
              <span>{t('contact.nameLabel')}</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={update('name')}
                placeholder={t('contact.namePlaceholder')}
              />
            </label>
            <label>
              <span>{t('contact.emailLabel')}</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                placeholder={t('contact.emailPlaceholder')}
              />
            </label>
            <label>
              <span>{t('contact.messageLabel')}</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder={t('contact.messagePlaceholder')}
              />
            </label>
            <button type="submit" className="btn btn-primary">
              {t('contact.send')}
            </button>
          </form>
        )}
      </div>
    </article>
  )
}
