import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const db = mongoose.connect(MONGODB_URL!).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

export default db;