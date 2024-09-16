"use server";

import { metadata } from "@/app/layout";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import Order, { orderSchemaType } from "../models/Order";
import { connectToDatabase } from "../database";

export const checkoutOrder = async (order: any) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
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
      buyerId: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    throw error;
  }
};
