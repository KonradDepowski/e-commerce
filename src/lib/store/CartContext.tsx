"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useState } from "react";
import { updateUserCart } from "../actions/cart";
import { CartItemProps } from "../types/types";

type CartContextType = {
  items: CartItemProps[];
  totalAmount: number;
  addToCart: (item: CartItemProps) => void;
  changeAmount: (item: CartItemProps, quantity: string) => void;
  removeFromCart: (id: string) => void;
  mergeCart: (dbItems: CartItemProps[], localItems: CartItemProps[]) => void;
  clearUserCart: (id: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const calculateTotalAmount = (items: CartItemProps[]) => {
  let totalAmount = 0;
  items.forEach((item) => {
    totalAmount += (item.quantity || 1) * item.price;
  });
  return totalAmount;
};

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(() => {
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

    if (userId !== null && userId !== undefined) {
      const updateCartUserHandler = async () => {
        await updateUserCart(userId, items);
      };
      updateCartUserHandler();
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
      const newItem = { ...item, quantity: newQunatity };
      items[itemIndex] = newItem;
      setCartItems(items);
    }

    setTotalAmount((prev) => prev - +item.price * item.quantity!);
    setTotalAmount((prev) => prev + +item.price * newQunatity);
    localStorage.setItem("cart", JSON.stringify(items));
    localStorage.setItem(
      "totalAmount",
      JSON.stringify(
        totalAmount - +item.price * item.quantity! + +item.price * newQunatity!
      )
    );

    if (userId !== null && userId !== undefined) {
      const updateCartUserHandler = async () => {
        await updateUserCart(userId, items);
      };
      updateCartUserHandler();
    }
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
      if (userId !== null && userId !== undefined) {
        const updateCartUserHandler = async () => {
          await updateUserCart(userId, items);
        };
        updateCartUserHandler();
      }
    }

    if (userId !== null && userId !== undefined) {
      const updateCartUserHandler = async () => {
        await updateUserCart(userId, items);
      };
      updateCartUserHandler();
    }

    localStorage.setItem("cart", JSON.stringify(items));
    localStorage.setItem(
      "totalAmount",
      JSON.stringify(totalAmount - +item.price * 1)
    );
  };

  const mergeCartHandler = (
    dbItems: CartItemProps[],
    localItems: CartItemProps[]
  ) => {
 
    if (localItems.length > 0) {
      localItems.forEach((localItem) => {
        let itemIndex = dbItems.findIndex(
          (dbItem) =>
            dbItem.id === localItem.id &&
            dbItem.size === localItem.size &&
            dbItem.quantity === localItem.quantity
        );
        if (itemIndex >= 0) {
          dbItems[itemIndex].quantity! = dbItems[itemIndex].quantity!;
        } else {
          dbItems.push({ ...localItem, quantity: 1 });
        }
      });

      setCartItems(dbItems);
      const totalAmount = calculateTotalAmount(dbItems);
      setTotalAmount(totalAmount);
      localStorage.setItem("cart", JSON.stringify(dbItems));
      localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
      return;
    } else if (dbItems.length > 0 && localItems.length <= 0) {
      setCartItems(dbItems);
      const totalAmount = calculateTotalAmount(dbItems);
      setTotalAmount(totalAmount);
      localStorage.setItem("cart", JSON.stringify(dbItems));
      localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    }
  };

  const clearUserCartHandler = (id: string) => {
    const clearUserCart = async () => {
      await updateUserCart(id, []);
    };
    clearUserCart();

    localStorage.removeItem("cart");
    localStorage.removeItem("totalAmount");
  };
  const clearCartHandler = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("totalAmount");
    setCartItems([]);
  };
  const value: CartContextType = {
    items: cartItems,
    totalAmount: totalAmount,
    addToCart: addToCartHandler,
    changeAmount: changeAmountHandler,
    removeFromCart: removeFromCartHandler,
    mergeCart: mergeCartHandler,
    clearUserCart: clearUserCartHandler,
    clearCart: clearCartHandler,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
