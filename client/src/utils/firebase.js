
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "authnotesgpt.firebaseapp.com",
  projectId: "authnotesgpt",
  storageBucket: "authnotesgpt.firebasestorage.app",
  messagingSenderId: "636467696618",
  appId: "1:636467696618:web:9e37ea37ff5042f71bd893"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// lets give provider
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth, provider }