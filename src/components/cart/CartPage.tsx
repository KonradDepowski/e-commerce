"use client";
import React, { useContext, useEffect, useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CartItem from "./CartItem";
import { CartContext, CartItemProps } from "@/lib/store/CartContext";
import { useAuth } from "@clerk/nextjs";
import { fetchUserCart, findDiscountCode } from "@/lib/actions/cart";
import DeliveryForm from "./DeliveryForm";
import Image from "next/image";
import image from "../../../public/assets/cart.png";
import Loader from "../Loader/Loader";

const CartPage = () => {
  const cartCtx = useContext(CartContext);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [bonusMode, setBonusMode] = useState<boolean>(false);
  const [bonusAmount, setBonusAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
  }, [cartCtx, userId]);
  useEffect(() => {
    const fetchCartHandler = async () => {
      const cart = await fetchUserCart(userId!);
      return cart;
    };

    const loadCart = async () => {
      if (userId) {
        setIsLoading(true);
        const cart = await fetchCartHandler();
        if (cart) {
          console.log(cart);
          console.log(cartItems);
          cartCtx?.mergeCart(
            [...cart],
            JSON.parse(localStorage.getItem("cart")!) || []
          );
        }
        setIsLoading(false);
      }
    };

    loadCart();
  }, [userId]);

  const checkDiscountCodeHandler = async () => {
    setBonusMode((prev) => !prev);
    setBonusAmount(totalAmount!);
    if (!bonusMode) {
      const discount = await findDiscountCode(discountCode);
      if (discount) {
        const amount = discount.amount;

        const totalAmountAfterDisc =
          totalAmount! - (totalAmount! * +amount) / 100;
        setTotalAmount(totalAmountAfterDisc);
      }
    } else {
      setDiscountCode("");
      setTotalAmount(bonusAmount);
    }
  };

  const cartItemsIds: Object[] = [];
  cartCtx?.items.forEach((it) =>
    cartItemsIds.push({ id: it.id, size: it.size, quantity: it.quantity })
  );

  return (
    <section className=" pb-3 flex flex-col md:flex-row md:flex-wrap md:justify-between md:px-6 md:pt-3 md:pb-10 px-3 w-full max-w-[1400px] m-auto min-h-[40vh] md:min-h-[60vh]  ">
      <h2 className="text-center text-2xl md:text-3xl font-bold uppercase py-5 md:w-full">
        Your Cart
      </h2>
      {cartItems.length === 0 && isLoading && <Loader />}
      {cartItems.length === 0 && !isLoading && (
        <div className="w-full flex flex-col items-center">
          <Image
            className="w-[200px] xl:w-[300px]"
            src={image}
            alt="carticon"
          />
          <p className="text-md md:text-xl text-center pt-3 text-[var(--dark-500)]">
            Your Cart is Empty{" "}
            <span className="block">Go to shop and add some products</span>
          </p>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="md:w-[45%]">
          <ul
            id="scroll"
            className="list-none px-2 flex flex-col justify-start items-center space-y-3 max-h-[500px] overflow-y-scroll"
            style={{ scrollBehavior: "smooth" }} // Optional: Smooth scrolling
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
          </ul>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="md:w-[45%] md:flex md:flex-col">
          <form className="py-6">
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
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[var(--green-main)] hover:bg-[var(--green-main-hover)]"
                } transition-all p-3 px-6 lg:p-5 rounded-lg w-[30%] xl:text-xl text-white`}
              >
                {bonusMode ? "Remove" : "Add"}
              </Button>
            </div>
            {bonusMode && discountCode == "" && (
              <p className="text-red-600 font-bold text-md  p-3">
                Code not found!
              </p>
            )}
          </form>
          <DeliveryForm
            totalAmount={totalAmount!}
            cartItemsIds={cartItemsIds!}
            userId={userId!}
          />
        </div>
      )}
    </section>
  );
};

export default CartPage;
