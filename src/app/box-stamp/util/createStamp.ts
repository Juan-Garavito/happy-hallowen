import { generativeBackgroundReplace, generativeReplace, outline } from "@cloudinary/url-gen/actions/effect";
import { crop } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from "@cloudinary/url-gen/index";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { PROMPTS_MONSTER } from "./prompts_monster";
import { cld } from "./Cloudinary_Connection";
import { json } from "stream/consumers";

const getRandomPromptMonster = () => PROMPTS_MONSTER[Math.floor(Math.random() * PROMPTS_MONSTER.length)].prompt; 

export async function createStamp(dataImage: string): Promise<CloudinaryImage> {

    const image : CloudinaryImage = await cld.image(dataImage);
    const prompt : string = getRandomPromptMonster();

    image.effect(generativeReplace()
      .from("human or monster or animal")
      .to(prompt)
      .preserveGeometry())
      .effect(generativeBackgroundReplace()
        .prompt("A random color and worn texture with a Halloween theme"))
        .resize(crop().width(250).height(300).gravity(focusOn(FocusOn.face())))
      .effect(outline().color("white").width(10));
  
    return image;
}
  