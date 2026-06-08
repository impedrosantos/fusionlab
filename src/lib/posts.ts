// Post store backed by localStorage. Posts created in the backoffice show up
// in the public gallery. Replace with API calls when a backend exists.

export interface Post {
  id: string
  title: string
  imageUrl: string
  material: string
  description: string
  createdAt: number
}

const STORAGE_KEY = 'fusionlab.posts'
const EVENT = 'fusionlab:posts-changed'

const SEED: Omit<Post, 'id' | 'createdAt'>[] = [
  {
    title: 'Voronoi Vase',
    imageUrl:
      'https://images.unsplash.com/photo-1631116616748-eea3e6e74e3d?auto=format&fit=crop&w=900&q=80',
    material: 'PLA · 0.12mm',
    description: 'Organic lattice vase printed in a single 9-hour run.',
  },
  {
    title: 'Articulated Dragon',
    imageUrl:
      'https://images.unsplash.com/photo-1606191400980-9f3a4f1e3a3c?auto=format&fit=crop&w=900&q=80',
    material: 'PETG · 0.16mm',
    description: 'Print-in-place model, fully posable straight off the bed.',
  },
  {
    title: 'Topographic Map',
    imageUrl:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80',
    material: 'Resin · 50µm',
    description: 'High-detail terrain relief printed on an LCD resin machine.',
  },
  {
    title: 'Mechanical Gearbox',
    imageUrl:
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=80',
    material: 'ABS · 0.20mm',
    description: 'Functional planetary gear set, tolerances dialed in.',
  },
]

function read(): Post[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      return JSON.parse(raw) as Post[]
    } catch {
      // fall through to seed
    }
  }
  const seeded: Post[] = SEED.map((p, i) => ({
    ...p,
    id: cryptoId(),
    createdAt: Date.now() - (SEED.length - i) * 86_400_000,
  }))
  write(seeded)
  return seeded
}

function write(posts: Post[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  window.dispatchEvent(new Event(EVENT))
}

function cryptoId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function getPosts(): Post[] {
  return read().sort((a, b) => b.createdAt - a.createdAt)
}

export function createPost(data: Omit<Post, 'id' | 'createdAt'>): Post {
  const post: Post = { ...data, id: cryptoId(), createdAt: Date.now() }
  write([post, ...read()])
  return post
}

export function updatePost(id: string, data: Omit<Post, 'id' | 'createdAt'>): void {
  write(read().map((p) => (p.id === id ? { ...p, ...data } : p)))
}

export function deletePost(id: string): void {
  write(read().filter((p) => p.id !== id))
}

/** Subscribe to store changes (e.g. to keep the gallery in sync). */
export function onPostsChanged(cb: () => void): () => void {
  window.addEventListener(EVENT, cb)
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener(EVENT, cb)
    window.removeEventListener('storage', cb)
  }
}
