import * as admin from 'firebase-admin';

/**
 * Retorna a instância do app do Firebase Admin, inicializando-a se ainda não foi feito.
 * Este padrão evita a reinicialização do app em ambientes serverless e erros durante o build.
 */
function getAdminApp() {
  // Se o app já foi inicializado, retorna a instância existente.
  if (admin.apps.length > 0) {
    return admin.apps[0]!;
  }
  
  try {
    // As credenciais são lidas das variáveis de ambiente.
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // A chave privada precisa ter os caracteres de nova linha restaurados.
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    // Validação para garantir que as variáveis de ambiente estão definidas.
    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
        throw new Error('As variáveis de ambiente do Firebase Admin SDK não estão configuradas corretamente. Verifique FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY no seu painel da Vercel.');
    }

    // Inicializa o app do Firebase Admin.
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
    // Lança um erro mais claro se a inicialização falhar.
    const specificError = error instanceof Error ? error.message : String(error);
    throw new Error(`Falha ao inicializar o Firebase Admin SDK: ${specificError}`);
  }
}

// Função que obtém o Firestore DB. A inicialização do app acontece de forma "lazy" (preguiçosa).
export const getAdminDb = () => {
    return getAdminApp().firestore();
};
