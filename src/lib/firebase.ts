
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbuNGOI5WNK2nlrEzVbx18jLipixSoI18",
  authDomain: "telezyne-connect-now.firebaseapp.com",
  projectId: "telezyne-connect-now",
  storageBucket: "telezyne-connect-now.firebasestorage.app",
  messagingSenderId: "694981767442",
  appId: "1:694981767442:web:bb0351d2d7c2b135ef43cb",
  measurementId: "G-5MPD5ZXW5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

// Add additional scopes for Google authentication
googleProvider.addScope('email');
googleProvider.addScope('profile');

console.log("Firebase initialized successfully");

export { auth, googleProvider };
