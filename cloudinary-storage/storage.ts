import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: async (request, file) => {
    return {
      folder: "unsplash",
      allowedFormats: ["png", "jpeg", "jpg"],
    };
  },
});
