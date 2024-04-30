"use client";

import { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import first from "../../../public/hero_1.png";
import second from "../../../public/hero_2.png";
import third from "../../../public/hero_3.png";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductSlider({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState();

  const imagesSlides = [
    { src: images[0], alt: "First" },
    { src: images[1], alt: "Second" },
    { src: images[2], alt: "Third" },
  ];

  return (
    <div className="py-12 w-full md:w-[50%] px-2 md:py-5 md:flex flex-col justify-center md:h-[700px]">
      <div>
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className=" w-[90%] rounded-lg h-32"
        >
          {imagesSlides.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center w-full h-[300px]  relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={200}
                  className=" w-[500px] h-[200px] "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail */}
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={12}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbs mt-3 h-32 w-[90%] rounded-lg "
        >
          {imagesSlides.map((image, index) => (
            <SwiperSlide
              className="border border-dotted border-slate-300"
              key={index}
            >
              <button className="flex items-center justify-center w-full h-full relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={200}
                  height={100}
                  className="block w-[80%] object-cover"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
