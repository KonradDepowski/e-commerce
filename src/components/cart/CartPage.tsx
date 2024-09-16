"use client";
import React, { useContext, useEffect, useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CartItem from "./CartItem";
import { CartContext, CartItemProps } from "@/lib/store/CartContext";
import { useAuth } from "@clerk/nextjs";
import { fetchUserCart, findDiscountCode } from "@/lib/actions/cart";
import CheckoutButton from "../checkout/CheckoutButton";

const CartPage = () => {
  const cartCtx = useContext(CartContext);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [bonusMode, setBonusMode] = useState<boolean>(false);
  const [bonusAmount, setBonusAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number | undefined>();

  const { userId } = useAuth();

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
  }, [cartCtx, userId]);
  useEffect(() => {
    const fetchCartHandler = async () => {
      const cart = await fetchUserCart(userId!);
      return cart;
    };

    const loadCart = async () => {
      if (userId) {
        const cart = await fetchCartHandler();
        if (cart) {
          console.log(cart);
          console.log(cartItems);
          cartCtx?.mergeCart(
            [...cart],
            JSON.parse(localStorage.getItem("cart")!) || []
          );
        }
      }
    };

    loadCart();
  }, [userId]);

  const checkDiscountCodeHandler = async () => {
    setBonusMode((prev) => !prev);
    if (!bonusMode) {
      const discount = await findDiscountCode(discountCode);
      if (discount) {
        const amount = discount.amount;
        setBonusAmount(totalAmount!);
        const totalAmountAfterDisc =
          totalAmount! - (totalAmount! * +amount) / 100;
        setTotalAmount(totalAmountAfterDisc);
      }
    } else {
      setDiscountCode("");
      setTotalAmount(bonusAmount);
    }
  };

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
              onChange={(e) => setDiscountCode(e.target.value)}
              value={discountCode}
            />
            <Button
              type="button"
              onClick={checkDiscountCodeHandler}
              className={` ${
                bonusMode
                  ? "dark:bg-red-800 dark:hover:bg-red-900"
                  : "dark:bg-gray-800 dark:hover:bg-gray-900"
              } transition-all p-3 px-6 lg:p-5 rounded-lg w-[30%] xl:text-xl text-[var(--color)]`}
            >
              {bonusMode ? "Remove" : "Add"}
            </Button>
          </div>
        </form>

        <p className="self-end text-xl pr-2 py-6 font-bold xl:text-2xl">
          Total Amount:
          <span className="text-[#59ab6e]">${totalAmount}</span>
        </p>
        <CheckoutButton products={cartCtx?.items! || []} totalAmount={totalAmount!} />
      </div>
    </section>
  );
};

export default CartPage;
