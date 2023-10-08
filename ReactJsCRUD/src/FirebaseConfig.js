import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCrkaz79mAIQOw9yJ1gVC31mu3AXBBuNiE",
    authDomain: "reactjscrud-33a56.firebaseapp.com",
    projectId: "reactjscrud-33a56",
    storageBucket: "reactjscrud-33a56.appspot.com",
    messagingSenderId: "455176842243",
    appId: "1:455176842243:web:f4fa0a5b9f81686f55b236"
  };
  
  const app = initializeApp(firebaseConfig);

 export const db = getFirestore(app);

