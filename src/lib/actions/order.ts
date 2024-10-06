"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import Order, { orderSchemaType } from "../models/Order";
import { connectToDatabase } from "../database";
import Product from "../models/Product";
import { fetchProduct } from "./product";

export const checkoutOrder = async (order: any) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  console.log("Order checkout ", order);

  const totalAmount = order.totalAmount * 100;
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: totalAmount,
            product_data: {
              name: "order",
            },
          },

          quantity: 1,
        },
      ],

      metadata: {
        productsIds: JSON.stringify(order.productsIds),
        buyerId: order.buyerId,
        totalAmount: JSON.stringify(totalAmount / 100),
        deliveryData: JSON.stringify(order.deliveryData),
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success?id=${order.buyerId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: orderSchemaType) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create({
      ...order,
    });

    console.log(newOrder);

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    throw error;
  }
};

export const fetchUserOrder = async (userId: string) => {
  try {
    await connectToDatabase();

    const orders: orderSchemaType[] = await Order.find({
      buyerId: userId,
    });

    return orders;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchSingleOrder = async (orderId: string) => {
  try {
    await connectToDatabase();

    // Assuming Order.findOne since we're fetching a single order by ID
    const order: any = await Order.findOne({ _id: orderId });

    if (!order) {
      throw new Error("Order not found");
    }

    const productsIds = order.productsIds;

    const productsData = [];

    // Using Promise.all to handle asynchronous operations inside map
    const products = await Promise.all(
      productsIds.map(async (obj: any) => {
        const productData = await fetchProduct(obj.id);
        return {
          ...productData,
          size: obj.size,
          quantity: obj.quantity,
        };
      })
    );

    productsData.push({
      products,
      deliveryData: order.deliveryData,
      totalAmount: order.totalAmount,
      date: order.createdAt,
    });

    return productsData;
  } catch (error) {
    console.error(error);
    return [];
  }
};
