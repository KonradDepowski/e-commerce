import { Button } from "../ui/button";
import { log } from "console";
import { productSchemaType } from "@/lib/models/Product";
import { CartItemProps } from "@/lib/store/CartContext";
import { useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/lib/actions/order";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({
  products,
  userId,
  totalAmount,
}: {
  products: CartItemProps[];
  userId: string;
  totalAmount: number;
}) => {
  const onCheckout = async () => {
    console.log("es");

    const order = { products: [...products], buyerId: userId, totalAmount };

    await checkoutOrder(order)
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);
  return (
    <form action={onCheckout}>
      <button>Get products</button>
    </form>
  );
};

export default Checkout;
