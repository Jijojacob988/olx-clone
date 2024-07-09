import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD8t_dOPZ5ZsIca9LOPpnsa9LQrixIyv4g",
    authDomain: "olx-clone-9ff33.firebaseapp.com",
    projectId: "olx-clone-9ff33",
    storageBucket: "olx-clone-9ff33.appspot.com",
    messagingSenderId: "178232775360",
    appId: "1:178232775360:web:64f2e9b935b680f7a75325",
    measurementId: "G-T6V7BMV4MB"
  };
  export default firebase.initializeApp(firebaseConfig)