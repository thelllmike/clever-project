// firestore.js
import { getFirestore } from "firebase/firestore";
import app from "./firebaseConfig"; // Ensure this is the correct path

const fire_db = getFirestore(app);

// Directly export fire_db
export { fire_db };
