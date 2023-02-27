// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyCTPR1ZEwhCw94Kvvg4bU_FM6dXfSYI5sQ',
  authDomain: 'moon-2178a.firebaseapp.com',
  projectId: 'moon-2178a',
  storageBucket: 'moon-2178a.appspot.com',
  messagingSenderId: '1005856037138',
  appId: '1:1005856037138:web:839a7186ccd89d11a3bbcb',
  measurementId: 'G-TE40YFXPBQ',
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
