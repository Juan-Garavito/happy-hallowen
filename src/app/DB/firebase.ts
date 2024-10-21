import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firebaseConfig } from './firebaseConfig';
import { getStorage } from 'firebase/storage';

let app;
if(!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
}

export const firestorage = getStorage(app);
export const firestore = firebase.firestore();
