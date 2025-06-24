import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validação CRÍTICA para o lado do cliente (navegador).
// Se estas chaves não estiverem corretas na Vercel, o formulário e o contador NÃO VÃO FUNCIONAR.
const areClientVarsDefined = firebaseConfig.apiKey && firebaseConfig.projectId;

if (!areClientVarsDefined && typeof window !== 'undefined') {
  console.error(
    'ERRO CRÍTICO DE CONFIGURAÇÃO: As variáveis de ambiente do Firebase para o cliente (NEXT_PUBLIC_*) não foram encontradas. Verifique se você as adicionou corretamente nas "Environment Variables" do seu projeto na Vercel.'
  );
}

// Inicializa o Firebase apenas se as chaves estiverem definidas.
const app = areClientVarsDefined ? (!getApps().length ? initializeApp(firebaseConfig) : getApp()) : null;
const db = app ? getFirestore(app) : null;

export { db };
