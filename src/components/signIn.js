import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../database/firebase";

export default function SignIn() {
  const [user, setuser] = useState(null);
  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged((user) => {
      setuser(user);
      console.log("User email: ", user.email);
    });
    return () => {
      authUnsubscribe();
    };
  }, []);

  const googleLoginHandle = async () => {
    auth.signInWithPopup(googleProvider);
  };

  const signOutHander = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Logout OK");
      })
      .catch((err) => {
        console.log("Logout Not OK " + err);
      });
  };

  return (
    <div > 
      <div>
        <br/>
        {!user ? (
          <button onClick={googleLoginHandle}>Login with Google</button>
        ) : (
          <button onClick={signOutHander}>Logout</button>
        )}
      </div>
    </div>
  );
}
