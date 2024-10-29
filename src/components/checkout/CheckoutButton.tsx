"use client";

import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Link from "next/link";
import { Button } from "../ui/button";

const CheckoutButton = () => {
  return (
    <>
      <SignedOut>
        <Link href="/login">
          <Button
            type="button"
            className="bg-[var(--green-main)] hover:bg-[var(--green-main-hover)] transition-all p-3 px-6 lg:p-5 rounded-lg w-full md:w-[80%] max-w-[300px] md:py-5 xl:py-7 self-center md:self-end xl:text-xl text-white"
          >
            Go to Checkout
          </Button>
        </Link>
      </SignedOut>

      <SignedIn>
        <Button
          type="submit"
          className="bg-[var(--green-main)] hover:bg-[var(--green-main-hover)] transition-all p-3 px-6 lg:p-5 rounded-lg w-full md:w-[80%] max-w-[300px] md:py-5 xl:py-7 self-center md:self-end xl:text-xl text-white"
        >
          Get Products
        </Button>
      </SignedIn>
    </>
  );
};

export default CheckoutButton;
