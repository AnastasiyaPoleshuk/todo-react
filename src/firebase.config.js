import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBReBn8WbDdiW2uYSQQ1ramRvQOd64HcpU",
    authDomain: "todo-react-97ef8.firebaseapp.com",
    projectId: "todo-react-97ef8",
    storageBucket: "todo-react-97ef8.appspot.com",
    messagingSenderId: "1091445240334",
    appId: "1:1091445240334:web:8f9800aa197c1c4061425f",
    measurementId: "G-KR6ZK074CE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();