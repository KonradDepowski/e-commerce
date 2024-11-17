"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { CartContext, CartItemProps } from "@/lib/store/CartContext";

import NarrowNav from "./NarrowNav";
import WideNav from "./WideNav";

const Navigation = () => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const { userId } = useAuth();
  const { user } = useUser();
  const cartCtx = useContext(CartContext);
  let cartLength = 0;
  cartItems?.forEach((el) => {
    cartLength += el.quantity!;
    return cartLength;
  });

  useEffect(() => {
    console.log("zmiana");

    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else if (cartCtx?.items) {
      setCartItems(cartCtx.items);
    }
  }, [cartCtx]);

  return (
    <nav className="py-3">
      <div className="w-full flex flex-row justify-between max-w-[1500px] p-3 items-center md:px-7 xl:px-10 md:py-4 m-auto">
        <Link
          className="font-bold text-[var(--green-main)] text-2xl transition-all hover:text-[#2f6c3e] "
          href="/"
        >
          MAXER
        </Link>
        <NarrowNav userId={userId!} />
        <WideNav cartLength={cartLength} userId={userId!} user={user!} />
      </div>
    </nav>
  );
};

export default Navigation;
