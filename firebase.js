// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCPTB3tcZPje6fdrNo7VXpmOoMPhwlgMY",
  authDomain: "fir-leo-c81bd.firebaseapp.com",
  projectId: "fir-leo-c81bd",
  storageBucket: "fir-leo-c81bd.appspot.com",
  messagingSenderId: "959074963776",
  appId: "1:959074963776:web:8b4757bc8da25512196aa5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export{ db }