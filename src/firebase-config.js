// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBNxgX18ZoIuxWsDWEfjVi_lCa3nXPzsVs',
  authDomain: 'tfconvert-d1eff.firebaseapp.com',
  projectId: 'tfconvert-d1eff',
  storageBucket: 'tfconvert-d1eff.appspot.com',
  messagingSenderId: '872133978150',
  appId: '1:872133978150:web:27bd89b102f8c2ce9b1ee7',
  measurementId: 'G-32KSVQZ5QS',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
