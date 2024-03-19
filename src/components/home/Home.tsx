import Image from "next/image";
import image from "../../../public/hero.jpg";
import Product from "../sneakers/Product";
import Offer from "./Offer";
import image1 from "./../../../public/hero_1.png";
import image2 from "./../../../public/hero_2.png";
import image3 from "./../../../public/hero_3.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { slides } from "@/lib/data";

const HomePage = () => {
  return (
    <section className="relative md:pt-3 ">
      <div className="flex flex-col  pb-7 justify-center items-center m-auto bg-primary ">
        <Carousel className="w-full relative ">
          <CarouselContent className="h-[500px] ">
            {slides.map((item) => (
              <CarouselItem className="flex flex-col " key={item.title}>
                <div className="max-w-[1400px] m-auto flex flex-col md:flex-row-reverse items-center justify-center py-8">
                  <Image
                    className="w-[80%] max-w-[380px] md:max-w-[600px] md:w-[50%]"
                    src={item.image}
                    alt="slide"
                  />
                  <div className="w-full md:w-[50%]">
                    <h2
                      style={{
                        textShadow: "0.2px 0.2px 0.2px rgba(0,0,0,0.6)",
                      }}
                      className="text-[#59ab6e] font-bold text-2xl text-center py-3 md:text-3xl xl:text-5xl"
                    >
                      {item.title}
                      <span className="block">{item.subtitle}</span>
                    </h2>
                    <p className="p-3 text-center text-[var(--h2)] text-lg px-3 sm:px-8 md:text-xl xl:text-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="  absolute top-1/2 left-2 w-11 h-11 " />
          <CarouselNext className=" absolute top-1/2 right-2 w-11 h-11 " />
        </Carousel>
      </div>
      <div className=" p-10">
        <h2 className="text-[var(--h2)] [font-size:_clamp(15px,4vw,30px)]  pb-10 max-w-[1500px] m-auto   ">
          This Weekss Highlights
        </h2>
        <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start  gap-10 max-w-[1500px] m-auto">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
      <Offer />
    </section>
  );
};

export default HomePage;
