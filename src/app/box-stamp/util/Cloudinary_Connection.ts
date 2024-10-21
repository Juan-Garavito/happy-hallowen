import { Cloudinary } from "@cloudinary/url-gen/index";

export const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.CLOUD_NAME,
    }
  });