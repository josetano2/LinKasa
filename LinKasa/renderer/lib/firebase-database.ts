// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBQqowQyXliPcTizI6g29T7CnAkFxpVTJk",
    authDomain: "linkasa-4ada4.firebaseapp.com",
    projectId: "linkasa-4ada4",
    storageBucket: "linkasa-4ada4.appspot.com",
    messagingSenderId: "923528702354",
    appId: "1:923528702354:web:db922f6f70a593d16e794b"
};
  

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
