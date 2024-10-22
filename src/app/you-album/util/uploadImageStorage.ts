import { firestorage } from "../../DB/firebase"; // Ensure this path is correct and the module exists
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function uploadImageStorage(dataImage: Blob) {
    const storageRef = await ref(firestorage, 'images/' + new Date().getTime())
    await uploadBytes(storageRef, dataImage)
    const urlImage = await getDownloadURL(storageRef)
    return urlImage;
}