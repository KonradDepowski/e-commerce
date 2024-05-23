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

export const fetchOfferProduct = async () => {
  try {
    await connectToDatabase();
    const product = Product.findOne({ offer: true });
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const updateOfferProduct = async () => {
  try {
    await connectToDatabase();

    const currentOfferProduct = await fetchOfferProduct();
    if (currentOfferProduct) {
      await Product.findOneAndUpdate(
        { _id: currentOfferProduct._id },
        { offer: false }
      );
    }

    const products = await fetchAllProducts();
    const maxIndex = products!.length - 1;
    const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
    const randomProductId = products![randomIndex]._id;

    console.log(randomProductId);

    await Product.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(randomProductId) },
      { offer: true }
    );

    console.log("Product offer updated successfully");
  } catch (error) {
    console.error("Error updating product offer:", error);
  }
};
