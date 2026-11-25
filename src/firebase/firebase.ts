// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCarOZ2cVdgF3jtWLdCP6XpINDGETjBvIA",
  authDomain: "data-spotify-4722c.firebaseapp.com",
  databaseURL: "https://data-spotify-4722c-default-rtdb.firebaseio.com",
  projectId: "data-spotify-4722c",
  storageBucket: "data-spotify-4722c.firebasestorage.app",
  messagingSenderId: "546817250420",
  appId: "1:546817250420:web:b56a6a3b42597b4a102d21",
  measurementId: "G-QVEMCLZ88V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
