// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKlw1jX3QCnjg99AxfA2t2biQ2H_Tbpbg",
  authDomain: "cleaver-project.firebaseapp.com",
  projectId: "cleaver-project",
  storageBucket: "cleaver-project.firebasestorage.app",
  messagingSenderId: "270548197798",
  appId: "1:270548197798:web:f02b171da4f92b7e156f67",
  measurementId: "G-SR4B1MT2GR",
};

// Initialize Firebase
// console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
export default app;
