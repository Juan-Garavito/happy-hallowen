import { CloudinaryImage } from "@cloudinary/url-gen/index";
import { DataImageUpload, ErrorDataImageUpload } from "./definitions";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestorage } from "@/app/DB/firebase";
import { cat } from "@cloudinary/url-gen/qualifiers/focusOn";

/*export async function uploadImage(image: CloudinaryImage): Promise<DataImageUpload> {
    
    const urlBlob = await image.toURL()
    const responserUrl = await fetch(urlBlob)
    const blob = await responserUrl.blob();
    
    console.log("blob : " + JSON.stringify(blob.size));
    if(blob.size <= 0){
      return { error: { message: "Hubo un error subiendo la imagen" } } as DataImageUpload;
    }

    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', process.env.UPLOAD_PRESET || "");
  
    const res = await fetchUploadImage(formData);
    if(res.status === 450) {
      return { error: { message: res.statusText } } as DataImageUpload;
    }
  
      
    let data : DataImageUpload = await res.json();
    
    console.log("Guardo la imagen");
    return data;
  }


async function fetchUploadImage(formData: FormData): Promise<Response> {
  const url = process.env.URL_UPLOAD_IMAGE;
  
  if(!url) {
    return new Response(null, { status: 450, statusText: "url no defininida" });
  }

  const res =  await fetch(url, {
      method: "POST",
      body: formData
    });

  return res;
}*/


interface uploadImage{
  error: string | null;
  image: string | null ;
}

export async function uploadImage(image: CloudinaryImage): Promise<uploadImage> {
  
  try{
    const url = image.toURL();
    const responseURL = await fetch(url);
    const blob = await responseURL.blob();
    console.log("blob : " + JSON.stringify(blob.size));

    if(blob.size <= 0){
      return {error: "Hubo un error subiendo la imagen", image: null};
    }
  
    const refStorage = ref(firestorage, 'images/' + new Date().getTime());
    await uploadBytes(refStorage, blob, { contentType: 'image/jpeg' })   
    const urlImage = await getDownloadURL(refStorage);
    console.log("urlImage : " + urlImage);

    return {error: null, image: urlImage};

  }catch{
    return {error: "Hubor un errro", image: null};
  }
  
}
