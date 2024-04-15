import Image from "next/image";
import React from "react";

import { SizeForm } from "./SizeForm";
import ProductSlider from "./ProductSlider";
import { log } from "console";
import { fetchProduct } from "@/lib/actions/product";

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const prodId = params.id.slice(12, params.id.length);

  const product = await fetchProduct(prodId);

  return (
    <section className="max-w-[1500px] m-auto ">
      <div className="flex flex-col md:flex-row gap-2 ">
        <ProductSlider images={product.images} />
        <div className="w-full p-3 md:py-0 mb-5 md:mb-0 md:w-[50%] h-[100%]  md:h-[700px]">
          <div className="md:h-[700px] flex flex-col justify-center ">
            <h2 className="text-[#59ab6e] [font-size:_clamp(28px,4vw,65px)] font-bold capitalize  md:pb-4">
              {product?.name}
            </h2>
            <p className="font-bold text-2xl py-2 mb-2 md:text-3xl xl:text-4xl  md:pb-5 ">
              ${product?.price}
            </p>
            <SizeForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
