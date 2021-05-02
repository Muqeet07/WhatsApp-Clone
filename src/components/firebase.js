import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDusfblFVzVoROm3QAfPYPNAOoyM06EhRw",
    authDomain: "whatsapp-clone-d1c0a.firebaseapp.com",
    projectId: "whatsapp-clone-d1c0a",
    storageBucket: "whatsapp-clone-d1c0a.appspot.com",
    messagingSenderId: "807916478592",
    appId: "1:807916478592:web:697564705fa84cc5db4665"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();
  export const auth = firebase.auth();
  export const provider = new firebase.auth.GoogleAuthProvider();