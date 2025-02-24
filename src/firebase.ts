import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Твой Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBM2zRI-Z0JIhenYqkT1SSlXCWXUBDDrFw",
    authDomain: "maximum-academy.firebaseapp.com",
    projectId: "maximum-academy",
    storageBucket: "maximum-academy.firebasestorage.app",
    messagingSenderId: "244502668928",
    appId: "1:244502668928:web:7577f21a6161b0df9c6865",
    measurementId: "G-Q6JGWVR83L"
  };
// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
export { db };
