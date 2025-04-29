import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/compat/firestore";
import 'firebase/storage'; 

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

  const firebaseConfig = {
    apiKey: "AIzaSyCgw6TM6M2GipXssrw0JgL7m9vMazhcILo",
    authDomain: "aviation676-939b4.firebaseapp.com",
    projectId: "aviation676-939b4",
    storageBucket: "aviation676-939b4.firebasestorage.app",
    messagingSenderId: "626577752671",
    appId: "1:626577752671:web:b284c1293014944292d1ea",
    measurementId: "G-ELFH4EEG04"
  };

//   const firebaseConfig = {
//     apiKey: "AIzaSyCgw6TM6M2GipXssrw0JgL7m9vMazhcILo",
//     authDomain: "aviation676-939b4.firebaseapp.com",
//     projectId: "aviation676-939b4",
//     storageBucket: "aviation676-939b4.firebasestorage.app",
//     messagingSenderId: "626577752671",
//     appId: "1:626577752671:web:b284c1293014944292d1ea",
//     measurementId: "G-ELFH4EEG04"
//   };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase;