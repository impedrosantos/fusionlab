import { useEffect, useState } from 'react'
import { getPosts, onPostsChanged, type Post } from '../lib/posts'
import { useT } from '../i18n'

export default function Gallery() {
  const t = useT()
  const [posts, setPosts] = useState<Post[]>([])
  const [active, setActive] = useState<Post | null>(null)

  useEffect(() => {
    const refresh = () => setPosts(getPosts())
    refresh()
    return onPostsChanged(refresh)
  }, [])

  return (
    <section id="gallery" className="section">
      <div className="container">
        <header className="section-head">
          <span className="kicker mono">{t('gallery.kicker')}</span>
          <h2>{t('gallery.title')}</h2>
          <p className="section-sub">{t('gallery.sub')}</p>
        </header>

        {posts.length === 0 ? (
          <p className="empty mono">{t('gallery.empty')}</p>
        ) : (
          <div className="gallery-grid">
            {posts.map((p) => (
              <button key={p.id} className="gallery-card" onClick={() => setActive(p)}>
                <div className="gallery-img">
                  <img src={p.imageUrl} alt={p.title} loading="lazy" />
                  <span className="gallery-material mono">{p.material}</span>
                </div>
                <div className="gallery-meta">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              aria-label={t('gallery.close')}
              onClick={() => setActive(null)}
            >
              ×
            </button>
            <img src={active.imageUrl} alt={active.title} />
            <div className="lightbox-meta">
              <span className="gallery-material mono">{active.material}</span>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
