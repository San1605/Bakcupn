import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVU-x0JL-epQecLulHlR4G067x3hxtdHs",
  authDomain: "ct-lms-external.firebaseapp.com",
  projectId: "ct-lms-external",
  storageBucket: "ct-lms-external.appspot.com",
  messagingSenderId: "21172439053",
  appId: "1:21172439053:web:0aba6a2aa223d75da7ed44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);