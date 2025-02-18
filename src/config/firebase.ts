// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // Add this import

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2XvcW0cNS_cs1JPPYfaQQ-ae0JXMcFX8",
  authDomain: "foodiefinder-21f18.firebaseapp.com",
  projectId: "foodiefinder-21f18",
  storageBucket: "foodiefinder-21f18.firebasestorage.app",
  messagingSenderId: "786080559711",
  appId: "1:786080559711:web:de2a2db6db25f6e3ce61ea",
  measurementId: "G-ZZXFPWPRR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);  // Add this line
export default app;