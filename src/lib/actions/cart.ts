"use server";

import { connectToDatabase } from "../database";
import Discount from "../models/Discount";
import User from "../models/User";
import { CartItemProps } from "../store/CartContext";

export const updateUserCart = async (id: string, cart: CartItemProps[]) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const newUser = await User.findOneAndUpdate(
      { clerkId: id },
      { userCart: cart }
    );
    if (!newUser) {
      throw new Error("Colud not update user data");
    }
    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchUserCart = async (id: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const user = await User.findOne({ clerkId: id });
    if (!user) {
      throw new Error("Could not fetch user cart");
    }
    return user.userCart as CartItemProps[];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const findDiscountCode = async (codeT: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const discount = await Discount.findOne({ code: codeT });
    return discount;
  } catch (error: any) {
    throw new Error(error.mesage);
  }
};
