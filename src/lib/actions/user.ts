"use server";

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
