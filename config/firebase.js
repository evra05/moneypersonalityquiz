// Firebase Configuration
// Replace the placeholder values with your actual Firebase project configuration
// Get these values from: Firebase Console → Project Settings → Your Apps → Web App

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDqZF8NrUcsMOIaaevC7CrtqFs5r8tgeBI",
    authDomain: "moneypersonalityquiz.firebaseapp.com",
    projectId: "moneypersonalityquiz",
    storageBucket: "moneypersonalityquiz.firebasestorage.app",
    messagingSenderId: "978040983989",
    appId: "1:978040983989:web:fdcbe7cfab81f644f149fc",
    measurementId: "G-C86TXY4ZE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
