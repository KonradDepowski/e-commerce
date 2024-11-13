import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { slides } from "@/lib/data";

const HomeSlider = () => {
  return (
    <div className="flex flex-col  pb-7 justify-center items-center m-auto bg-primary ">
      <Carousel className="w-screen md:w-full">
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
                    className="text-[var(--green-main)] font-bold text-2xl text-center py-3 md:text-3xl xl:text-5xl"
                  >
                    {item.title}
                    <span className="block">{item.subtitle}</span>
                  </h2>
                  <p className="p-3 text-center text-[var(--dark-500)] text-lg px-3 sm:px-8 md:text-xl xl:text-2xl">
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
  );
};

export default HomeSlider;
