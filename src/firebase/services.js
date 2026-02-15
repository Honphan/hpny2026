import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  runTransaction,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'

// ==================== WISHES ====================

/**
 * Get a wish by username
 * @param {string} username
 * @returns {Promise<{id: string, username: string, content: string, createdAt: any} | null>}
 */
export async function getWishByUsername(username) {
  try {
    const q = query(
      collection(db, 'wishes'),
      where('username', '==', username.toLowerCase().trim())
    )
    const snapshot = await getDocs(q)
    if (snapshot.empty) return null
    const docSnap = snapshot.docs[0]
    return { id: docSnap.id, ...docSnap.data() }
  } catch (error) {
    console.error('Error getting wish:', error)
    return null
  }
}

/**
 * Get all wishes (for admin)
 * @returns {Promise<Array>}
 */
export async function getAllWishes() {
  try {
    const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting all wishes:', error)
    return []
  }
}

/**
 * Add a new wish (admin)
 * @param {string} username
 * @param {string} content
 */
export async function addWish(username, content) {
  try {
    await addDoc(collection(db, 'wishes'), {
      username: username.toLowerCase().trim(),
      content,
      createdAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.error('Error adding wish:', error)
    return false
  }
}

/**
 * Delete a wish (admin)
 * @param {string} wishId
 */
export async function deleteWish(wishId) {
  try {
    await deleteDoc(doc(db, 'wishes', wishId))
    return true
  } catch (error) {
    console.error('Error deleting wish:', error)
    return false
  }
}

// ==================== FEEDBACKS ====================

/**
 * Add a feedback from a user
 * @param {string} fromUser
 * @param {string} message
 */
export async function addFeedback(fromUser, message) {
  try {
    await addDoc(collection(db, 'feedbacks'), {
      fromUser,
      message,
      createdAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.error('Error adding feedback:', error)
    return false
  }
}

/**
 * Subscribe to feedbacks in realtime (admin)
 * @param {function} callback
 * @returns {function} unsubscribe
 */
export function subscribeFeedbacks(callback) {
  const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'))

  return onSnapshot(q, (snapshot) => {
    const feedbacks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    callback(feedbacks)
  })
}

// ==================== SPIN RESULTS ====================

/**
 * Save spin result using transaction (prevents concurrent duplicate spins)
 * @param {string} username
 * @param {number} amount
 * @returns {Promise<{amount: number, alreadySpun: boolean}>}
 */
export async function saveSpinResult(username, amount) {
  try {
    const docRef = doc(db, 'spinResults', username.toLowerCase().trim())
    const result = await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(docRef)
      if (docSnap.exists()) {
        // Already spun — return existing result
        return { amount: docSnap.data().amount, alreadySpun: true }
      }
      // First spin — save result
      transaction.set(docRef, {
        username: username.toLowerCase().trim(),
        amount,
        createdAt: serverTimestamp(),
      })
      return { amount, alreadySpun: false }
    })
    return result
  } catch (error) {
    console.error('Error saving spin result:', error)
    return null
  }
}

/**
 * Check if user already spun
 * @param {string} username
 * @returns {Promise<{amount: number} | null>}
 */
export async function getSpinResult(username) {
  try {
    const docRef = doc(db, 'spinResults', username.toLowerCase().trim())
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    }
    return null
  } catch (error) {
    console.error('Error getting spin result:', error)
    return null
  }
}

/**
 * Save bank info to existing spin result
 * @param {string} username
 * @param {string} bankName
 * @param {string} accountNumber
 */
export async function saveBankInfo(username, bankName, accountNumber) {
  try {
    const docRef = doc(db, 'spinResults', username.toLowerCase().trim())
    await setDoc(docRef, { bankName, accountNumber }, { merge: true })
    return true
  } catch (error) {
    console.error('Error saving bank info:', error)
    return false
  }
}
