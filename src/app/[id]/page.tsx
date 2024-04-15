import ProductDetailPage from "@/components/productDetail/ProductDetailPage";
import React from "react";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  return <ProductDetailPage params={params} />;
};

export default ProductDetail;
