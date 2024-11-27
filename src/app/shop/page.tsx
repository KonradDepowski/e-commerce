import ShopPage from "@/components/shop/ShopPage";

const Shop = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  return <ShopPage searchParams={searchParams} />;
};

export default Shop;
