import mongoose from "mongoose";
import { createUser } from "./actions/user";

const MONGO_URI = process.env.MONGO_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected");
    });
  } catch (error) {
    console.log("connection to db failed");
  }
};
