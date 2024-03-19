import Image from "next/image";
import React from "react";
import image from "../../../public/hero.jpg";
import { SizeForm } from "./SizeForm";
import ProductSlider from "./ProductSlider";

const ProductDetailPage = () => {
  return (
    <section className="max-w-[1500px] m-auto ">
      <div className="flex flex-col md:flex-row gap-2 ">
        <ProductSlider />
        <div className="w-full p-3 md:py-0 mb-5 md:mb-0 md:w-[50%] h-[100%]  md:h-[700px]">
          <div className="md:h-[700px] flex flex-col justify-center ">
            <h2 className="text-[#59ab6e] [font-size:_clamp(28px,4vw,65px)] font-bold capitalize  md:pb-4">
              Nike Air Max 2018
            </h2>
            <p className="font-bold text-2xl py-2 mb-2 md:text-3xl xl:text-4xl  md:pb-5 ">
              $120
            </p>
            <SizeForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
