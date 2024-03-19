import Image from "next/image";
import React from "react";
import image from "../../../public/offer.png";
import { BsCart3 } from "react-icons/bs";

const Offer = () => {
  return (
    <div className=" bg-primary">
      <div className="p-3 flex flex-col md:flex-row-reverse md:justify-around md:items-center overflow-hidden  max-w-[1500px] m-auto">
        <div className="relative flex justify-center md:justify-end md:w-[50%] ">
          <Image
            className=" w-[80%] md:w-[100%] max-w-[450px] md:max-w-[700px]"
            src={image}
            alt="offer"
          />
          <div className="absolute top-[-10px] md:top-[30%] left-[-10px] md:left-[25%]  bg-blue-100 blur-3xl md:blur-[73px] w-[130px] h-[130px] rounded-full"></div>
          <div className="absolute bottom-[-10px] md:bottom-[20%] right-[-10px] md:right-[20%] bg-blue-200 blur-3xl  w-[100px] md:w-[130px] h-[100px] md:h-[130px] rounded-full"></div>
        </div>
        <div className="flex flex-col md:w-[50%] p-2 ">
          <h2 className="[font-size:_clamp(16px,3vw,26px)] font-normal uppercase text-[var(--h2)] py-3 lg:mb-3">
            Deal of the day
          </h2>
          <div className="flex flex-row  gap-4 w-full ">
            <div className="bg-[#fff] w-[30%] max-w-[180px] h-[90px] lg:h-[100px] rounded-xl flex flex-col justify-center gap-2 items-center">
              <span className="text-black text-2xl lg:text-3xl font-bold">
                22
              </span>
              <span className="text-slate-600 lg:text-lg">Hours</span>
            </div>
            <div className="bg-[#fff] w-[30%] max-w-[180px] h-[90px] lg:h-[100px] rounded-xl flex flex-col justify-center gap-2 items-center">
              <span className="text-black text-2xl lg:text-3xl font-bold">
                12
              </span>
              <span className="text-slate-600 lg:text-lg">Minutes</span>
            </div>
            <div className="bg-[#fff] w-[30%] max-w-[180px] h-[90px] lg:h-[100px] rounded-xl flex flex-col justify-center gap-2 items-center">
              <span className="text-black text-2xl lg:text-3xl font-bold">
                52
              </span>
              <span className="text-slate-600 lg:text-lg">Seconds</span>
            </div>
          </div>
          <h3
            style={{
              textShadow: "0.2px 0.2px 0.2px rgba(0,0,0,0.6)",
            }}
            className="py-4 [font-size:_clamp(25px,4vw,55px)] font-bold capitalize text-[#59ab6e]"
          >
            Nike air max 2018
          </h3>
          <div className=" py-1 pb-4 w-[150px] flex  gap-x-4">
            <span className="[font-size:_clamp(25px,4vw,35px)] text-[#a04b4b] font-bold">
              $120
            </span>
            <p className="[font-size:_clamp(20px,4vw,30px)] align-middle flex justify-center items-center  text-slate-400 line-through ">
              $500
            </p>
          </div>
          <button className="bg-[#59ab6e] hover:bg-[#2f6c3e] transition-all w-[150px] lg:w-[300px] p-3 lg:p-5 rounded-lg flex items-center justify-center gap-3 lg:gap-6">
            <BsCart3 className="text-md lg:text-3xl text-white" />
            <p className="font-bold lg:text-2xl text-white">Add to cart</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;