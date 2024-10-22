
import { User } from "../definitions";
import { firestore } from "../firebase";

export async function getRefUserForName(name: string){
    const snapshot = await firestore.collection('users').where('name', '==', name).get();
    return snapshot.docs[0]
}