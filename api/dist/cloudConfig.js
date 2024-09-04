"use strict";

var cloudinary = require('cloudinary').v2;
var _require = require('multer-storage-cloudinary'),
  CloudinaryStorage = _require.CloudinaryStorage;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
  secure: true
});
var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'booksionary',
    allowedFormats: ["png", "jpg", "jpeg"]
  }
});
module.exports = {
  cloudinary: cloudinary,
  storage: storage
};