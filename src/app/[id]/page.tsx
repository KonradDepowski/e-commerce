import ProductDetailPage from "@/components/productDetail/ProductDetailPage";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  return <ProductDetailPage params={params} />;
};

export default ProductDetail;
