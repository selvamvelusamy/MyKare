import firebase from "firebase/app";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyATNPgIyFl4jpIB6xFSuWnMOxrVYJAJVFU",
    authDomain: "mykare-f174a.firebaseapp.com",
    projectId: "mykare-f174a",
    storageBucket: "mykare-f174a.appspot.com",
    messagingSenderId: "562191547598",
    appId: "1:562191547598:web:c4c364edd35d34bd7a249f"
}



firebase.initializeApp(config);
export const db = firebase.firestore();

export default firebase;
