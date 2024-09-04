"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bookSchema = new Schema({
  // owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  author: String,
  genre: String,
  description: String,
  photos: [String]
});
var BookModel = mongoose.model("Book", bookSchema);
module.exports = BookModel;