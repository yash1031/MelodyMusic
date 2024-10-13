// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, connectAuthEmulator, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
providerGoogle.setCustomParameters({
  prompt: 'select_account'  // Force the account selection prompt
});
const providerFacebook = new FacebookAuthProvider();
providerFacebook.setCustomParameters({ display: 'popup' });
// providerFacebook.setCustomParameters({
//   prompt: 'select_account'  // Force the account selection prompt
// });


export { auth, providerGoogle, providerFacebook, FacebookAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, connectAuthEmulator, signInWithPopup, signInWithRedirect, getRedirectResult, signOut };
