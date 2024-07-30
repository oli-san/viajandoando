import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYB3WEuro-Jg1uZY1XFk6TiCJZFGjFPf4",
  authDomain: "lugares-favoritos-v1.firebaseapp.com",
  projectId: "lugares-favoritos-v1",
  storageBucket: "lugares-favoritos-v1.appspot.com",
  messagingSenderId: "621396953976",
  appId: "1:621396953976:web:9f61e8c92460786126d68d",
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);
