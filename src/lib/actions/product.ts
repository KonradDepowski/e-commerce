"use server";

import mongoose, { SortOrder } from "mongoose";
import { connectToDatabase } from "../database";
import Product, { productSchemaType } from "../models/Product";
import { revalidatePath } from "next/cache";

type FilterProps = {
  category?: string | string[];
  sex?: string | string[];
  price?: string;
};

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

    revalidatePath("/");
    console.log("Product offer updated successfully");
  } catch (error) {
    console.error("Error updating product offer:", error);
  }
};

export const fetchSortProducts = async (
  sortName: string,
  filterName: FilterProps
) => {
  try {
    let sortCondition: any = {};
    let findCondition: any = {};
    await connectToDatabase();

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
          findCondition.price = { $gte:75, $lte: 100  };
        }
        else if (filterName.price === "Over $100") {
          findCondition.price = { $gte:100,  };
        }
      }
    }

    const products = await Product.find(findCondition).sort(sortCondition);

    return products;
  } catch (error) {
    console.log(error);
  }
};
