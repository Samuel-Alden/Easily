import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB-MkCgJpkVlc7P8NyBF8VubI2lPVVi4rc",
  authDomain: "studentapp-c5835.firebaseapp.com",
  databaseURL: "https://studentapp-c5835-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "studentapp-c5835",
  storageBucket: "studentapp-c5835.firebasestorage.app",
  messagingSenderId: "242991334935",
  appId: "1:242991334935:web:51771a253eddb8f8817e52",
  measurementId: "G-E611GYTMMR"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);