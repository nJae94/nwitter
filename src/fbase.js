import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALeI84G8kU7bTr1lHVNfbuRweBqqWRrNA",
  authDomain: "nwitter-cc23f.firebaseapp.com",
  databaseURL: "https://nwitter-cc23f.firebaseio.com",
  projectId: "nwitter-cc23f",
  storageBucket: "nwitter-cc23f.appspot.com",
  messagingSenderId: "1025055869903",
  appId: "1:1025055869903:web:8cf0d6946f26890af060ba"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();