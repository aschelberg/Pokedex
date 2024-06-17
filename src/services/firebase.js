import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain: `${import.meta.env.VITE_FB_AUTH_DOMAIN}.firebaseapp.com`,
    projectId: import.meta.env.VITE_FB_PROJ_ID,
    storageBucket: `${import.meta.env.VITE_FB_STORAGE_BUCKET}.appspot.com`,
    messagingSenderId: import.meta.env.VITE_FB_MESSAGE_SENDER_ID,
    appId: import.meta.env.VITE_FB_APP_ID,
    measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID
  }

export const firebaseApp = initializeApp(firebaseConfig)