import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4ziux9J9pawdNBSoI8QyriPpWGNTXvbk",
  authDomain: "react23-23114.firebaseapp.com",
  databaseURL: "https://react23-23114-default-rtdb.firebaseio.com",
  projectId: "react23-23114",
  storageBucket: "react23-23114.appspot.com",
  messagingSenderId: "259830634684",
  appId: "1:259830634684:web:d9db563b58e50843a0d8b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getDatabase(app);
export const fStore = getFirestore(app);
export const fStorage = getStorage(app);
