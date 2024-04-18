import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage,ref, uploadBytesResumable, getDownloadURL , uploadBytes, } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBkk6oICVOrKen_HjuP1WLSDr_XwrLZz58",
    authDomain: "frontend-project-c99c0.firebaseapp.com",
    projectId: "frontend-project-c99c0",
    storageBucket: "frontend-project-c99c0.appspot.com",
    messagingSenderId: "1071282449038",
    appId: "1:1071282449038:web:9c161b79b6656f17beb7df"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export {app, auth, storage, ref, uploadBytesResumable,uploadBytes, getDownloadURL}