import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyCy7YxScLuHP3l5WGv5gvb8EIr0BXlwVcI",
  authDomain: "dbms-7011f.firebaseapp.com",
  projectId: "dbms-7011f",
  storageBucket: "dbms-7011f.appspot.com",
  messagingSenderId: "385858557640",
  appId: "1:385858557640:web:02dc53423685ed459af7fd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };