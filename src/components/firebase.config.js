// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider,} from "firebase/auth";

import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAdpwKP8FHQNS_qI87OpqCK8xkViCSUWOQ",
//   authDomain: "service-provider-otp.firebaseapp.com",
//   projectId: "service-provider-otp",
//   storageBucket: "service-provider-otp.appspot.com",
//   messagingSenderId: "1073222641980",
//   appId: "1:1073222641980:web:a04f9e06f2f61454d11639"
// };


const firebaseConfig = {
  apiKey: "AIzaSyC4a94ojGTS3U3eA-YubFx3kibm51SxOAA",
  authDomain: "fixxit-9bb83.firebaseapp.com",
  projectId: "fixxit-9bb83",
  storageBucket: "fixxit-9bb83.appspot.com",
  messagingSenderId: "72790434458",
  appId: "1:72790434458:web:c604c4e8fc7ed259ccb523",
  measurementId: "G-PST3N5P7QK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
export const auth= getAuth(app)
const provider=new GoogleAuthProvider()
export {provider}




// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);