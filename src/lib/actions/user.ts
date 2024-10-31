"use server";

import { connectToDatabase } from "../database";
import User, { userSchemaType } from "../models/User";

export const createUser = async (user: userSchemaType) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const newUser = await User.create(user);
    if (!newUser) {
      throw new Error("Could not create user");
    }
    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUser = async (id: string, user: userSchemaType) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const newUser = await User.findOneAndUpdate({ clerkId: id }, { ...user });
    if (!newUser) {
      throw new Error("Could not update user");
    }
    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const newUser = await User.findOneAndDelete({ clerkId: id });
    if (!newUser) {
      throw new Error("Could not delete user");
    }
    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    throw new Error(error.message);
  }
};
