import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyACEOLBKIN2RpxsjMNEhGLRRHwbNhGXLTQ",
  authDomain: "northern-producer-njkjx.firebaseapp.com",
  projectId: "northern-producer-njkjx",
  storageBucket: "northern-producer-njkjx.firebasestorage.app",
  messagingSenderId: "1001033639005",
  appId: "1:1001033639005:web:93e9ad7625c55377a6d9b4"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore targeting our dedicated database ID
const db = getFirestore(app, "ai-studio-buusaagonofaaoro-8e235e95-a11d-4407-85ed-e1df18309cfc");

export { app, db };
