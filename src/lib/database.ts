import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  try {
    mongoose.connect(MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected");
    });
  } catch (error) {
    console.log("connection to db failed");
  }
};
