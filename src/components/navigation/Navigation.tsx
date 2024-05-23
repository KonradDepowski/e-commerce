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
import { addProduct } from "@/lib/actions/product";

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

  const addToDB = () => {
    console.log("ez");

    addProduct({
      name: "Nike Air Max",
      category: "lifestyle",
      sex: "unisex",
      price: 100,
      images: [
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/nike1%20(1).jpg?alt=media&token=56f14879-00fa-4f57-a7bc-f8633bb6392d",
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/nike1%20(3).jpg?alt=media&token=973c72e5-1926-4b36-af44-7316d63bb122",
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/nike2.jpg?alt=media&token=911aa908-d848-4e90-a297-8d4eb00a440c",
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/nike4.png?alt=media&token=ad002bb5-cd19-438f-bf8d-995099344a8f",
      ],
      offer: true,
    });
  };

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
          <button
            onClick={addToDB}
            className="md:text-lg xl:text-xl text-center hover:text-[var(--link-hover)] focus:text-[var(--link-hover)]"
          >
            Add
          </button>
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
