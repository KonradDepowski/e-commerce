"use server";

import { connectToDatabase } from "../database";
import Discount from "../models/Discount";
import User from "../models/User";
import { CartItemProps } from "../store/CartContext";

export const updateUserCart = async (id: string, cart: CartItemProps[]) => {
  try {
    await connectToDatabase();
    const newUser = await User.findOneAndUpdate(
      { clerkId: id },
      { userCart: cart }
    );
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserCart = async (id: string) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: id });
    return user.userCart as CartItemProps[];
  } catch (error) {
    console.log(error);
  }
};

export const findDiscountCode = async (codeT: string) => {
  try {
    await connectToDatabase();
    const discount = await Discount.findOne({ code: codeT });
    return discount;
  } catch (error) {
    console.log(error);
  }
};
