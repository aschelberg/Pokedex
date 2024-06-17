import { initializeApp } from 'firebase/app'

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyCA9bDx8dwde0x7vTddhDtQSISg0--HQGc",
  authDomain: "pokedex-asproj.firebaseapp.com",
  projectId: "pokedex-asproj",
  storageBucket: "pokedex-asproj.appspot.com",
  messagingSenderId: "1066318861790",
  appId: "1:1066318861790:web:05b5c6614e2c9616b8f94f",
  measurementId: "G-YWG41L9CBH"
})

// export const firebaseApp = initializeApp({
  //   apiKey: import.meta.env.VITE_FB_API_KEY,
  //   authDomain: `${import.meta.env.VITE_FB_AUTH_DOMAIN}.firebaseapp.com`,
  //   projectId: import.meta.env.VITE_FB_PROJ_ID,
  //   storageBucket: `${import.meta.env.VITE_FB_STORAGE_BUCKET}.appspot.com`,
  //   messagingSenderId: import.meta.env.VITE_FB_MESSAGE_SENDER_ID,
  //   appId: import.meta.env.VITE_FB_APP_ID,
  //   measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID
  // })