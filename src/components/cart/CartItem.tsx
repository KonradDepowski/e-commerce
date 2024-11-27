"use client";
import Image from "next/image";
import React, { useContext } from "react";

import { ImBin } from "react-icons/im";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CartContext } from "@/lib/store/CartContext";
import { CartItemProps } from "@/lib/types/types";

const CartItem = ({
  id,
  title,
  size,
  price,
  quantity,
  image,
  category,
}: CartItemProps) => {
  const cartCtx = useContext(CartContext);

  const item = {
    id,
    title,
    size,
    price,
    quantity,
    image,
    category,
  };

  const changeAmountHandler = (value: string) => {
    cartCtx?.changeAmount(item, value);
  };
  const itemQuantity = cartCtx?.items.find((it) => it.id === id);

  return (
    <li
      key={id}
      className="w-full flex flex-row items-center border-b border-slate-500 py-2"
    >
      <div className="flex items-center justify-center mr-3 w-[80px] h-[100px] ">
        <Image
          width={80}
          height={80}
          src={image[0]}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-3/5 ">
        <h4 className="text-lg">{title}</h4>
        <p className="text-slate-500 capitalize pb-1">{category} shoes</p>
        <div className="flex flex-row items-center gap-4">
          <p className="text-slate-500">Size: {size}</p>
          <Select onValueChange={changeAmountHandler}>
            <SelectTrigger className="w-[60px] text-[12px]">
              <SelectValue
                placeholder={quantity}
                defaultValue={itemQuantity?.quantity}
                aria-valuenow={itemQuantity?.quantity}
              />
            </SelectTrigger>
            <SelectContent className="bg-primary">
              <SelectItem className="text-[12px]" value="1">
                1
              </SelectItem>
              <SelectItem className="text-[12px]" value="2">
                2
              </SelectItem>
              <SelectItem className="text-[12px]" value="3">
                3
              </SelectItem>
              <SelectItem className="text-[12px]" value="4">
                4
              </SelectItem>
              <SelectItem className="text-[12px]" value="5">
                5
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-xl text-[var(--green-main)] font-bold">${price}</p>
      </div>
      <ImBin
        onClick={() => cartCtx?.removeFromCart(id)}
        className="text-xl mr-2 text-red-700 hover:text-red-800 cursor-pointer"
      />
    </li>
  );
};

export default CartItem;
