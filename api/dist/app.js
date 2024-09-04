"use strict";

var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
require("dotenv").config();
var bookRoutes = require("./routes/bookRoutes.js");
var userRoutes = require("./routes/userRoutes.js");
var app = express();

// // Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express["static"](__dirname + "/uploads"));
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));

// // Connect to MongoDB
var dbUrl = process.env.MONGO_URL;
mongoose.connect(dbUrl).then(function () {
  return console.log("Connected to MongoDB");
})["catch"](function (err) {
  return console.error("MongoDB connection error:", err);
});

// // Route middleware
app.use("/book", bookRoutes);
app.use("/user", userRoutes);

// for testing
app.get("/test", function (req, res) {
  res.json("test ok");
});

// // Start server
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});