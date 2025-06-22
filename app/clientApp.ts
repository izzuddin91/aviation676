import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Optional: keep using env vars if you prefer
const firebaseConfig = {
  apiKey: "AIzaSyCgw6TM6M2GipXssrw0JgL7m9vMazhcILo",
  authDomain: "aviation676-939b4.firebaseapp.com",
  projectId: "aviation676-939b4",
  storageBucket: "aviation676-939b4.appspot.com", // FIX: .app → .app**spot**
  messagingSenderId: "626577752671",
  appId: "1:626577752671:web:b284c1293014944292d1ea",
  measurementId: "G-ELFH4EEG04"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// ✅ Export the Firestore database instance
const db = firebase.firestore();

export { firebase, db };
