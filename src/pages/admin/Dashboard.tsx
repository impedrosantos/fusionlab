import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  onPostsChanged,
  type Post,
} from '../../lib/posts'
import { logout, currentUser } from '../../lib/auth'
import { useT } from '../../i18n'

type Draft = {
  title: string
  imageUrl: string
  material: string
  description: string
}

const EMPTY: Draft = { title: '', imageUrl: '', material: '', description: '' }

export default function Dashboard() {
  const t = useT()
  const navigate = useNavigate()
  const [posts, setPosts] = useState<Post[]>([])
  const [draft, setDraft] = useState<Draft>(EMPTY)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    const refresh = () => setPosts(getPosts())
    refresh()
    return onPostsChanged(refresh)
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updatePost(editingId, draft)
    } else {
      createPost(draft)
    }
    setDraft(EMPTY)
    setEditingId(null)
  }

  const startEdit = (p: Post) => {
    setEditingId(p.id)
    setDraft({
      title: p.title,
      imageUrl: p.imageUrl,
      material: p.material,
      description: p.description,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setDraft(EMPTY)
  }

  const remove = (p: Post) => {
    if (confirm(t('dashboard.confirmDelete', { title: p.title }))) {
      deletePost(p.id)
      if (editingId === p.id) cancelEdit()
    }
  }

  const signOut = () => {
    logout()
    navigate('/bckfc3d', { replace: true })
  }

  const set = (key: keyof Draft) => (e: { target: { value: string } }) =>
    setDraft((d) => ({ ...d, [key]: e.target.value }))

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="container admin-topbar-inner">
          <span className="brand-name mono">
            Fusion<span className="accent">Lab</span> :: {t('dashboard.title')}
          </span>
          <div className="admin-user mono">
            <span className="dim">
              {currentUser()}@fusionlab <span className="accent">●</span>
            </span>
            <button className="btn btn-ghost btn-sm" onClick={signOut}>
              {t('dashboard.signOut')}
            </button>
          </div>
        </div>
      </header>

      <main className="container admin-main">
        <div className="admin-grid">
          {/* Editor */}
          <section className="admin-panel">
            <h2 className="panel-title mono">
              {editingId ? t('dashboard.editPost') : t('dashboard.newPost')}
            </h2>
            <form className="admin-form" onSubmit={onSubmit}>
              <label>
                <span>{t('dashboard.titleLabel')}</span>
                <input
                  type="text"
                  required
                  value={draft.title}
                  onChange={set('title')}
                  placeholder={t('dashboard.titlePlaceholder')}
                />
              </label>
              <label>
                <span>{t('dashboard.imageLabel')}</span>
                <input
                  type="url"
                  required
                  value={draft.imageUrl}
                  onChange={set('imageUrl')}
                  placeholder={t('dashboard.imagePlaceholder')}
                />
              </label>
              <label>
                <span>{t('dashboard.materialLabel')}</span>
                <input
                  type="text"
                  value={draft.material}
                  onChange={set('material')}
                  placeholder={t('dashboard.materialPlaceholder')}
                />
              </label>
              <label>
                <span>{t('dashboard.descriptionLabel')}</span>
                <textarea
                  rows={3}
                  value={draft.description}
                  onChange={set('description')}
                  placeholder={t('dashboard.descriptionPlaceholder')}
                />
              </label>

              {draft.imageUrl && (
                <div className="admin-preview">
                  <span className="mono dim">{t('dashboard.preview')}</span>
                  <img src={draft.imageUrl} alt={t('dashboard.preview')} />
                </div>
              )}

              <div className="admin-form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? t('dashboard.saveChanges') : t('dashboard.publish')}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-ghost" onClick={cancelEdit}>
                    {t('dashboard.cancel')}
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* List */}
          <section className="admin-panel">
            <h2 className="panel-title mono">
              {t('dashboard.postsTitle')} <span className="dim">[{posts.length}]</span>
            </h2>
            {posts.length === 0 ? (
              <p className="empty mono">{t('dashboard.empty')}</p>
            ) : (
              <ul className="admin-list">
                {posts.map((p) => (
                  <li key={p.id} className={editingId === p.id ? 'editing' : ''}>
                    <img src={p.imageUrl} alt={p.title} className="admin-thumb" />
                    <div className="admin-list-meta">
                      <strong>{p.title}</strong>
                      <span className="mono dim">{p.material || '—'}</span>
                    </div>
                    <div className="admin-list-actions">
                      <button className="btn btn-ghost btn-sm" onClick={() => startEdit(p)}>
                        {t('dashboard.edit')}
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => remove(p)}>
                        {t('dashboard.delete')}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
