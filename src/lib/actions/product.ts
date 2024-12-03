"use server";

import mongoose from "mongoose";
import { connectToDatabase } from "../database";
import Product from "../models/db/Product";
import { revalidatePath } from "next/cache";
import {
  ExpiredDateType,
  FilterProps,
  productSchemaType,
} from "../types/types";
import OfferExpiersDate from "../models/db/OfferExpiersDate";

export const fetchAllProducts = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const products = await Product.find().lean<productSchemaType[]>();
    if (!products) {
      throw new Error("Could not fetch all products");
    }

    return products;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const fetchHighLigthsProducts = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean<productSchemaType[]>();
    if (!products) {
      throw new Error("Could not fetch last week prodcuts");
    }

    const plainProducts: productSchemaType[] = [];

    products.forEach((product) => {
      plainProducts.push({
        ...product,
        _id: product._id?.toString(),
      });
    });

    return plainProducts;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const fetchProduct = async (id: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database.");
    }
    const product = await Product.findOne({
      _id: id,
    }).lean<productSchemaType>();
    if (!product) {
      throw new Error("Could not fetch product");
    }

    return { ...product, _id: product._id?.toString() };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const fetchOfferProduct = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database.");
    }
    const product = await Product.findOne({
      offer: true,
    }).lean<productSchemaType>();
    if (!product) {
      throw new Error("Could not fetch offer product");
    }
    return { ...product, _id: product._id?.toString() };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
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

    const product: productSchemaType | null = await Product.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(randomProductId) },
      { offer: true }
    ).lean<productSchemaType>();

    revalidatePath("/");
    return product;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
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
    if (sortName) {
      if (sortName === "descending") {
        sortCondition = { price: -1 };
      } else if (sortName === "ascending") {
        sortCondition = { price: 1 };
      } else if (sortName === "latest") {
        sortCondition = { createdAt: -1 };
      }
    }

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
    const products: productSchemaType[] = await Product.find(findCondition)
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
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const fetchOfferExpiresDate = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database.");
    }

    const expiresDate: ExpiredDateType | null = await OfferExpiersDate.findOne({
      _id: "6749a95236103ef09864c6f9",
    });

    if (!expiresDate) {
      throw new Error("Could not fetch expires offer date");
    }

    return {
      date: expiresDate.date.toISOString(),
      _id: expiresDate._id.toString(),
    };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const updateOfferExpiresDate = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database.");
    }

    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const expiresDate = await OfferExpiersDate.findOneAndUpdate({
      _id: "6749a95236103ef09864c6f9",
      date: tomorrow,
    });
    if (!expiresDate) {
      throw new Error("Could not update offer data");
    }

    return {
      date: expiresDate.date.toISOString(),
      _id: expiresDate._id.toString(),
    };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};
