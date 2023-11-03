// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLR5jlSP3p2W3Rb0I1ZyM_oDRI9v3IdPo",
  authDomain: "photo-pholio-2d3a3.firebaseapp.com",
  projectId: "photo-pholio-2d3a3",
  storageBucket: "photo-pholio-2d3a3.appspot.com",
  messagingSenderId: "714243427161",
  appId: "1:714243427161:web:4c645ea3ec4a67115eda48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);