// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()
export const appleProvider = new OAuthProvider('apple.com')

// Auth redirect error log ------------------------------------
export const createWithEmailAndPasswordError = (error: string) => {
  switch (error) {
    case 'auth/invalid-email':
      return 'メールアドレスの形式で入力してください'
    case 'auth/email-already-in-use':
      return 'このメールアドレスはすでに使用されています'
  }
}

export const signInWithEmailAndPasswordError = (error: string) => {
  switch (error) {
    case 'auth/user-not-found':
      return 'メールアドレスかパスワードが違います'
    case 'auth/invalid-email':
      return 'メールアドレスの形式で入力してください'
    case 'auth/wrong-password':
      return 'メールアドレスかパスワードが違います'
  }
}

// Auth redirect error log ------------------------------------
