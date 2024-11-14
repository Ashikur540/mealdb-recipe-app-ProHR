// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEvdxjf4bw80bCZaqP2F51pCVf-pQ9XF4",
  authDomain: "tailus-fedus-meal-app.firebaseapp.com",
  projectId: "tailus-fedus-meal-app",
  storageBucket: "tailus-fedus-meal-app.firebasestorage.app",
  messagingSenderId: "253152112884",
  appId: "1:253152112884:web:2ffd79be9067ff27e32ea1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

