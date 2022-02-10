import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA7NJXOH8FYoG_g2APZVcuFklIZ7T3zM_8",
  authDomain: "jaemagazine-45854.firebaseapp.com",
  projectId: "jaemagazine-45854",
  storageBucket: "jaemagazine-45854.appspot.com",
  messagingSenderId: "651874722092",
  appId: "1:651874722092:web:0f721c35649757d264cc89",
  measurementId: "G-X6KD3JN9R1",
};

firebase.initializeApp(firebaseConfig);
const apiKey = firebaseConfig.apiKey;

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();
export { auth, apiKey, firestore, storage, realtime };
