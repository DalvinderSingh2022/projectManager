import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA9cMLnpNnLyaJ1Fp1C1K8i8zbYpUw6l58",
    authDomain: "task-manager-ce409.firebaseapp.com",
    projectId: "task-manager-ce409",
    storageBucket: "task-manager-ce409.appspot.com",
    messagingSenderId: "740911645677",
    appId: "1:740911645677:web:f333a0d0f3a77da84edde4",
    measurementId: "G-60B8C5BNPB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);