import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAfrYwCjQJvDh_knpGvzf7gSbTwz0IGnZ0",
  authDomain: "nextjs-tailwind-app.firebaseapp.com",
  databaseURL: "https://nextjs-tailwind-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nextjs-tailwind-app",
  storageBucket: "nextjs-tailwind-app.appspot.com",
  messagingSenderId: "316570536827",
  appId: "1:316570536827:web:dc32c70bb2f86b0956cbde",
  measurementId: "G-W5Q2HXN8PH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database }