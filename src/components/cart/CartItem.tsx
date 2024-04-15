import Image from "next/image";
import React from "react";

import image from "../../../public/hero_3.png";
import { ImBin } from "react-icons/im";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CartItem = () => {
  return (
    <li className="w-full flex flex-row items-center border-b border-slate-500 py-2">
      <div className="flex items-center justify-center">
        <Image src={image} alt="title" className=" object-cover w-[140px]" />
      </div>
      <div className="w-3/5 ">
        <h4 className="text-lg">Nike Air Max</h4>
        <p className="text-slate-500">Mens shoes</p>
        <div className="flex flex-row items-center gap-4">
          <p className="text-slate-500">Size: 7.5</p>
          <Select>
            <SelectTrigger className="w-[60px] text-[12px]">
              <SelectValue placeholder="1" defaultValue={1} />
            </SelectTrigger>
            <SelectContent>
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
        <p className="text-xl text-[#59ab6e] font-bold">$100</p>
      </div>
      <ImBin className="text-xl mr-2 text-red-700 cursor-pointer" />
    </li>
  );
};

export default CartItem;
