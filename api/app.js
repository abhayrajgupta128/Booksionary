const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const bookRoutes = require("./routes/bookRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

// // Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);


// // Connect to MongoDB
const dbUrl = process.env.MONGO_URL;
mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// // Route middleware
app.use("/api", bookRoutes);
app.use("/api", userRoutes);


// for testing
app.get("/api/test", (req, res) => {
    res.json("test ok");
  });

// // Start server
const PORT = process.env.PORT;
if(PORT){
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;

