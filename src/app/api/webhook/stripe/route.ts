import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order";
import { error } from "console";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(
      { message: "Webhook error", error: error },
      { status: 400 }
    );
  }

  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const { id, metadata } = event.data.object;

    const order = {
      id: id,
      productsIds: JSON.parse(metadata?.productsIds!) || [],
      buyerId: metadata?.buyerId || "",
      buyerAvatar: metadata?.buyerAvatar || "",
      totalAmount: Number(metadata?.totalAmount) || 0,
      discount: metadata?.discount || "",
      deliveryData: JSON.parse(metadata?.deliveryData!) || {},
      createdAt: new Date(),
      status: "paid",
    };

    const newOrder = await createOrder(order);
    return NextResponse.json({ message: "OK", order: newOrder });
  }

  return new Response("", { status: 200 });
}
