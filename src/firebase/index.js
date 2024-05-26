// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCA9bDx8dwde0x7vTddhDtQSISg0--HQGc',
  authDomain: 'pokedex-asproj.firebaseapp.com',
  projectId: 'pokedex-asproj',
  storageBucket: 'pokedex-asproj.appspot.com',
  messagingSenderId: '1066318861790',
  appId: '1:1066318861790:web:05b5c6614e2c9616b8f94f',
  measurementId: 'G-YWG41L9CBH'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
  db
}