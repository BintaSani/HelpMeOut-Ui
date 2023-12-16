import firebase from 'firebase/compat/app';
import {FacebookAuthProvider} from 'firebase/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const Config = {
  apiKey: "AIzaSyD7QEhwyaOrpoF8H5MlxoY5mIkJbvj_WjA",
  authDomain: "chrome-ext-40d06.firebaseapp.com",
  projectId: "chrome-ext-40d06",
  storageBucket: "chrome-ext-40d06.appspot.com",
  messagingSenderId: "681316511872",
  appId: "1:681316511872:web:93c1f831bc3903b0003665"
};

// Initialize Firebase
firebase.initializeApp(Config);


export const CreateUserProfileDocument = async (userAuth,additionalData) => {
    if (!userAuth) return
    const userRef = firestore.doc(` user/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const {email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                email,
                createdAt,
                ...additionalData
            });
        } catch (error){
            console.log('Error creating user', error.message);
        }
    }
    return userRef;
}

export const auth= firebase.auth();
export const firestore= firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

const Provider = new FacebookAuthProvider();

export const SignInWithFacebook = () => {
    auth.signInWithPopup(Provider)
      .then((result) => {
        // Handle successful authentication
        console.log(result.user);
      })
      .catch((error) => {
        // Handle errors
        if (error.code === 'auth/popup-closed-by-user') {
          console.log('User closed the popup before completing the operation.');
        } else {
          console.error('Error during authentication:', error);
        }
      });
  };

export default firebase;