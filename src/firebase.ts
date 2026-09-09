import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Environment values override these browser-safe Firebase web identifiers.
  // The fallbacks keep preview deployments working when a host does not load .env.
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCqBL2ndzq3RwkdWLsRmeNRa5ec7LOQujU',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'studio-3924944484-41734.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'studio-3924944484-41734',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'studio-3924944484-41734.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '597641088909',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:597641088909:web:060959922eae7a1231b7c4',
};

// Reuse the initialized app during Vite hot-module replacement.
export const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
