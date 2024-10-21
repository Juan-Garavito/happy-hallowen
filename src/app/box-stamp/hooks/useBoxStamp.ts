import { fetchImages } from "../util/fetchImages";
import saveStampsForUser from "../util/saveStampsForUser";


export async function useBoxStamp(numStamp: number) {
  const attemptsMaximum : number = 5;
  let attemptsCreate: number = 0;
  const imagesBox: Array<string> = [];

  const createPromise = async (): Promise<{ error: string | null}> => {

    if (attemptsCreate >= attemptsMaximum) {
      return { error: "Lo lamento, tenemos un error al crear tú sobre. Recarga la página." };
    }

    if (imagesBox.length >= numStamp) {
      return {error: null}
    }

    console.log("attempts create: " + attemptsCreate);
    const {image, error} = await fetchImages();
    
    if (error || image === null) {
      attemptsCreate++;
    }else{
      imagesBox.push(image);
    }

    return createPromise();
  };

  const responseObj = await createPromise();

  if (responseObj.error) {
    return { imagesBox, error: responseObj.error };
  }

  saveStampsForUser(imagesBox);
  return { imagesBox, error: null };
}

