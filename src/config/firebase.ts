import firebase from 'firebase';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAZf5NG40DyyBzL7sTrFSN5O82u1b9HxcU",
    authDomain: "studying-772b6.firebaseapp.com",
    projectId: "studying-772b6",
    storageBucket: "studying-772b6.appspot.com",
    messagingSenderId: "423684333389",
    appId: "1:423684333389:web:860f1d0801db456b712104",
    measurementId: "G-9LHLHHY18P"
};


firebase.initializeApp(firebaseConfig)
//firebase.analytics();

//const storage = firebase.storage();

export default firebase;