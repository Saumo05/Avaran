import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  console.log(process.env.CLOUDINARY_API_KEY);
  return result;
}

const upload = multer({ storage });

export { upload, imageUploadUtil };
