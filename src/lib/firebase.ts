import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// These values are sourced from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;

// Initialize Firebase only if an app hasn't already been initialized
if (!getApps().length) {
  // Check if all required Firebase config values are present
  if (
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
  ) {
    app = initializeApp(firebaseConfig);
  } else {
    console.error(
      'Firebase configuration is missing. Make sure all NEXT_PUBLIC_FIREBASE_ environment variables are set in your .env file and the server has been restarted.'
    );
    // You might want to throw an error here or handle this case more gracefully
    // For now, we'll let it proceed, and Firebase SDK will throw its own error if config is invalid.
    // To prevent app from trying to initialize with partial/missing config, you could do:
    // throw new Error("Firebase configuration is incomplete. Please check your .env file.");
    // However, to allow the app to at least build and show the error from Firebase SDK itself:
    app = initializeApp({}); // Initialize with empty config to trigger Firebase SDK's error if needed
  }
} else {
  app = getApps()[0];
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { app, auth, db, storage };
