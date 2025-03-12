// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection, getDocs } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeyJbjBXRH3aJxqJysZcM2Q-0m0cpKh6E",
  authDomain: "sam-chatgpt2-2025-1.firebaseapp.com",
  projectId: "sam-chatgpt2-2025-1",
  storageBucket: "sam-chatgpt2-2025-1.firebasestorage.app",
  messagingSenderId: "132978720958",
  appId: "1:132978720958:web:8c5272aa08089662301eef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);