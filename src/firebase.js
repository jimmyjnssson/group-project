import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCox0-MRAYsxQqE76QMbftUBrqf5n3xopo",
    authDomain: "group-project-7e736.firebaseapp.com",
    projectId: "group-project-7e736",
    storageBucket: "group-project-7e736.firebasestorage.app",
    messagingSenderId: "228160140898",
    appId: "1:228160140898:web:1fcb76af3c14df75fec33b",
    measurementId: "G-RTVF7B855L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const githubProvider = new GithubAuthProvider();
const signInWithGithub = async () => {
  try {
    const res = await signInWithPopup(auth, githubProvider);
    const user = res.user;
    console.log(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { app, auth, db, signInWithGoogle, signInWithGithub, logout };