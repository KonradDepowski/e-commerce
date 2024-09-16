import React from "react";
import { Button } from "../ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { IoFilterSharp } from "react-icons/io5";
import { filterTypeData } from "@/lib/data";
import Filter from "./Filter";
import Product from "../sneakers/Product";
import { log } from "console";
import { fetchSortProducts } from "@/lib/actions/product";
import Sorting from "./Sorting";

const ShopPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  let sortingMode = searchParams?.sorting || "";
  let category = searchParams?.category || "";
  let sex = searchParams?.sex || "";
  let price = searchParams?.price || "";
  let filterMode = { category, sex, price };

  const products = await fetchSortProducts(sortingMode, filterMode);

  return (
    <section className="p-3 max-w-[1500px] m-auto ">
      <h1
        style={{
          textShadow: "0.2px 0.2px 0.2px rgba(0,0,0,0.6)",
        }}
        className="[font-size:_clamp(25px,4vw,70px)] font-bold p-3 text-center text-[#59ab6e] uppercase"
      >
        Our Products
      </h1>
      <p className="text-center uppercase font-thin text-slate-400 [font-size:_clamp(12px,4vw,20px)]">
        Welcome to Maxer Shop
      </p>
      <div className="flex flex-row flex-wrap justify-center gap-5 py-7  ">
        <div className="lg:hidden flex items-center ">
          <Sheet>
            <SheetTrigger className="flex flex-row gap-1 items-center justify-center bg-primary p-1 px-3 rounded-lg">
              <IoFilterSharp className="text-lg" />
              <span>Filter</span>
            </SheetTrigger>
            <SheetContent className="bg-secondary" side="left">
              <SheetHeader>
                <SheetDescription>
                  {filterTypeData.map((item) => (
                    <Filter
                      cat={item.cat}
                      key={item.title}
                      title={item.title}
                      items={item.items}
                    />
                  ))}

                  <Button className="absolute right-5 bottom-5 px-10 h-auto py-[6px] text-[var(--h2)]">
                    Save
                  </Button>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-row lg:w-full justify-end">
          <Sorting />
        </div>
        <main className=" lg:flex w-full flex-row gap-16 py-10">
          <aside className=" hidden lg:block basis-[30%] 2xl:basis-[20%]   pl-6 ">
            <div className="border-[1px]  border-[var(--h2)] rounded-lg flex flex-col  px-2">
              {filterTypeData.map((item) => (
                <Filter
                  cat={item.cat}
                  key={item.title}
                  title={item.title}
                  items={item.items}
                />
              ))}
              <Button className=" text-[var(--h2)] self-end m-2 my-3">
                Save
              </Button>
            </div>
          </aside>

          <ul className="basis-[100%] lg:basis-[70%] 2xl:basis-[80%] flex flex-row justify-center lg:justify-start  flex-wrap gap-6 lg:pl-1">
            {products?.map((product) => (
              <Product
                offer={product.offer}
                key={product._id}
                id={product._id}
                sex={product.sex}
                name={product.name}
                category={product.category}
                images={product.images}
                price={product.price}
              />
            ))}
          </ul>
        </main>
      </div>
    </section>
  );
};

export default ShopPage;
