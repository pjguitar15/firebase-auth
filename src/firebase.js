import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: "AIzaSyD_6hc1nHoB5Z-hVBAwgljrCK-lWo5kmHo",
  authDomain: "auth-development-8ac14.firebaseapp.com",
  projectId: "auth-development-8ac14",
  storageBucket: "auth-development-8ac14.appspot.com",
  messagingSenderId: "354861734824",
  appId: "1:354861734824:web:254ede3e716ce9bdcf9b9d"
})
export const auth = app.auth()
export default app