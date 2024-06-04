import multer from "multer";

// Configuration for disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Setting the destination directory for the uploaded files
    cb(null, "./public/temp"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    // Setting the filename for the uploaded files
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname);
  }
});

// Multer upload setup with disk storage
export const upload = multer({ 
   storage ,
  });