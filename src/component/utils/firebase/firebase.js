// import firebase from 'firebase/compat/app';
// import {FacebookAuthProvider} from 'firebase/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/auth';


// // Import the functions you need from the SDKs you need
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const Config = {
//   apiKey: "AIzaSyASUJlnUutu5AN9CXXcxyAC1cwX7P_Ez54",
//   authDomain: "chrome-ext-40d06.firebaseapp.com",
//   projectId: "chrome-ext-40d06",
//   storageBucket: "chrome-ext-40d06.firebasestorage.app",
//   messagingSenderId: "681316511872",
//   appId: "1:681316511872:web:5245c7dad8f6726b003665"
// };

// // Initialize Firebase
// firebase.initializeApp(Config);


// export const CreateUserProfileDocument = async (userAuth,additionalData) => {
//     if (!userAuth) return
//     const userRef = firestore.doc(` user/${userAuth.uid}`);
//     const snapshot = await userRef.get();

//     if (!snapshot.exists) {
//         const {email} = userAuth;
//         const createdAt = new Date();

//         try{
//             await userRef.set({
//                 email,
//                 createdAt,
//                 ...additionalData
//             });
//         } catch (error){
//             console.log('Error creating user', error.message);
//         }
//     }
//     return userRef;
// }

// export const auth= firebase.auth();
// export const firestore= firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({prompt: 'select_account'});

// export const SignInWithGoogle = () => auth.signInWithPopup(provider);

// const Provider = new FacebookAuthProvider();

// export const SignInWithFacebook = () => {
//     auth.signInWithPopup(Provider)
//       .then((result) => {
//         // Handle successful authentication
//         console.log(result.user);
//       })
//       .catch((error) => {
//         // Handle errors
//         if (error.code === 'auth/popup-closed-by-user') {
//           console.log('User closed the popup before completing the operation.');
//         } else {
//           console.error('Error during authentication:', error);
//         }
//       });
//   };

//   export const requestCustomToken = async (uid) => {
//     try {
//       const response = await fetch('https://localhost:5000/generate-token', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ uid }),
//       });
//       if (!response.ok) throw new Error('Failed to fetch custom token');
//       const { token } = await response.json();
//       return token;
//     } catch (error) {
//       console.error('Error requesting custom token:', error);
//       throw error;
//     }
//   };
// export default firebase;

import firebase from 'firebase/compat/app';
import { FacebookAuthProvider } from 'firebase/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const Config = {
  apiKey: "AIzaSyASUJlnUutu5AN9CXXcxyAC1cwX7P_Ez54",
  authDomain: "chrome-ext-40d06.firebaseapp.com",
  projectId: "chrome-ext-40d06",
  storageBucket: "chrome-ext-40d06.firebasestorage.app",
  messagingSenderId: "681316511872",
  appId: "1:681316511872:web:5245c7dad8f6726b003665"
};

// Initialize Firebase
firebase.initializeApp(Config);

export const CreateUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Fixed typo in path to user document
  const userRef = firestore.doc(`user/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user profile', error.message); // Improved error logging
    }
  }

  return userRef;
};

// Export auth and firestore references
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google Sign-in Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const SignInWithGoogle = () => auth.signInWithPopup(googleProvider);

// Facebook Sign-in Provider
const facebookProvider = new FacebookAuthProvider();

export const SignInWithFacebook = () => {
  auth.signInWithPopup(facebookProvider)
    .then((result) => {
      // Handle successful authentication
      console.log('Facebook user:', result.user);
    })
    .catch((error) => {
      // Handle errors
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('User closed the popup before completing the operation.');
      } else {
        console.error('Error during Facebook authentication:', error);
      }
    });
};

// Request custom Firebase token from your server
export const requestCustomToken = async (uid) => {
  try {
    const response = await fetch('http://localhost:5000/generate-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid })
    });
    
    if (!response.ok) throw new Error('Failed to fetch custom token');
    
    const { token } = await response.json();
    return token;
  } catch (error) {
    console.error('Error requesting custom token:', error.message); // More specific error message
    throw error;
  }
};
const sendTokenToExtension = async (uid) => {
  try {
    const token = await requestCustomToken(uid);  // Assume you get the token here

    // Post message to the window (your extension's content script)
    window.postMessage({ type: 'SEND_TOKEN', token: token }, '*');
  } catch (error) {
    console.error('Failed to send token:', error);
  }
};
auth.onAuthStateChanged((user) => {
  if (user) {
    sendTokenToExtension(user.uid);
  } else {
    console.error('No user is signed in.');
  }
});

export default firebase;
