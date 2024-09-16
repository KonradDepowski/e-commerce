import ShopPage from "@/components/shop/ShopPage";
import React from "react";

const Shop = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  return <ShopPage searchParams={searchParams} />;
};

export default Shop;
