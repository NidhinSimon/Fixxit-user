// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider,} from "firebase/auth";

import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdpwKP8FHQNS_qI87OpqCK8xkViCSUWOQ",
  authDomain: "service-provider-otp.firebaseapp.com",
  projectId: "service-provider-otp",
  storageBucket: "service-provider-otp.appspot.com",
  messagingSenderId: "1073222641980",
  appId: "1:1073222641980:web:a04f9e06f2f61454d11639"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
export const auth= getAuth(app)
const provider=new GoogleAuthProvider()
export {provider}