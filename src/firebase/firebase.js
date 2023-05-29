// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXH5hvMo3mmNdxLskD6lrhiEe_JwS3mac",
  authDomain: "to-do-list-5cce5.firebaseapp.com",
  projectId: "to-do-list-5cce5",
  storageBucket: "to-do-list-5cce5.appspot.com",
  messagingSenderId: "491867481385",
  appId: "1:491867481385:web:289498864aa4ebccf30338",
  measurementId: "G-4F78PK05EP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const listRef = collection(firestore, 'lists');
export const taskRef = collection(firestore, 'tasks');

googleProvider.setCustomParameters({
  prompt: 'select_account'
});