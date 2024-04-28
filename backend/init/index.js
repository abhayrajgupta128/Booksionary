import mongoose from "mongoose";
import initData from "./data.js"
import Book from "../models/book.js";

const MONGO_URL= "mongodb://127.0.0.1:27017/booksionary";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async() => {
    await Book.deleteMany({});
    await Book.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();