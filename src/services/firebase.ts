'use server';
import * as admin from 'firebase-admin';

// Helper function to initialize Firebase Admin SDK and get the Firestore instance.
// This ensures that initialization only happens once.
const getDb = () => {
  if (admin.apps.length === 0) {
    try {
      admin.initializeApp();
    } catch (error: any) {
      // In local dev, hot-reloading can sometimes cause this to be called more than once.
      // We can safely ignore the "already exists" error.
      if (!/already exists/i.test(error.message)) {
        console.error('Firebase admin initialization error', error.stack);
      }
    }
  }
  return admin.firestore();
};

/**
 * Retorna a contagem total de documentos na coleção 'waitlist'.
 * @returns O número de pessoas na lista de espera.
 */
export async function getWaitlistCount(): Promise<number> {
  try {
    const db = getDb();
    const waitlistCollection = db.collection('waitlist');
    // .count() é uma forma eficiente de obter o número de documentos sem baixar todos eles.
    const snapshot = await waitlistCollection.count().get();
    return snapshot.data().count;
  } catch (error) {
    console.error('Error getting count from Firestore:', error);
    // Se a coleção ainda não existe ou ocorre um erro, retorna 0.
    return 0;
  }
}
