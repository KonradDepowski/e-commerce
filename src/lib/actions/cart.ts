import { connectToDatabase } from "../database";
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
