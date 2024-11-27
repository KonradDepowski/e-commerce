"use server";

import { connectToDatabase } from "../database";
import Discount from "../models/db/Discount";
import User from "../models/db/User";
import { CartItemProps, discountSchemaType, userSchemaType } from "../types/types";

export const updateUserCart = async (id: string, cart: CartItemProps[]) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const newUser: userSchemaType | null = await User.findOneAndUpdate(
      { clerkId: id },
      { userCart: cart }
    );
    if (!newUser) {
      throw new Error("Colud not update user data");
    }
    return JSON.parse(JSON.stringify(newUser));
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const fetchUserCart = async (id: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const user: userSchemaType | null = await User.findOne({ clerkId: id });
    if (!user) {
      throw new Error("Could not fetch user cart");
    }
    return user.userCart as CartItemProps[];
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const findDiscountCode = async (codeT: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const discount: discountSchemaType | null = await Discount.findOne({
      code: codeT,
    });
    return discount;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};
