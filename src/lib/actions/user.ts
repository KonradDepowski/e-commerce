"use server";

import { connectToDatabase } from "../database";
import User from "../models/db/User";
import { userSchemaType } from "../types/types";

export const createUser = async (user: userSchemaType) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const newUser: userSchemaType = await User.create(user);
    if (!newUser) {
      throw new Error("Could not create user");
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

export const updateUser = async (id: string, user: userSchemaType) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const newUser: userSchemaType | null = await User.findOneAndUpdate(
      { clerkId: id },
      { ...user }
    );
    if (!newUser) {
      throw new Error("Could not update user");
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

export const deleteUser = async (id: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const newUser: userSchemaType | null = await User.findOneAndDelete({
      clerkId: id,
    });
    if (!newUser) {
      throw new Error("Could not delete user");
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
