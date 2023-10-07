import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCpI2-MzoBrpZAX0n-uNz0i5r1oDh32Z0U",
    authDomain: "gymworkoutplan-67b56.firebaseapp.com",
    projectId: "gymworkoutplan-67b56",
    storageBucket: "gymworkoutplan-67b56.appspot.com",
    messagingSenderId: "228238467482",
    appId: "1:228238467482:web:abb03821c8b467db5dda23",
    measurementId: "G-QDPEP0HR6D"
  };


const firebaseApp = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebaseApp);

//Firebase and Auth
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


export { auth, db, firebaseAnalytics };