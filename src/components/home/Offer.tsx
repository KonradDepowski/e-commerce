"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { fetchOfferProduct, updateOfferProduct } from "@/lib/actions/product";
import Link from "next/link";
import Loader from "../Loader/Loader";
import CountDownOffer from "./CountDownOffer";
import { useOfferContext } from "@/lib/store/OfferProductContext";
import { productSchemaType } from "@/lib/types/types";

const Offer = () => {
  const [data, setData] = useState<productSchemaType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const offerCtx = useOfferContext();
  const updateOfferDataHnndler = async () => {
    setIsLoading(true);
    const data = await updateOfferProduct();
    setData(data!);
    setIsLoading(false);
    localStorage.removeItem("countdown_target_time");
    offerCtx.changeOfferStatus(false);
  };

  useEffect(() => {
    if (offerCtx?.refetchOffer) {
      updateOfferDataHnndler();
    }
  }, [offerCtx.refetchOffer]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchOfferProduct();
      setData(data!);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[var(--color)] ">
      <div className="p-3 flex flex-col md:flex-row-reverse md:justify-around md:items-center overflow-hidden max-w-[1500px] m-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="relative flex justify-center md:justify-end md:w-[50%]">
              <Image
                className="w-[80%] md:w-[100%] max-w-[450px] md:max-w-[700px] max-h-[600px] object-cover"
                src={data?.images[1]!}
                alt="offer"
                width={500}
                height={500}
              />
              <div className="absolute top-[-10px] md:top-[30%] left-[-10px] md:left-[25%] bg-blue-100 blur-3xl md:blur-[73px] w-[130px] h-[130px] rounded-full"></div>
              <div className="absolute bottom-[-10px] md:bottom-[20%] right-[-10px] md:right-[20%] bg-blue-200 blur-3xl w-[100px] md:w-[130px] h-[100px] md:h-[130px] rounded-full"></div>
            </div>
            <div className="flex flex-col md:w-[50%] p-2">
              <h2 className="[font-size:_clamp(16px,3vw,26px)] font-normal uppercase text-[var(--dark-500)] py-3 lg:mb-3">
                Deal of the day
              </h2>
              <CountDownOffer />
              <h3
                style={{
                  textShadow: "0.2px 0.2px 0.2px rgba(0,0,0,0.6)",
                }}
                className="py-4 [font-size:_clamp(25px,4vw,55px)] font-bold capitalize text-[var(--green-main)]"
              >
                {data?.name}
              </h3>
              <div className="py-1 pb-4 w-[150px] flex gap-x-4">
                <span className="[font-size:_clamp(25px,4vw,35px)] text-[var(--error)] font-bold">
                  ${data!?.price * 0.8}
                </span>
                <p className="[font-size:_clamp(20px,4vw,30px)] align-middle flex justify-center items-center text-slate-400 line-through">
                  ${data?.price}
                </p>
              </div>
              <Link
                href={`productId=${data?._id}`}
                className="bg-[var(--green-main)] hover:bg-[var(--green-main-hover)] transition-all w-[150px] lg:w-[300px] p-3 lg:p-5 rounded-lg flex items-center justify-center gap-3 lg:gap-6"
              >
                <BsCart3 className="text-md lg:text-3xl text-white" />
                <p className="font-bold lg:text-2xl text-white">See Details</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Offer;
