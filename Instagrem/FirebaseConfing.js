
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCqkqiqgatT44y9-uqt1SZFjR5T9OvV67Y",
  authDomain: "insta-30149.firebaseapp.com",
  projectId: "insta-30149",
  storageBucket: "insta-30149.appspot.com",
  messagingSenderId: "337064414314",
  appId: "1:337064414314:web:6e43397f86512f48e80e13",
  measurementId: "G-MWMZRKWLDQ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)