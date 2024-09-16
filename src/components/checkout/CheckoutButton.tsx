import { productSchemaType } from "@/lib/models/Product";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";
import Checkout from "./Checkout";
import Link from "next/link";
import { Button } from "../ui/button";
import { CartItemProps } from "@/lib/store/CartContext";

const CheckoutButton = ({
  products,
  totalAmount,
}: {
  products: CartItemProps[];
  totalAmount: number;
}) => {
  const { userId } = useAuth();
  return (
    <Button className="bg-[#59ab6e] hover:bg-[#2f6c3e] transition-all p-3 px-6 lg:p-5 rounded-lg w-full md:w-[80%] max-w-[300px] md:py-5 xl:py-7 self-center md:self-end  xl:text-xl  text-white">
      <SignedOut>
        <Link href="/login">Go to Checkout</Link>
      </SignedOut>
      <SignedIn>
        <Checkout
          userId={userId!}
          products={products}
          totalAmount={totalAmount}
        />
      </SignedIn>
    </Button>
  );
};

export default CheckoutButton;
