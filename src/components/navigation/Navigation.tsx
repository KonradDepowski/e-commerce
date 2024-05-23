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
      name: "Air Jordan 1 Mid",
      category: "sneakers",
      sex: "men",
      price: 200,
      images: [
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/b1.jpg?alt=media&token=17383e85-a2e2-4e27-9a7f-e124bd8a6868",
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/b2.jpg?alt=media&token=fa044a9c-54c4-4d6f-a5b5-140e9dfd14ee",
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/b3.jpg?alt=media&token=60608c5a-205f-4f35-914b-340d89c00c28",
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/b1.jpg?alt=media&token=17383e85-a2e2-4e27-9a7f-e124bd8a6868",
      ],
      offer: false,
    });

    addProduct({
      name: "Nike Attack",
      category: "lifestyle",
      sex: "unisex",
      price: 60,
      images: [
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/o1.jpg?alt=media&token=8328fce4-9514-48f2-8e1e-b9b4e9c06052",
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/o2.jpg?alt=media&token=3073cfa7-ca5d-40ce-aca5-dc9c1430ec5c",
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/o3.jpg?alt=media&token=a5218f76-3ec6-4791-acb4-6f6876dde2eb",
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/o4.png?alt=media&token=e4f32c49-a1b1-4507-a97f-40b82cf52451",
      ],
      offer: false,
    });
    setTimeout(() => {
      addProduct({
        name: "Air Jordan 1 Hi FlyEase",
        category: "sneakers",
        sex: "men",
        price: 105,
        images: [
          "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/p1.jpg?alt=media&token=2b53f303-5464-45f2-b7a8-cfcd6c2dd908",
          "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/p2.jpg?alt=media&token=ad6d599b-7b04-441c-aefb-8fa91b43cff8",
          "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/p3.jpg?alt=media&token=762089d6-8538-4d22-ab04-1d936307a522",
          "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/p4.png?alt=media&token=a12c60fe-583f-40c3-9312-52df6e157aff",
        ],
        offer: false,
      });
    }, 1000);

    setTimeout(() => {
      addProduct({
        name: "Converse Chuck Taylor",
        category: "lifestyle",
        sex: "women",
        price: 30,
        images: [
          "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/q1.jpg?alt=media&token=57ac9fc3-08f1-451e-9735-044054609934",
          "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/q2.jpg?alt=media&token=163c36b8-6c40-4f46-990a-4062da1705c8",
          "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/q3.jpg?alt=media&token=ac971588-c514-4f8f-8a29-3d90f37368ad",
          "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/q4.png?alt=media&token=3a719240-a4a2-4fab-bc69-070e70818c78",
        ],
        offer: false,
      });
    }, 2000);
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
