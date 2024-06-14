// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
//   apiKey: "AIzaSyCelgO1U-0ZdEgC86yeF_zdM3pKpkk5-HI",
//   authDomain: "seba-medical.firebaseapp.com",
//   projectId: "seba-medical",
//   storageBucket: "seba-medical.appspot.com",
//   messagingSenderId: "874831109240",
//   appId: "1:874831109240:web:ced2e1aba6623f8a84618d",


  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app