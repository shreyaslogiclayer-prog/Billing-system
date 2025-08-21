/**
 * Firebase Configuration Types
 */

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export type Environment = 'UAT' | 'PROD';

export interface EnvironmentConfig {
  name: Environment;
  config: FirebaseConfig;
} 