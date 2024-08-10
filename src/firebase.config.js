import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAL1AR-Dks4d8tEBP3PUZSlu89VRg4stg0',
  authDomain: 'house-marketplace-a17cf.firebaseapp.com',
  projectId: 'house-marketplace-a17cf',
  storageBucket: 'house-marketplace-a17cf.appspot.com',
  messagingSenderId: '396054073472',
  appId: '1:396054073472:web:86eeaa8159e182f3491665',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()
