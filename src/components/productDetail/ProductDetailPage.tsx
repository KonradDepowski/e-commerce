import React from "react";
import { SizeForm } from "./SizeForm";
import { fetchProduct } from "@/lib/actions/product";
import EmblaCarousel from "../swiper/EmblaCarousel";
import { notFound } from "next/navigation";

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const prodId = params.id.slice(12, params.id.length);
  const OPTIONS = {};
  const product = await fetchProduct(prodId);

  if (!product) {
    return notFound();
  }
  let price = product.price;
  if (product?.offer) {
    price = product.price * 0.8;
  }

  return (
    <section className="max-w-[1500px] m-auto ">
      <div className="flex flex-col md:flex-row gap-14 ">
        <EmblaCarousel slides={product?.images} options={OPTIONS} />
        <div className="w-full p-3 md:py-0 mb-5 md:mb-0 md:w-[50%] h-[100%]  md:h-[700px]">
          <div className="md:h-[700px] flex flex-col justify-center ">
            <h2 className="text-[var(--green-main)] [font-size:_clamp(28px,4vw,55px)] font-bold capitalize  md:pb-4">
              {product?.name}
            </h2>
            <p className="font-bold text-2xl py-2 mb-2 md:text-3xl xl:text-4xl  md:pb-5 ">
              ${price}
            </p>
            <SizeForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
