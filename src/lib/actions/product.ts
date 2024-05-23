"use server";

import mongoose from "mongoose";
import { connectToDatabase } from "../database";
import Product, { productSchemaType } from "../models/Product";

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

    await Product.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(randomProductId) },
      { offer: true }
    );

    console.log("Product offer updated successfully");
  } catch (error) {
    console.error("Error updating product offer:", error);
  }
};

export const sortProducts = async (sortName: string) => {
  try {
    await connectToDatabase();
    const sortOrder = sortName === "low" ? -1 : 1;
    const products = await Product.find().sort({ price: sortOrder });
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (data: productSchemaType) => {
  try {
    await connectToDatabase();
    await Product.create(data);
  } catch (error) {
    console.log(error);
  }
};
