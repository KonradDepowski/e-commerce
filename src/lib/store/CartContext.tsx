"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useState } from "react";
import { updateUserCart } from "../actions/cart";

export type CartItemProps = {
  id: string;
  title: string;
  price: number;
  size: string;
  quantity?: number;
  image: string;
};

type CartContextType = {
  items: CartItemProps[];
  totalAmount: number;
  addToCart: (item: CartItemProps) => void;
  changeAmount: (item: CartItemProps, quantity: string) => void;
  removeFromCart: (id: string) => void;
};

type ProviderType = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const CartContextProvider = ({ children }: ProviderType) => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [totalAmount, setTotalAmount] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(JSON.parse(localStorage.getItem("totalAmount")!) || 0);
    } else {
      return 0;
    }
  });
  const router = useRouter();
  const { userId } = useAuth();

  const addToCartHandler = (item: CartItemProps) => {
    let items: CartItemProps[] = JSON.parse(localStorage.getItem("cart")!) || [
      ...cartItems,
    ];
    let itemIndex = items.findIndex(
      (it: CartItemProps) => it.id === item.id && it.size === item.size
    );
    let newQunatity = 1;
    if (itemIndex >= 0) {
      let item: CartItemProps = items[itemIndex];
      const newItem = { ...item, quantity: item?.quantity! + newQunatity };
      items[itemIndex] = newItem;
      setCartItems(items);
    } else {
      items.push({ ...item, quantity: newQunatity });
      setCartItems(items);
    }
    setTotalAmount((prev) => prev + +item.price);
    localStorage.setItem("cart", JSON.stringify(items));
    localStorage.setItem(
      "totalAmount",
      JSON.stringify(totalAmount + +item.price)
    );

    if (userId) {
      updateUserCart(userId, items);
    }

    router.push("/cart");
  };

  const changeAmountHandler = (item: CartItemProps, quantity: string) => {
    let items: CartItemProps[] = JSON.parse(localStorage.getItem("cart")!) || [
      ...cartItems,
    ];

    let itemIndex = items.findIndex(
      (it: CartItemProps) => it.id === item.id && it.size === item.size
    );

    let newQunatity = +quantity;
    if (itemIndex >= 0) {
      let item: CartItemProps = items[itemIndex];
      console.log(item);

      const newItem = { ...item, quantity: newQunatity };
      console.log(newItem);

      items[itemIndex] = newItem;
      console.log(newQunatity);
      console.log(item.quantity);

      setCartItems(items);
    }

    console.log(totalAmount);

    setTotalAmount((prev) => prev - +item.price * item.quantity!);
    setTotalAmount((prev) => prev + +item.price * newQunatity);
    localStorage.setItem("cart", JSON.stringify(items));
    localStorage.setItem(
      "totalAmount",
      JSON.stringify(
        totalAmount - +item.price * item.quantity! + +item.price * newQunatity!
      )
    );
  };
  const removeFromCartHandler = (id: string) => {
    let items: CartItemProps[] = JSON.parse(localStorage.getItem("cart")!) || [
      ...cartItems,
    ];
    let itemIndex = items.findIndex((it: CartItemProps) => it.id === id);
    let newQunatity = 1;
    let item: CartItemProps = items[itemIndex];

    if (item.quantity! > 1) {
      const newItem = { ...item, quantity: item?.quantity! - newQunatity };
      items[itemIndex] = newItem;
      setCartItems(items);
      setTotalAmount((prev) => prev - item.price);
    } else {
      items = items.filter((item) => item.id !== id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      setTotalAmount((prev) => prev - item.price * item.quantity!);
    }
    localStorage.setItem("cart", JSON.stringify(items));
    localStorage.setItem(
      "totalAmount",
      JSON.stringify(totalAmount + -item.price * item.quantity!)
    );
  };

  const value: CartContextType = {
    items: cartItems,
    totalAmount: totalAmount,
    addToCart: addToCartHandler,
    changeAmount: changeAmountHandler,
    removeFromCart: removeFromCartHandler,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
