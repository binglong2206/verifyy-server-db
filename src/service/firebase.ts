import firebase from "firebase/app";
import "firebase/compatauth";
import { getStorage, ref } from "firebase/storage";

// Public API
const firebaseConfig = {
    apiKey: "AIzaSyCd0ahTLZ_AbaVzMfYAALWzfItv1gu51jg",
    authDomain: "verifyy-e4ece.firebaseapp.com",
    projectId: "verifyy-e4ece",
    storageBucket: "verifyy-e4ece.appspot.com",
    messagingSenderId: "758740792774",
    appId: "1:758740792774:web:09ba88030505e1a535aec7"
  };


const app = firebase.initializeApp(firebaseConfig);

export const firebaseSDK = firebase;
export const storage = getStorage(app);

