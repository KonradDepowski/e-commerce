"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import Order from "../models/db/Order";
import { connectToDatabase } from "../database";
import { fetchProduct } from "./product";
import { orderSchemaType, productDataType } from "../types/types";

export const checkoutOrder = async (order: orderSchemaType) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const totalAmount = order.totalAmount * 100;
  let session;
  try {
    session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: totalAmount,
            product_data: {
              name: "Products Cart",
            },
          },

          quantity: 1,
        },
      ],

      metadata: {
        productsIds: JSON.stringify(order.productsIds),
        buyerId: order.buyerId,
        buyerAvatar: order.buyerAvatar,
        totalAmount: JSON.stringify(totalAmount / 100),
        discount: order.discount,
        deliveryData: JSON.stringify(order.deliveryData),
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success?id=${order.buyerId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/reject`,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  } finally {
    redirect(session!.url!);
  }
};

export const createOrder = async (order: orderSchemaType) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const newOrder: orderSchemaType = await Order.create({
      ...order,
    });

    if (!newOrder) {
      throw new Error("Could not create new order");
    }

    return JSON.parse(JSON.stringify(order));
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const fetchUserOrder = async (userId: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const orders: orderSchemaType[] = await Order.find({
      buyerId: userId,
    });
    if (!orders) {
      throw new Error("Could not fetch user orders");
    }

    return orders;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const fetchSingleOrder = async (orderId: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const order: orderSchemaType | null = await Order.findOne({ _id: orderId });

    if (!order) {
      throw new Error("Could not fetch order");
    }

    const productsIds = order.productsIds;

    const productsData: productDataType[] = [];

    const products = await Promise.all(
      productsIds.map(async (obj: any) => {
        const productData = await fetchProduct(obj.id);
        return {
          ...productData,
          size: obj.size,
          quantity: obj.quantity,
          price: obj.price,
        };
      })
    );
    if (!products) {
      throw new Error("Could not fetch order");
    }

    productsData.push({
      products,
      deliveryData: order.deliveryData,
      totalAmount: order.totalAmount,
      discount: order.discount,
      date: order.createdAt!,
    });

    return productsData;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};
