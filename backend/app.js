const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Book = require("./models/book.js");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const app = express();

// app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));


// Add Access Control Allow Origin headers
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://booksionary-client.vercel.app");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(
  cors({
    methods: '*',
    origin: 'https://booksionary-client.vercel.app',
  })
);

const dbUrl = process.env.MONGO_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.error(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.get("/", (req, res) => {
  res.json("Hello");
});

// upload photo by link
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.status(201).json(newName);
});

// upload photo from device
// const photosMiddleware = multer({ dest: "uploads/" });
// app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
//   const uploadedFiles = [];
//   for (let i = 0; i < req.files.length; i++) {
//     const { path, originalname } = req.files[i];
//     const parts = originalname.split(".");
//     const ext = parts[parts.length - 1];
//     const newPath = path + "." + ext;
//     fs.renameSync(path, newPath);
//     uploadedFiles.push(newPath.replace('uploads/',' '));
//   }
//   res.json(uploadedFiles);
// });

// INDEX Route
app.post("/book", async (req, res) => {
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

app.get("/book", async (req, res) => {
  res.json(await Book.find());
});

// SHOW ROUTE
app.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Book.findById(id));
});

// UPDATE ROUTE
app.put("/book", async(req, res) => {
  const { id, title, author, genre, description, addedPhotos } = req.body;
  const bookDoc = await Book.findById(id);
  bookDoc.set({title, author, genre, description, photos: addedPhotos});
  await bookDoc.save();
  res.json("ok");
});

// DELETE ROUTE
app.delete('/books/:id',async(req,res)=>{
  const {id} = req.params;
  await Book.findByIdAndDelete(id);
  res.json('deleted');
})

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});


