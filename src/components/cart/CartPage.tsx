"use client";
import React, { useContext, useEffect, useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CartItem from "./CartItem";
import { CartContext } from "@/lib/store/CartContext";
import { useAuth, useUser } from "@clerk/nextjs";
import { fetchUserCart, findDiscountCode } from "@/lib/actions/cart";
import DeliveryForm from "./DeliveryForm";
import Image from "next/image";
import image from "../../../public/assets/cart.png";
import Loader from "../Loader/Loader";
import { toast } from "sonner";
import { CartItemProps, CartItemsIds } from "@/lib/types/types";

const CartPage = () => {
  const cartCtx = useContext(CartContext);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number | undefined>(
    undefined,
  );
  const [bonusMode, setBonusMode] = useState<boolean>(false);
  const [bonusAmount, setBonusAmount] = useState<number | undefined>(undefined);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else if (cartCtx?.items) {
      setCartItems(cartCtx.items);
    }

    const storedTotalAmount = localStorage.getItem("totalAmount");
    if (storedTotalAmount) {
      const parsed = JSON.parse(storedTotalAmount);
      setTotalAmount(parsed);
      setBonusAmount(parsed);
    } else {
      setTotalAmount(cartCtx?.totalAmount);
      setBonusAmount(cartCtx?.totalAmount);
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
          cartCtx?.mergeCart(
            [...cart],
            JSON.parse(localStorage.getItem("cart")!) || [],
          );
        }
        setIsLoading(false);
      }
    };

    loadCart();
  }, [userId]);

  const checkDiscountCodeHandler = async () => {
    setDiscountError(null);

    if (!totalAmount && totalAmount !== 0) {
      toast.error("Total amount not ready yet");
      return;
    }

    if (bonusMode) {
      setBonusMode(false);
      setDiscountCode("");
      setDiscountAmount(undefined);
      setTotalAmount(bonusAmount ?? totalAmount);
      return;
    }

    const normalizedCode = discountCode.trim().toUpperCase();
    if (!normalizedCode) {
      setDiscountError("Enter a code");
      return;
    }

    setBonusAmount(totalAmount);
    const discount = await findDiscountCode(normalizedCode);
    if (!discount) {
      setDiscountError("Code not found!");
      toast.error("Code not found");
      return;
    }

    const amount = discount.amount;
    setDiscountAmount(amount);
    const totalAmountAfterDisc = totalAmount - (totalAmount * amount) / 100;
    setTotalAmount(totalAmountAfterDisc);
    setBonusMode(true);
  };

  const cartItemsIds: CartItemsIds[] = [];
  cartCtx?.items.forEach((it) =>
    cartItemsIds.push({
      id: it.id,
      size: it.size,
      quantity: it.quantity!,
      price: it.price,
    }),
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
                category={item.category}
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
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
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
            {discountError && (
              <p className="text-[var(--error)] font-bold text-md  p-3">
                {discountError}
              </p>
            )}
            {discountAmount !== undefined && (
              <p className="font-bold text-md text-[var(--purple)] py-3">
                Current Code: {discountAmount}%
              </p>
            )}
          </form>
          <DeliveryForm
            discount={
              discountAmount !== undefined ? String(discountAmount) : ""
            }
            buyerAvatar={user?.imageUrl!}
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
