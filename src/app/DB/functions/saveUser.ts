import { User } from "../definitions";
import { firestore } from "../firebase";

export  default async function saveUser(user: User){
    try {
      const docRef = await firestore.collection('users').add(user);
      console.log('Document written with ID: ', docRef.id);
      console.log('Docref', docRef);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };