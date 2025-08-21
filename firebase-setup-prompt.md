# Firebase Environment Setup Prompt for Cursor

Create a Firebase configuration setup for my project with the following requirements:

## Requirements:

1. **No .env files** - All configuration should be in TypeScript files only
2. **Environment-specific configs** - Support for UAT and PROD environments
3. **Boolean environment switcher** - Easy way to toggle between environments
4. **Proper TypeScript structure** - Well-organized, typed, and maintainable code
5. **Root-level logging** - Log environment info at app startup
6. **Clean codebase** - No example or demo files, production-ready only

## Configuration Details:

### UAT Environment Config:
```typescript
const firebaseConfig = {
  apiKey: "AIzaSyDr2GEwj5O4AMQF6JCAu0nhNhlezsgxHS8",
  authDomain: "env-uat-cd3c5.firebaseapp.com",
  projectId: "env-uat-cd3c5",
  storageBucket: "env-uat-cd3c5.firebasestorage.app",
  messagingSenderId: "614576728087",
  appId: "1:614576728087:web:6337d07f43cb3674001452",
  measurementId: "G-RMHPEET5ZY"
};
```

### PROD Environment Config:
```typescript
const firebaseConfig = {
  apiKey: "AIzaSyDtSEae0iJBiFPuXOkW2VDFwTw_DxJk_lg",
  authDomain: "habit-tracker-47dc4.firebaseapp.com",
  projectId: "habit-tracker-47dc4",
  storageBucket: "habit-tracker-47dc4.firebasestorage.app",
  messagingSenderId: "536357421229",
  appId: "1:536357421229:web:754c6b4363f37506208624",
  measurementId: "G-VGGL6YWLZF"
};
```

## Implementation Requirements:

### File Structure:
```
src/lib/firebase/
├── config/
│   ├── types.ts          # TypeScript interfaces
│   └── environments.ts   # UAT/PROD configs + boolean switcher
├── index.ts              # Main initialization & exports
└── README.md            # Documentation
```

### Key Features Needed:
1. **Environment Switching**: Single boolean `IS_PRODUCTION` to toggle environments
2. **Lazy Initialization**: Services initialize only when needed
3. **SSR-Safe**: Analytics only loads in browser environment
4. **Type Safety**: Full TypeScript coverage with proper interfaces
5. **Easy Imports**: All services available via `@/lib/firebase`
6. **Root Logging**: Import in layout.tsx to log environment on app start
7. **Comprehensive Logging**: Detailed environment info in console

### Services to Export:
- `getFirebaseApp()` - Firebase app instance
- `getFirebaseAuth()` - Authentication service
- `getFirebaseFirestore()` - Firestore database
- `getFirebaseStorage()` - Storage service
- `getFirebaseAnalytics()` - Analytics (browser-only)
- `getEnvironmentInfo()` - Current environment details
- `IS_PRODUCTION` - Boolean environment flag

### Installation Requirements:
- Install `firebase` package via npm
- Ensure TypeScript compilation works without errors
- Clean up any temporary/example files after setup

### Logging Specifications:
- Log environment info during Firebase initialization
- Add root-level logging in app layout for immediate visibility
- Include: Environment name, Project ID, Auth Domain, Production status
- Format logs clearly with emoji and proper spacing

## Expected Deliverables:
1. Complete Firebase configuration setup
2. Type-safe environment switching
3. Clean, production-ready codebase
4. Comprehensive documentation
5. Working TypeScript compilation
6. Environment logging at app startup

**Note**: Delete any example, demo, or temporary files after setup completion to maintain a clean codebase. 