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
import ShopPorducts from "./ShopPorducts";
import { Suspense } from "react";
import Loader from "../Loader/Loader";

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

  return (
    <section className="p-3 max-w-[1500px] m-auto ">
      <h1
        style={{
          textShadow: "0.2px 0.2px 0.2px rgba(0,0,0,0.6)",
        }}
        className="[font-size:_clamp(25px,4vw,70px)] font-bold p-3 text-center text-[var(--green-main)] uppercase"
      >
        Our Products
      </h1>
      <p className="text-center uppercase font-thin text-[var(--dark-500)] [font-size:_clamp(12px,4vw,20px)]">
        Welcome to Maxer Shop
      </p>
      <div className="flex flex-row flex-wrap justify-center gap-5 py-7  ">
        <div className="lg:hidden flex items-center ">
          <Sheet>
            <SheetTrigger className="flex flex-row gap-1 items-center justify-center  p-[7px] px-3 rounded-md border border-input bg-transparent">
              <IoFilterSharp className="text-sm" />
              <span className="text-sm">Filter</span>
            </SheetTrigger>
            <SheetContent
              className="bg-primary dark:bg-background
             border-none"
              side="left"
            >
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
            <div className="rounded-lg flex flex-col  px-2">
              {filterTypeData.map((item) => (
                <Filter
                  cat={item.cat}
                  key={item.title}
                  title={item.title}
                  items={item.items}
                />
              ))}
            </div>
          </aside>
          <Suspense fallback={<Loader />}>
            <ShopPorducts filterMode={filterMode} sortingMode={sortingMode} />
          </Suspense>
        </main>
      </div>
    </section>
  );
};

export default ShopPage;
