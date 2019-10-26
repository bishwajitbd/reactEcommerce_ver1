import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyCUb01kqG8OniTPKya7Bj4mA2DeVxV744I",
    authDomain: "reactecommercedb.firebaseapp.com",
    databaseURL: "https://reactecommercedb.firebaseio.com",
    projectId: "reactecommercedb",
    storageBucket: "",
    messagingSenderId: "791337956480",
    appId: "1:791337956480:web:e582fd876f46b9e66aa265",
    measurementId: "G-WJRX9LL9M0"
  };

  export const createUserProfileDocoment= async(userAuth, additinalData)=> {

    if(!userAuth) return;

    const userRef=firestore.doc(`users/${userAuth.uid}`);

    const snapShot= await userRef.get();
    console.log(snapShot);
    if(!snapShot.exists){
      const {displayName, email}= userAuth;
      const createdAt= new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additinalData
        })

      } catch (error){
        console.log('error createing user', error.message);
      }

    }
     console.log(userRef);
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth= firebase.auth();
  export const firestore= firebase.firestore();

  const provider= new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle=()=> auth.signInWithPopup(provider);

  export default firebase;

