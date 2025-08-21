import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getAnalytics, type Analytics } from 'firebase/analytics';

import { getCurrentFirebaseConfig, getCurrentEnvironment, IS_PRODUCTION } from './config/environments';

/**
 * Firebase App instance
 */
let firebaseApp: FirebaseApp | null = null;

/**
 * Firebase services
 */
let auth: Auth | null = null;
let firestore: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;

/**
 * Initialize Firebase app and services
 */
const initializeFirebase = (): FirebaseApp => {
  if (firebaseApp) {
    return firebaseApp;
  }

  const config = getCurrentFirebaseConfig();
  const environment = getCurrentEnvironment();
  
  // Log current environment info
  console.log('🔥 Firebase Environment Configuration:');
  console.log(`   Environment: ${environment.name}`);
  console.log(`   Project ID: ${config.projectId}`);
  console.log(`   Auth Domain: ${config.authDomain}`);
  console.log(`   Is Production: ${IS_PRODUCTION}`);
  
  // Initialize Firebase app
  firebaseApp = initializeApp(config);
  
  // Initialize services
  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);
  storage = getStorage(firebaseApp);
  
  // Initialize analytics only in browser environment
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(firebaseApp);
  }
  
  return firebaseApp;
};

/**
 * Get Firebase app instance
 */
export const getFirebaseApp = (): FirebaseApp => {
  if (!firebaseApp) {
    return initializeFirebase();
  }
  return firebaseApp;
};

/**
 * Get Firebase Auth instance
 */
export const getFirebaseAuth = (): Auth => {
  if (!auth) {
    initializeFirebase();
  }
  return auth!;
};

/**
 * Get Firestore instance
 */
export const getFirebaseFirestore = (): Firestore => {
  if (!firestore) {
    initializeFirebase();
  }
  return firestore!;
};

/**
 * Get Firebase Storage instance
 */
export const getFirebaseStorage = (): FirebaseStorage => {
  if (!storage) {
    initializeFirebase();
  }
  return storage!;
};

/**
 * Get Firebase Analytics instance
 */
export const getFirebaseAnalytics = (): Analytics | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  if (!analytics) {
    initializeFirebase();
  }
  return analytics;
};

/**
 * Get current environment info
 */
export const getEnvironmentInfo = () => {
  const environment = getCurrentEnvironment();
  return {
    name: environment.name,
    isProduction: IS_PRODUCTION,
    config: environment.config
  };
};

// Export types and utilities
export type { FirebaseConfig, Environment, EnvironmentConfig } from './config/types';
export { IS_PRODUCTION, getCurrentEnvironment, getCurrentFirebaseConfig } from './config/environments';

// Initialize Firebase immediately
initializeFirebase(); 