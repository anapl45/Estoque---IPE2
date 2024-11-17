import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAJFcB_e75jDHHR1Kev9022W2Pmf-sXy9U",
  authDomain: "estoquetreino.firebaseapp.com",
  projectId: "estoquetreino",
  storageBucket: "estoquetreino.appspot.com",
  messagingSenderId: "125564007396",
  appId: "1:125564007396:web:dba4e6b81a9a37fb460df1",
  measurementId: "G-B40W4MFT7T"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


