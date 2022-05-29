import React from "react";
import { auth, googleProvider } from "../database/firebase";

auth
  .signOut()
  .then(() => {
    console.log("LogOut OK");
  })
  .catch((err) => {
    console.log("LogOut Not OK " + err);
  });
