import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB() {
  const url = process.env.MONGO_URI;
  try {
    await mongoose.connect(url as string);
    console.log("connected to db");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
}
