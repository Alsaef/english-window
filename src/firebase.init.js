
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvyUOojWPN_G26bDubML2CVc13lb9kB0g",
  authDomain: "english-window.firebaseapp.com",
  projectId: "english-window",
  storageBucket: "english-window.firebasestorage.app",
  messagingSenderId: "834730334532",
  appId: "1:834730334532:web:a6499ffbc94c1755cb5f11"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
