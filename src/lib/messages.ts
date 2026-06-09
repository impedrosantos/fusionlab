// Contact-form messages backed by Cloud Firestore. Anyone may submit a message
// (public create, validated by firestore.rules); reading, marking read/unread
// and deleting require an authenticated backoffice user.
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

export interface Message {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  createdAt: number
}

export type MessageInput = Pick<Message, 'name' | 'email' | 'message'>

const messagesCol = collection(db, 'messages')

/**
 * Subscribe to the messages collection (newest first) in real time.
 * Calls `cb` with the current messages immediately and on every change.
 * Returns an unsubscribe function. Requires an authenticated user.
 */
export function subscribeMessages(cb: (messages: Message[]) => void): () => void {
  const q = query(messagesCol, orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => {
    const messages = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Message)
    cb(messages)
  })
}

/** Submit a new contact message. New messages start unread. Public (no auth). */
export async function createMessage(data: MessageInput): Promise<void> {
  await addDoc(messagesCol, {
    name: data.name.trim(),
    email: data.email.trim(),
    message: data.message.trim(),
    read: false,
    createdAt: Date.now(),
  })
}

/** Mark a message as read or unread. Requires an authenticated user. */
export async function setMessageRead(id: string, read: boolean): Promise<void> {
  await updateDoc(doc(db, 'messages', id), { read })
}

/** Delete a message. Requires an authenticated user. */
export async function deleteMessage(id: string): Promise<void> {
  await deleteDoc(doc(db, 'messages', id))
}
