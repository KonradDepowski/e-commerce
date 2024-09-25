import { Button } from "../ui/button";
import { log } from "console";
import { productSchemaType } from "@/lib/models/Product";
import { CartContext, CartItemProps } from "@/lib/store/CartContext";
import { useContext, useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/lib/actions/order";
import { FormValues } from "../cart/DeliveryForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({
  productsIds,
  userId,
  totalAmount,
  deliveryData,
}: {
  productsIds: Object[];
  userId: string;
  totalAmount: number;
  deliveryData: FormValues;
}) => {
  const onCheckout = async () => {
    const order = {
      productsIds: [...productsIds],
      buyerId: userId,
      totalAmount,
      deliveryData,
    };

    await checkoutOrder(order);
  };

  useEffect(() => {
    console.log("checkout");

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
    <Button
      className="bg-[#59ab6e] hover:bg-[#2f6c3e] transition-all p-3 px-6 lg:p-5 rounded-lg w-full md:w-[80%] max-w-[300px] md:py-5 xl:py-7 self-center md:self-end xl:text-xl text-white"
      onClick={onCheckout}
      type="submit"
    >
      Get products
    </Button>
  );
};

export default Checkout;
