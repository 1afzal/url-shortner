import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database.");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}
export default connectDB;