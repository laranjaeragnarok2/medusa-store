import * as admin from 'firebase-admin';

// Esta configuração é para o ambiente do servidor e usa as variáveis de ambiente.
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // A chave privada do Vercel/env.local precisa ter os caracteres de nova linha escapados.
  // Nós os substituímos de volta para o formato correto aqui.
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

/**
 * Retorna a instância do app do Firebase Admin, inicializando-a se ainda não foi feito.
 * Este padrão evita a reinicialização do app em ambientes serverless.
 */
function getAdminApp() {
  if (admin.apps.length > 0) {
    return admin.apps[0]!;
  }
  
  try {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
    // Lança o erro para que o problema de configuração seja visível.
    throw new Error('Falha ao inicializar o Firebase Admin SDK. Verifique as variáveis de ambiente do servidor.');
  }
}

export const adminDb = getAdminApp().firestore();
