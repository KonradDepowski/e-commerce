import slide1 from "@/../public/hero_1.png";
import slide2 from "@/../public/hero_2.png";
import slide3 from "@/../public/hero_3.png";
import { StaticImageData } from "next/image";

export type filterDataType = {
  title: string;
  items: string[] | number[];
};

export type slidesType = {
  title: string;
  subtitle: string;
  description: string;
  image: StaticImageData;
};

export const filterTypeData: filterDataType[] = [
  {
    title: "Filter by Categories",
    items: ["Lifestyle", "Sneakers", "Football", "Running"],
  },
  {
    title: "Filter by Size",
    items: [6.5, 7, 7.5, 8, 8.5, 9, 9.5],
  },
  {
    title: "Filter by Sex",
    items: ["Men", "Women", "Unisex"],
  },
  {
    title: "Filter by Price",
    items: ["Below $50", "$50-$75", "$75-$100", "Over $100"],
  },
];

export const slides: slidesType[] = [
  {
    title: "Exclusive Footwear",
    subtitle: "Limited Edition",
    description:
      "Crafted with meticulous attention to detail and using only the finest materials, each pair embodies sophistication and exclusivity.",
    image: slide1,
  },
  {
    title: "The Most Thoughtfully",
    subtitle: "Designed Sneakers",
    description:
      " Engineered for durability and built for performance, they provide the perfect balance of fashion and functionality.",
    image: slide2,
  },
  {
    title: "Your Premier Destination",
    subtitle: "for Sneaker Obsession",
    description:
      "Elevate your footwear collection with our limited edition designs, showcasing exquisite craftsmanship and timeless elegance.",
    image: slide3,
  },
];
