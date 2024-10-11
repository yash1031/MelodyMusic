// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, connectAuthEmulator, signInWithPopup, signOut } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
//   measurementId: process.env.REACT_APP_measurementId
// };
const firebaseConfig = {
  apiKey: "AIzaSyD_TOEEGvJSR0jp56sEG9Mffhh4MfMYq_M",
  authDomain: "melodymusic-f5c1a.firebaseapp.com",
  projectId: "melodymusic-f5c1a",
  storageBucket: "melodymusic-f5c1a.appspot.com",
  messagingSenderId: "117858699625",
  appId: "1:117858699625:web:78bbcee5234cdad102d5f8",
  measurementId: "G-BCX18D9DLT"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'  // Force the account selection prompt
});


export { auth, provider, RecaptchaVerifier, signInWithPhoneNumber, connectAuthEmulator, signInWithPopup, signOut };
