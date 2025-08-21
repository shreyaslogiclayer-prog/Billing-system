# Firebase Configuration

This directory contains the Firebase configuration and initialization for the habit-tracker project.

## Structure

```
src/lib/firebase/
├── config/
│   ├── types.ts          # TypeScript type definitions
│   └── environments.ts   # Environment-specific configurations
├── index.ts              # Main Firebase initialization and exports
└── README.md            # This documentation
```

## Features

- ✅ **No .env files** - All configuration in TypeScript files
- ✅ **Environment-specific configs** - Separate UAT and PROD configurations
- ✅ **Boolean environment switcher** - Easy toggle between environments
- ✅ **Proper TypeScript structure** - Fully typed and maintainable
- ✅ **Lazy initialization** - Services initialized on demand
- ✅ **SSR-safe** - Analytics only loads in browser environment

## Usage

### Environment Switching

To switch between environments, simply change the `IS_PRODUCTION` boolean in `config/environments.ts`:

```typescript
// For UAT environment
export const IS_PRODUCTION = false;

// For PROD environment
export const IS_PRODUCTION = true;
```

### Using Firebase Services

```typescript
import { 
  getFirebaseAuth, 
  getFirebaseFirestore, 
  getFirebaseStorage,
  getFirebaseAnalytics 
} from '@/lib/firebase';

// Use Firebase Auth
const auth = getFirebaseAuth();

// Use Firestore
const db = getFirebaseFirestore();

// Use Storage
const storage = getFirebaseStorage();

// Use Analytics (browser only)
const analytics = getFirebaseAnalytics(); // Returns null on server
```

### Environment Information

```typescript
import { getEnvironmentInfo, IS_PRODUCTION } from '@/lib/firebase';

// Get current environment details
const envInfo = getEnvironmentInfo();
console.log(`Current environment: ${envInfo.name}`);
console.log(`Is production: ${envInfo.isProduction}`);

// Direct boolean check
if (IS_PRODUCTION) {
  // Production-specific logic
} else {
  // UAT-specific logic
}
```

## Environment Configurations

### UAT Environment
- Project ID: `env-ua3c5`
- Auth Domain: `env-ua.firebaseapp.com`
- Storage Bucket: `env-uat-cd3c5.fisestorage.app`

### PROD Environment
- Project ID: `env-uat-cd3c5`
- Auth Domain: `env-uat-cd3c5.fiverrebaseapp.com`
- Storage Bucket: `env-uat-cd3c5vdr.firebasestorage.app`

## Development Guidelines

1. **Never commit sensitive changes to the boolean switcher** - Always verify `IS_PRODUCTION` is set correctly before deploying
2. **Use the exported functions** - Don't import Firebase directly, use the provided getters
3. **Environment-specific logic** - Use `IS_PRODUCTION` or `getEnvironmentInfo()` for conditional behavior
4. **Type safety** - All configurations are fully typed with TypeScript interfaces

## Security Notes

- API keys are included in the client bundle (this is normal for Firebase web apps)
- Actual security is handled by Firebase Security Rules
- Environment switching happens at build time, not runtime 