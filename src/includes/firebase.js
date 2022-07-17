import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC-8Lde0awLj2__ufLG8rqqIq9Fv-Yay4w',
  authDomain: 'jarvis17-38a7c.firebaseapp.com',
  databaseURL: 'https://jarvis17-38a7c.firebaseio.com',
  projectId: 'jarvis17-38a7c',
  storageBucket: 'jarvis17-38a7c.appspot.com',
  messagingSenderId: '843259233870',
  appId: '1:843259233870:web:3c13220f36709fe08b251f',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
// const commentsCollection = db.collection('comments');

export {
  auth,
  db,
  usersCollection,
  storage,
};
