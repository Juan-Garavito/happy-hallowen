import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen/index";
import { IDIMAGE_BASELINE } from "./idImage_baseline";
import { createStamp } from "./createStamp";
import { uploadImage } from "./uploadImage";


const getIdImagesBaseline = (): string[] => {
    const idImageBaseline: string[] = [];
    const numIdBaseline : number = 5;
    while (idImageBaseline.length < numIdBaseline) {
        const idImage = IDIMAGE_BASELINE[Math.floor(Math.random() * IDIMAGE_BASELINE.length)].idImage;
        if (!idImageBaseline.includes(idImage)) {
            idImageBaseline.push(idImage);
        }
    }
    return idImageBaseline; 
};
  

export async function fetchImages () : Promise<{image: string | null, error : string | null}> {
    const idImage: string[] = getIdImagesBaseline();
    console.log("idImage: " + idImage);
    let error: string | null = null;
  
    try {
      const image : CloudinaryImage[] = await createStamp(idImage);
      //console.log("Image: " + JSON.stringify(image));
      const dataImage = await uploadImage(image);
      //const dataImage = { error: "error" };  
      
      if (dataImage.error) {
        error = "Error al subir la imagen.";
      }
  
      return { image: dataImage.image, error };
    } catch {
      return { image: null, error: "Error al obtener la imagen." };
    }
  };
  
