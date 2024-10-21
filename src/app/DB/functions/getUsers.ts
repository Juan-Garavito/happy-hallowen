import { User } from "../definitions";
import { firestore } from "../firebase";

export async function getUsers() {
    const users : User[] = []
    const querySnapshot = await firestore.collection('users').get();
    querySnapshot.forEach(doc => users.push({ 
      name: doc.data().name,
      stamps: doc.data().stamps}));
  
    return users
  
  }