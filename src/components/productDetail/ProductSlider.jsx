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

export default function ProductSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images = [
    { src: first, alt: "First" },
    { src: second, alt: "Second" },
    { src: third, alt: "Third" },
  ];

  return (
    <section className="py-12 w-full md:w-[50%] md:py-5 md:flex md:flex-col md:justify-center md:h-[700px]">
      <div className="">
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className=" w-[90%] rounded-lg"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex  items-center justify-center">
                <Image
                  src={image.src}
                  alt={image.alt}
                  className="block h-full  w-full"
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
          className="thumbs mt-3 h-32 w-[90%] rounded-lg"
        >
          {images.map((image, index) => (
            <SwiperSlide
              className={`border-2 border-dotted  border-slate-300`}
              key={index}
            >
              <button className="flex items-center justify-center w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  className="block w-[80%] object-cover"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
