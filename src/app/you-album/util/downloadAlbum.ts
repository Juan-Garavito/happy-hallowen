import convertAlbumToImage from "./convertAlbumToImage.";
import { uploadImageStorage } from "./uploadImageStorage";

export async function downloadAlbum(html: HTMLElement) {
    const dataImage = await convertAlbumToImage(html)
    if (!dataImage) {
        throw new Error("Failed to convert album to image");
    }
    //const urlImage = await uploadImageStorage(dataImage)
    const urlImage = URL.createObjectURL(dataImage);
    //console.log("urlImage", urlImage);
    var a = document.createElement('a');
    a.download = 'album-image';
    a.target = '_blank';
    a.href= urlImage;

    a.click();
}