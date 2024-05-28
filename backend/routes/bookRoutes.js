const express = require("express");
const multer = require("multer");
const fs = require("fs");
const imageDownloader = require("image-downloader");
const Book = require("../models/book.js");

const router = express.Router();

// Upload photo by link
router.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/../uploads/" + newName,
  });
  res.status(201).json(newName);
});

// Upload photo from device
const photosMiddleware = multer({ dest: "uploads/" });
router.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace(/uploads[\\\/]/, ""));
  }
  res.json(uploadedFiles);
});

// Create book
router.post("/book", async (req, res) => {
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
  res.json(await Book.find());
});

// Get book by ID
router.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Book.findById(id));
});

// Update book
router.put("/book", async (req, res) => {
  const { id, title, author, genre, description, addedPhotos } = req.body;
  const bookDoc = await Book.findById(id);
  bookDoc.set({ title, author, genre, description, photos: addedPhotos });
  await bookDoc.save();
  res.json("ok");
});

// Delete book
router.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.json('deleted');
});

module.exports = router;
