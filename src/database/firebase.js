import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXcp9PradCLCEaCHdb3AJRqO2RbpCAxK8",
  authDomain: "register-admin-a7afd.firebaseapp.com",
  projectId: "register-admin-a7afd",
  storageBucket: "register-admin-a7afd.appspot.com",
  messagingSenderId: "1004169494666",
  appId: "1:1004169494666:web:f6041037b026cbe390ed73",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebaseApp;
