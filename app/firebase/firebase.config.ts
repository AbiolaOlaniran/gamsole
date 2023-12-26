
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyC88idNNTuJ5cRxb79BrWKL3yHs7xHTB9A",
  authDomain: "website-d5e1d.firebaseapp.com",
  databaseURL: "https://website-d5e1d-default-rtdb.firebaseio.com",
  projectId: "website-d5e1d",
  storageBucket: "website-d5e1d.appspot.com",
  messagingSenderId: "1069782458611",
  appId: "1:1069782458611:web:4c3055be8abaf02bcd9786",
  measurementId: "G-E4F8FN59TY"
};

// Initialize Firebase
let app: FirebaseApp | undefined;

if (!app) {
  app = initializeApp(firebaseConfig);
}

export const db = getFirestore(app!);  
export const database = getDatabase(app!);

