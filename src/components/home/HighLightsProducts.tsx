import { fetchHighLigthsProducts } from "@/lib/actions/product";
import Product from "../product/Product";

const HighLightsProducts = async () => {
  const products = await fetchHighLigthsProducts();
  return (
    <ul className="flex flex-row flex-wrap items-center justify-center lg:justify-start  gap-10 max-w-[1500px] m-auto">
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
  );
};

export default HighLightsProducts;
