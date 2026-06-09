// Post store backed by Cloud Firestore. Posts created in the backoffice are
// shared across all visitors and kept in sync in real time. Reads are public;
// writes require an authenticated user (enforced by firestore.rules).
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from './firebase'

export interface Post {
  id: string
  title: string
  imageUrl: string
  material: string
  description: string
  createdAt: number
}

export type PostInput = Omit<Post, 'id' | 'createdAt'>

const postsCol = collection(db, 'posts')

/**
 * Subscribe to the posts collection (newest first) in real time.
 * Calls `cb` with the current posts immediately and on every change.
 * Returns an unsubscribe function.
 */
export function subscribePosts(cb: (posts: Post[]) => void): () => void {
  const q = query(postsCol, orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => {
    const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Post)
    cb(posts)
  })
}

export async function createPost(data: PostInput): Promise<void> {
  await addDoc(postsCol, { ...data, createdAt: Date.now() })
}

export async function updatePost(id: string, data: PostInput): Promise<void> {
  await updateDoc(doc(db, 'posts', id), { ...data })
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, 'posts', id))
}
