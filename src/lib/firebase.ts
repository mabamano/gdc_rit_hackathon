import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Config provided by user
const firebaseConfig = {
    apiKey: "AIzaSyAmy15IUqUh-UOG0NkvQyM_OyFRZCmjoeY",
    authDomain: "sih-2025-7a1b9.firebaseapp.com",
    databaseURL: "https://sih-2025-7a1b9-default-rtdb.firebaseio.com",
    projectId: "sih-2025-7a1b9",
    storageBucket: "sih-2025-7a1b9.firebasestorage.app",
    messagingSenderId: "352044465064",
    appId: "1:352044465064:web:e01a6f361eb2c8d4083b9d",
    measurementId: "G-1659QFFS13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
