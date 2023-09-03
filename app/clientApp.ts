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
    apiKey: "AIzaSyD6vOvwPqrhP27jLuxsFCWuDAHD4Hsl6ec",
    authDomain: "housecarmaintenance.firebaseapp.com",
    projectId: "housecarmaintenance",
    storageBucket: "housecarmaintenance.appspot.com",
    messagingSenderId: "97441375090",
    appId: "1:97441375090:web:7c80a4856e1fcb4fdc33eb"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase;