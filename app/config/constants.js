import firebase from 'firebase'
import Rebase from 're-base'

const app = firebase.initializeApp({
  apiKey: "AIzaSyCeqQlCNTFnOeAjAKd-Lr4zst7F-qtF0pA",
  authDomain: "campus-recruiter-react.firebaseapp.com",
  databaseURL: "https://campus-recruiter-react.firebaseio.com",
  projectId: "campus-recruiter-react",
  storageBucket: "campus-recruiter-react.appspot.com",
  messagingSenderId: "136011884557"
})

export const base = Rebase.createClass(app.database())
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
