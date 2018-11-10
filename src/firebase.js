import * as firebase from 'firebase';



// Initialize Firebase
var config = {
    apiKey: "AIzaSyAJhOzwkvXJqSnNGCiyGCotHnRMHqgsSoY",
    authDomain: "meeting-app-27c0d.firebaseapp.com",
    databaseURL: "https://meeting-app-27c0d.firebaseio.com",
    projectId: "meeting-app-27c0d",
    storageBucket: "meeting-app-27c0d.appspot.com",
    messagingSenderId: "318137455677"
};
firebase.initializeApp(config);

export default firebase;