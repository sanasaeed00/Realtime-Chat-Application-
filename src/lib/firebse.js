// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// console.log("api key",import.meta.env.VITE_API_KEY)
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: "reactchat-40c62.firebaseapp.com",
//   projectId: "reactchat-40c62",
//   storageBucket: "reactchat-40c62.appspot.com",
//   messagingSenderId: "440261726087",
//   appId: "1:440261726087:web:87d8f91d421fe8016a4d22"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDZzCWPpCAjoz8UA9abgttsC5m38y4zhio",
  authDomain: "myapp-e1a0d.firebaseapp.com",
  projectId: "myapp-e1a0d",
  storageBucket: "myapp-e1a0d.appspot.com",
  messagingSenderId: "505725789966",
  appId: "1:505725789966:web:ab3fdeb41e800c0a02995f",
  measurementId: "G-3HHK3KRNLQ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()