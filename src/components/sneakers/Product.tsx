import Image from "next/image";
import image from "../../../public/sneakers/nike2.jpg";
import Link from "next/link";

const Product = () => {
  return (
    <div className="flex flex-col w-[200px] md:w-[250px] lg:w-[260px] bg-primary rounded-lg pb-1 shadow-lg">
      <Image className="rounded-lg" src={image} alt="product" />
      <h2 className="text-lg md:text-xl md:p-2 text-center p-1 ">
        Nike Air Max
      </h2>
      <p className="text-lg md:text-xl md:p-2 text-center  ">$99.99</p>

      <button className="p-2 bg-[#59ab6e] hover:bg-[#2f6c3e] text-white m-2 rounded-lg md:p-3 md:text-lg  transition-all">
        <Link href="/link">Add to Cart</Link>
      </button>
    </div>
  );
};

export default Product;
