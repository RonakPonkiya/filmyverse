// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxTJ6ps9IjrTwL5MyXl0FgTdY9Oe7aBEw",
  authDomain: "filmyverse-28ada.firebaseapp.com",
  projectId: "filmyverse-28ada",
  storageBucket: "filmyverse-28ada.firebasestorage.app",
  messagingSenderId: "674232399275",
  appId: "1:674232399275:web:0d946e5239f672c7aeceee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const moviesref = collection(db,"movies");
export const reviewsRef = collection(db,"reviews");
export const usersRef = collection(db,"users")

export default app;
export { auth, db };