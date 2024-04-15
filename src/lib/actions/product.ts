"use server";

import mongoose from "mongoose";
import { connectToDatabase } from "../database";
import Product from "../models/Product";

export const fetchAllProducts = async () => {
  try {
    await connectToDatabase();
    const products = Product.find();
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLastWeekProducts = async () => {
  try {
    await connectToDatabase();
    const products = Product.find().sort({ createdAt: -1 });
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProduct = async (id: string) => {
  try {
    await connectToDatabase();
    const product = Product.findOne({ _id: new mongoose.Types.ObjectId(id) });
    return product;
  } catch (error) {
    console.log(error);
  }
};
