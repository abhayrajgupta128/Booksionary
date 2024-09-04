const express = require("express");
const multer = require("multer");
const fs = require("fs");
const imageDownloader = require("image-downloader");
const Book = require("../models/book.js");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { storage } = require("../cloudConfig.js");
const photosMiddleware = multer({ storage });

const router = express.Router();

// Upload photo by link
router.post("/upload-by-link", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const localPath = __dirname + "/../uploads/" + newName;

  try {
    await imageDownloader.image({
      url: link,
      dest: localPath,
    });

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: `booksionary/${newName}`,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    // Delete the local file after uploading
    fs.unlinkSync(localPath);
    res.status(201).json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
});
// Upload photo from device
router.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const uploadedFiles = req.files.map((file) => file.path);
  res.json(uploadedFiles);
});

// Create book
router.post("/book", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { title, author, genre, addedPhotos, description } = req.body;
  const bookDoc = await Book.create({
    title,
    author,
    genre,
    photos: addedPhotos,
    description,
  });
  res.json(bookDoc);
});

// Get all books
router.get("/book", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json(await Book.find());
});

// Get book by ID
router.get("/books/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  res.json(await Book.findById(id));
});

// Update book
router.put("/book", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id, title, author, genre, description, addedPhotos } = req.body;
  const bookDoc = await Book.findById(id);
  bookDoc.set({ title, author, genre, description, photos: addedPhotos });
  await bookDoc.save();
  res.json("ok");
});

// Delete book
router.delete("/books/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.json("deleted");
});

module.exports = router;
