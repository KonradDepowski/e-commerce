"use server";

import mongoose from "mongoose";
import { connectToDatabase } from "../database";
import Product from "../models/Product";
import { revalidatePath } from "next/cache";

type FilterProps = {
  category?: string | string[];
  sex?: string | string[];
  price?: string;
};

export const fetchAllProducts = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const products = Product.find();
    if (!products) {
      throw new Error("Could not fetch all products");
    }

    return products;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchLastWeekProducts = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const products = Product.find().sort({ createdAt: -1 }).limit(5);
    if (!products) {
      throw new Error("Could not fetch last week prodcuts");
    }
    return products;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchProduct = async (id: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database.");
    }
    const product = Product.findOne({ _id: new mongoose.Types.ObjectId(id) });
    if (!product) {
      throw new Error("Could not fetch product");
    }
    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchOfferProduct = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database.");
    }
    const product = Product.findOne({ offer: true });
    if (!product) {
      throw new Error("Could not fetch offer product");
    }
    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateOfferProduct = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database.");
    }
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

    revalidatePath("/");
  } catch (error: any) {
    throw new Error(
      error.message ? error.message : "Failed to update offer product"
    );
  }
};

export const fetchSortProducts = async (
  sortName: string,
  limit = 12,
  page: string | number,
  filterName: FilterProps
) => {
  try {
    let sortCondition: any = {};
    let findCondition: any = {};
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database.");
    }
    const skipAmount = (Number(page) - 1) * limit;
    // Setting sortCondition based on sortName
    if (sortName) {
      if (sortName === "descending") {
        sortCondition = { price: -1 };
      } else if (sortName === "ascending") {
        sortCondition = { price: 1 };
      } else if (sortName === "latest") {
        sortCondition = { createdAt: -1 };
      }
    }

    // Dynamically building findCondition based on filterName
    if (filterName) {
      if (filterName.category) {
        findCondition.category = filterName.category;
      }
      if (filterName.sex) {
        findCondition.sex = filterName.sex;
      }
      if (filterName.price) {
        console.log("price" + filterName.price);

        if (filterName.price === "Below $50") {
          findCondition.price = { $lt: 50 };
        } else if (filterName.price === "$50-$75") {
          findCondition.price = { $gte: 50, $lte: 75 };
        } else if (filterName.price === "$75-$100") {
          findCondition.price = { $gte: 75, $lte: 100 };
        } else if (filterName.price === "Over $100") {
          findCondition.price = { $gte: 100 };
        }
      }
    }

    const productCount = await Product.countDocuments();
    const products = await Product.find(findCondition)
      .sort(sortCondition)
      .skip(skipAmount)
      .limit(limit);

    if (!products) {
      throw new Error("Could not fetch products");
    }

    return {
      products,
      totalPages: Math.ceil(productCount / limit),
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
