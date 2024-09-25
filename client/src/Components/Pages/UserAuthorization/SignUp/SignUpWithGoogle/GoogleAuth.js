// src/components/GoogleAuth.js
import React, { useState } from 'react';
import { auth, provider, signInWithPopup, signOut } from "./firebase";

function GoogleAuth() {
  const [user, setUser] = useState(null);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        console.log("User signed in: ", result.user);
      })
      .catch((error) => {
        console.error("Error during sign-in: ", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error during sign-out: ", error);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <h3>Welcome, {user.displayName}</h3>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
}

export default GoogleAuth;
