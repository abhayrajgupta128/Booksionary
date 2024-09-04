const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  // owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  author: String,
  genre: String,
  description: String,
  photos: [String],
});

const BookModel = mongoose.model("Book", bookSchema);
module.exports = BookModel;
