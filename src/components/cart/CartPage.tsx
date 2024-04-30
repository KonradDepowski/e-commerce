"use client";
import React, { useContext, useEffect, useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CartItem from "./CartItem";
import { CartContext, CartItemProps } from "@/lib/store/CartContext";

const CartPage = () => {
  const cartCtx = useContext(CartContext);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [totalAmount, setTotalAmount] = useState<number | undefined>();

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else if (cartCtx?.items) {
      setCartItems(cartCtx.items);
    }

    const storedTotalAmount = localStorage.getItem("totalAmount");
    if (storedTotalAmount) {
      setTotalAmount(JSON.parse(storedTotalAmount));
    } else {
      setTotalAmount(cartCtx?.totalAmount);
    }
  }, [cartCtx]);

  return (
    <section className=" pb-3 flex flex-col md:flex-row md:flex-wrap md:justify-between md:px-6 md:pt-3 md:pb-10 px-3 max-w-[1400px] m-auto md:min-h-[60vh]  ">
      <h2 className="text-center text-2xl md:text-3xl font-bold uppercase py-5 md:w-full">
        Your Cart
      </h2>
      <div className="md:w-[45%]">
        <ul
          id="scroll"
          className="list-none px-2 flex flex-col justify-center items-center gap-3 max-h-[400px] overflow-scroll "
        >
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              size={item.size}
            />
          ))}
          {cartCtx!?.items.length === 0 && (
            <p className="text-lg">Your cart is empty</p>
          )}
        </ul>
      </div>
      <div className="md:w-[45%] md:flex md:flex-col">
        <form className="py-2">
          <h3 className=" py-3 md:pt-0 text-lg">Discount code</h3>
          <div className="flex flex-row gap-3">
            <Input
              className="w-1/2 lg:p-5"
              type="text"
              placeholder="Enter a code"
            />
            <Button
              className=" dark:bg-gray-800 dark:hover:bg-gray-900 transition-all p-3 px-6 lg:p-5 rounded-lg w-[30%] xl:text-xl  text-[var(--color)]"
              type="submit"
            >
              Add
            </Button>
          </div>
        </form>

        <p className="self-end text-xl pr-2 py-6 font-bold xl:text-2xl">
          Total Amount:
          <span className="text-[#59ab6e]">${totalAmount}</span>
        </p>
        <Button className="bg-[#59ab6e] hover:bg-[#2f6c3e] transition-all p-3 px-6 lg:p-5 rounded-lg w-full md:w-[80%] max-w-[300px] md:py-5 xl:py-7 self-center md:self-end  xl:text-xl  text-white">
          Go to Checkout
        </Button>
      </div>
    </section>
  );
};

export default CartPage;
