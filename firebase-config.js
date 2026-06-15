// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM9-iCYQtZZXV-drvwGVI_pRHhhyBd6Lc",
  authDomain: "hope-for-women-scouts.firebaseapp.com",
  projectId: "hope-for-women-scouts",
  storageBucket: "hope-for-women-scouts.firebasestorage.app",
  messagingSenderId: "977437854850",
  appId: "1:977437854850:web:182175f6d2c33d5297789b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export so other files can use them
export { auth, db };
