'use server';
import * as admin from 'firebase-admin';

interface WaitlistData {
  name: string;
  whatsapp: string;
}

// Inicializa o SDK do Firebase Admin, se ainda não foi inicializado.
// Em ambientes do Google Cloud (como o App Hosting), a inicialização é automática.
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const waitlistCollection = db.collection('waitlist');

/**
 * Adiciona um novo registro à coleção 'waitlist' no Firestore.
 * @param data - Os dados do usuário (nome e whatsapp).
 */
export async function addToWaitlist(data: WaitlistData) {
  try {
    await waitlistCollection.add({
      name: data.name,
      whatsapp: data.whatsapp,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding to Firestore:', error);
    throw new Error('Não foi possível salvar os dados no banco de dados.');
  }
}

/**
 * Retorna a contagem total de documentos na coleção 'waitlist'.
 * @returns O número de pessoas na lista de espera.
 */
export async function getWaitlistCount(): Promise<number> {
  try {
    // .count() é uma forma eficiente de obter o número de documentos sem baixar todos eles.
    const snapshot = await waitlistCollection.count().get();
    return snapshot.data().count;
  } catch (error) {
    console.error('Error getting count from Firestore:', error);
    // Se a coleção ainda não existe ou ocorre um erro, retorna 0.
    return 0;
  }
}
