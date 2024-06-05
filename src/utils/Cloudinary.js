import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async function (localFilePath) {
  try {
    if (!localFilePath) return null;
    // upload file

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been upload sucessfully on cloudinary
    console.log("File has been Successfully uploaded on Cloud", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath)
    // remove the locally saved file as the upload operation got failed
    console.log("File upload is failed",error);
    return null;
  }
};

export {uploadOnCloudinary}
