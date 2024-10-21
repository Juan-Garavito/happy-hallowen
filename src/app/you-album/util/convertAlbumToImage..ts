import { toBlob } from "html-to-image";

export default async function convertAlbumToBlob(album : HTMLElement) {
    const blob = await toBlob(album)
    return blob;
}