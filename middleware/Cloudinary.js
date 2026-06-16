const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "InventoryFolder",
    allowed_formats: ["jpg", "png", "jpeg", "jfif"],
  },
});

const upload = multer({ storage });

module.exports = upload;
