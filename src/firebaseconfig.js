// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getStorage } from "firebase/storage"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-7WeY91T_LohSSw1mhgQek7hlqXMZlsY",
  authDomain: "spoonfull-bcfb4.firebaseapp.com",
  projectId: "spoonfull-bcfb4",
  storageBucket: "spoonfull-bcfb4.firebasestorage.app",
  messagingSenderId: "1096064766334",
  appId: "1:1096064766334:web:540004ef6cba2319b5632f",
  measurementId: "G-Y5VPRPRB3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { app, auth, provider, storage };