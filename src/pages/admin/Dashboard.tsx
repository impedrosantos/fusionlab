import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'
import {
  subscribePosts,
  createPost,
  updatePost,
  deletePost,
  type Post,
} from '../../lib/posts'
import { uploadImage } from '../../lib/cloudinary'
import { logout, useAuth } from '../../lib/auth'
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
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [draft, setDraft] = useState<Draft>(EMPTY)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadPct, setUploadPct] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [uploadError, setUploadError] = useState('')

  useEffect(() => subscribePosts(setPosts), [])

  const handleFile = async (file?: File | null) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setUploadError(t('dashboard.imageTypeError'))
      return
    }
    setUploadError('')
    setUploading(true)
    setUploadPct(0)
    try {
      const url = await uploadImage(file, setUploadPct)
      setDraft((d) => ({ ...d, imageUrl: url }))
    } catch {
      setUploadError(t('dashboard.imageUploadError'))
    } finally {
      setUploading(false)
    }
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0])
    e.target.value = '' // allow re-picking the same file
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!draft.imageUrl) {
      setUploadError(t('dashboard.imageRequired'))
      return
    }
    setSaving(true)
    try {
      if (editingId) {
        await updatePost(editingId, draft)
      } else {
        await createPost(draft)
      }
      setDraft(EMPTY)
      setEditingId(null)
    } finally {
      setSaving(false)
    }
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
    setUploadError('')
  }

  const remove = async (p: Post) => {
    if (confirm(t('dashboard.confirmDelete', { title: p.title }))) {
      await deletePost(p.id)
      if (editingId === p.id) cancelEdit()
    }
  }

  const signOut = async () => {
    await logout()
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
              {user?.email} <span className="accent">●</span>
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
              <div className="admin-field">
                <span>{t('dashboard.imageLabel')}</span>
                <div
                  className={`dropzone${dragOver ? ' dragover' : ''}${
                    uploading ? ' is-uploading' : ''
                  }`}
                  role="button"
                  tabIndex={0}
                  onClick={() => !uploading && fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !uploading) {
                      e.preventDefault()
                      fileInputRef.current?.click()
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragOver(true)
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                >
                  {uploading ? (
                    <div className="dropzone-progress">
                      <span className="mono">
                        {t('dashboard.uploading')} {uploadPct}%
                      </span>
                      <div className="progress-bar">
                        <div style={{ width: `${uploadPct}%` }} />
                      </div>
                    </div>
                  ) : draft.imageUrl ? (
                    <span className="mono dim">{t('dashboard.imageReplace')}</span>
                  ) : (
                    <div className="dropzone-empty">
                      <span className="dropzone-icon mono accent" aria-hidden="true">
                        ⤓
                      </span>
                      <span className="mono">{t('dashboard.imageDrop')}</span>
                      <span className="mono dim dropzone-hint">
                        {t('dashboard.imageHint')}
                      </span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={onPick}
                />
                {uploadError && <p className="login-error">{uploadError}</p>}
              </div>
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

              {draft.imageUrl && !uploading && (
                <div className="admin-preview">
                  <span className="mono dim">{t('dashboard.preview')}</span>
                  <img src={draft.imageUrl} alt={t('dashboard.preview')} />
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setDraft((d) => ({ ...d, imageUrl: '' }))}
                  >
                    {t('dashboard.imageRemove')}
                  </button>
                </div>
              )}

              <div className="admin-form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving || uploading}
                >
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
