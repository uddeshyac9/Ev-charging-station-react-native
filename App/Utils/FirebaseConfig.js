// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAo8FstkBUZFc8U4E4JfETqULaPmiQHXk",
  authDomain: "ev-charging-station-f873d.firebaseapp.com",
  projectId: "ev-charging-station-f873d",
  storageBucket: "ev-charging-station-f873d.appspot.com",
  messagingSenderId: "296073924802",
  appId: "1:296073924802:web:3a3c9c598927b479142b5b",
  measurementId: "G-XVMGNDYDTC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);