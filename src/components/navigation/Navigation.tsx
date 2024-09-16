"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsCart3 } from "react-icons/bs";
import ThemeToggle from "../ui/ThemeToggle";
import { SheetTrigger, Sheet, SheetContent } from "@/components/ui/sheet";
import { UserButton, auth, useAuth, useClerk } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { FaRegUser } from "react-icons/fa";
import { CartContext, CartItemProps } from "@/lib/store/CartContext";
import { productSchemaType } from "@/lib/models/Product";

const Navigation = () => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const { userId } = useAuth();
  const cartCtx = useContext(CartContext);
  let cartLength = 0;
  cartItems?.forEach((el) => {
    cartLength += el.quantity!;
    return cartLength;
  });

  useEffect(() => {
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
          style={{ textShadow: "0.5px 0.5px 0.5px rgba(0,0,0,0.8)" }}
          className="font-bold text-[#59ab6e] text-2xl transition-all hover:text-[#2f6c3e]  focus:text-[#2f6c3e] "
          href="/"
        >
          MAXER
        </Link>
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <RxHamburgerMenu size={24} />
              </SheetTrigger>
              <SheetContent className="bg-white p-4 flex justify-center pt-20 ">
                <ul className="flex flex-col items-center gap-10 w-full text-slate-700">
                  <li className=" w-full text-xl text-center font-bold uppercase pb-2 border-b-2 border-dotted">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="  w-full text-xl text-center font-bold uppercase pb-2  border-b-2 border-dotted">
                    <Link href="/shop">Shop</Link>
                  </li>

                  <li className=" flex justify-center w-full text-xl text-center font-bold uppercase pb-2  border-b-2 border-dotted">
                    <Link href="/cart" className="flex gap-1">
                      <span className="text-[15px]">0</span>
                      <BsCart3 />
                    </Link>
                  </li>
                  <li className=" flex justify-center w-full text-xl text-center font-bold uppercase pb-2  border-b-2 border-dotted">
                    <Link href="/login?mode=signup">
                      <FaRegUser />
                    </Link>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <ul className="flex-row justify-between items-center hidden md:flex w-[40%] max-w-[500px]">
          <ThemeToggle />
          <li className="md:text-lg xl:text-xl text-center hover:text-[var(--link-hover)] focus:text-[var(--link-hover)]">
            <Link href="/">Home</Link>
          </li>

          <li className="md:text-lg xl:text-xl text-center hover:text-[var(--link-hover)] focus:text-[var(--link-hover)]">
            <Link href="/shop">Shop</Link>
          </li>

          <li className="md:text-lg xl:text-xl text-center hover:text-[var(--link-hover)] focus:text-[var(--link-hover)]">
            <Link
              className=" flex flex-row justify-center items-center gap-1"
              href="/cart"
            >
              <span className="text-[15px]">{cartLength}</span>
              <BsCart3 />
            </Link>
          </li>
          {!userId && (
            <li className="md:text-lg xl:text-xl text-center hover:text-[var(--link-hover)] focus:text-[var(--link-hover)]">
              <Link href="/login?mode=signup">
                <FaRegUser />
              </Link>
            </li>
          )}

          {userId && (
            <li className="md:text-lg xl:text-xl text-center hover:text-[var(--link-hover)] focus:text-[var(--link-hover)]">
              <UserButton afterSignOutUrl="/signout" />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
