// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { enableIndexedDbPersistence } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Firestore with long-polling to avoid transport errors in some networks
export const db = initializeFirestore(app, { experimentalForceLongPolling: true });

// Enable IndexedDB persistence so writes can be queued while offline
enableIndexedDbPersistence(db).then(() => {
  console.log('Firestore persistence enabled');
}).catch((err) => {
  // This can fail if persistence is not available (incognito) or multiple tabs open
  console.warn('Firestore persistence not enabled:', err && err.code ? err.code : err, err && err.message ? err.message : '');
});
