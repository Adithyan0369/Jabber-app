import firebase from "firebase/compat/app"
import "firebase/compat/auth"
// import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDTBnewkyklfhqlsdqhMjCt5LzYlforiUc",
  authDomain: "messenger-c4890.firebaseapp.com",
  projectId: "messenger-c4890",
  storageBucket: "messenger-c4890.appspot.com",
  messagingSenderId: "235930589914",
  appId: "1:235930589914:web:db3f76cdd369786c1763e3",
  measurementId: "G-G431EHK3L0"
};

  const firebaseapp = firebase.initializeApp(firebaseConfig);
  // const db=firebaseapp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth,provider};
 // export default db;