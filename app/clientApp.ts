import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgw6TM6M2GipXssrw0JgL7m9vMazhcILo",
  authDomain: "aviation676-939b4.firebaseapp.com",
  projectId: "aviation676-939b4",
  storageBucket: "aviation676-939b4.appspot.com",
  messagingSenderId: "626577752671",
  appId: "1:626577752671:web:b284c1293014944292d1ea",
  measurementId: "G-ELFH4EEG04"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };