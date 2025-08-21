import type { FirebaseConfig, EnvironmentConfig } from './types';

/**
 * UAT Environment Configuration
 */
const UAT_CONFIG: FirebaseConfig = {
    apiKey: "AIzaSyDr2GEwj5O4AMQF6JCAu0nhNhlezsgxHS8",
    authDomain: "env-uat-cd3c5.firebaseapp.com",
    projectId: "env-uat-cd3c5",
    storageBucket: "env-uat-cd3c5.firebasestorage.app",
    messagingSenderId: "614576728087",
    appId: "1:614576728087:web:6337d07f43cb3674001452",
    measurementId: "G-RMHPEET5ZY"
};

/**
 * PROD Environment Configuration
 */
const PROD_CONFIG: FirebaseConfig = {
    apiKey: "AIzaSyDtSEae0iJBiFPuXOkW2VDFwTw_DxJk_lg",
    authDomain: "habit-tracker-47dc4.firebaseapp.com",
    projectId: "habit-tracker-47dc4",
    storageBucket: "habit-tracker-47dc4.firebasestorage.app",
    messagingSenderId: "536357421229",
    appId: "1:536357421229:web:754c6b4363f37506208624",
    measurementId: "G-VGGL6YWLZF"
};

/**
 * Environment configurations map
 */
export const ENVIRONMENTS: Record<'UAT' | 'PROD', EnvironmentConfig> = {
  UAT: {
    name: 'UAT',
    config: UAT_CONFIG
  },
  PROD: {
    name: 'PROD',
    config: PROD_CONFIG
  }
};

/**
 * Boolean environment switcher
 * Set to true for PROD, false for UAT
 */
export const IS_PRODUCTION = false;

/**
 * Get current environment configuration
 */
export const getCurrentEnvironment = (): EnvironmentConfig => {
  return IS_PRODUCTION ? ENVIRONMENTS.PROD : ENVIRONMENTS.UAT;
};

/**
 * Get current Firebase config
 */
export const getCurrentFirebaseConfig = (): FirebaseConfig => {
  return getCurrentEnvironment().config;
}; 