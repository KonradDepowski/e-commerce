import React from "react";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CartItem from "./CartItem";

const CartPage = () => {
  return (
    <section className=" pb-3 flex flex-col md:flex-row md:flex-wrap md:justify-between md:px-6 md:pt-3 md:pb-10 px-3 max-w-[1400px] m-auto md:min-h-[60vh]  ">
      <h2 className="text-center text-2xl md:text-3xl font-bold uppercase py-5 md:w-full">
        Your Cart
      </h2>
      <div className="md:w-[45%]">
        <ul
          id="scroll"
          className="list-none px-2 flex flex-col gap-3 max-h-[400px] overflow-scroll "
        >
          <CartItem />
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
          Total Amount: <span className="text-[#59ab6e]">$100</span>
        </p>
        <Button className="bg-[#59ab6e] hover:bg-[#2f6c3e] transition-all p-3 px-6 lg:p-5 rounded-lg w-full md:w-[80%] max-w-[300px] md:py-5 xl:py-7 self-center md:self-end  xl:text-xl  text-white">
          Go to Checkout
        </Button>
      </div>
    </section>
  );
};

export default CartPage;
