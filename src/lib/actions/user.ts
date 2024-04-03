"use server";

import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../database";
import User, { userSchemaType } from "../models/User";

export const createUser = async (user: userSchemaType) => {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id: string, user: userSchemaType) => {
  try {
    await connectToDatabase();
    const newUser = await User.findByIdAndUpdate(id, { ...user });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectToDatabase();
    const newUser = await User.findOneAndDelete({ clerkId: id });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};
