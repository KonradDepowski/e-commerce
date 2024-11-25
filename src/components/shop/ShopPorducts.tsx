import { fetchSortProducts } from "@/lib/actions/product";

import React from "react";
import Product from "../sneakers/Product";
import PaginationList from "../pagination/Pagination";

const ShopPorducts = async ({
  sortingMode,
  filterMode,
  page,
}: {
  sortingMode: string;
  filterMode: {
    category: string;
    sex: string;
    price: string;
  };
  page: string | number;
}) => {
  const { products, totalPages } = await fetchSortProducts(
    sortingMode,
    12,
    page,
    filterMode
  );

  if (!products) throw new Error();
  return (
    <div className=" md:min-w-[50%]">
      <ul className="basis-[100%] lg:basis-[70%] 2xl:basis-[80%] flex flex-row justify-center lg:justify-start items-start flex-wrap gap-6 lg:pl-1 xl:mb-10">
        {products?.length === 0 && (
          <p className="text-center w-full self-center text-lg text-[var(--dark-500)] xl:text-xl 2xl:text-3xl">
            No results match
          </p>
        )}
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
      <div>
        {totalPages > 1 && (
          <PaginationList page={page} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
};

export default ShopPorducts;
