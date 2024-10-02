"use client";

import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import Checkout from "./Checkout";
import { FormValues } from "../cart/DeliveryForm";

const CheckoutButton = ({
  productsIds,
  totalAmount,
  isValid,
  deliveryData,
}: {
  productsIds: Object[];
  totalAmount: number;
  isValid: boolean;
  deliveryData: FormValues;
}) => {
  const { userId } = useAuth();

  console.log(deliveryData);

  let content = (
    <>
      <SignedOut>
        <Link href="/login">
          <Button
            type="button"
            className="bg-[#59ab6e] hover:bg-[#2f6c3e] transition-all p-3 px-6 lg:p-5 rounded-lg w-full md:w-[80%] max-w-[300px] md:py-5 xl:py-7 self-center md:self-end xl:text-xl text-white"
          >
            Go to Checkout
          </Button>
        </Link>
      </SignedOut>

      <SignedIn>
        <Button
          type="submit"
          className="bg-[#59ab6e] hover:bg-[#2f6c3e] transition-all p-3 px-6 lg:p-5 rounded-lg w-full md:w-[80%] max-w-[300px] md:py-5 xl:py-7 self-center md:self-end xl:text-xl text-white"
        >
          Get Products
        </Button>
      </SignedIn>
    </>
  );

  if (isValid) {
    content = (
      <Checkout
        userId={userId!}
        productsIds={productsIds}
        totalAmount={totalAmount}
        deliveryData={deliveryData}
      />
    );
  }

  return content;
};

export default CheckoutButton;
