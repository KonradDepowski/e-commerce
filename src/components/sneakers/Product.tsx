import Image from "next/image";

import Link from "next/link";
import { productSchemaType } from "@/lib/models/Product";

const Product = ({
  id,
  name,
  category,
  sex,
  price,
  images,
}: productSchemaType) => {
  return (
    <li
      key={id}
      className="flex flex-col w-[200px] md:w-[250px] lg:w-[260px] bg-primary rounded-lg pb-1 shadow-lg relative h-auto"
    >
      <div className="h-[120px] md:h-[170px] relative object-cover">
        <Image
          className="rounded-lg  object-cover object-center"
          src={images?.[0]}
          alt={name}
          fill
        />
      </div>
      <h2 className="text-lg md:text-xl md:p-2 text-center p-1 ">{name}</h2>
      <p className="text-lg md:text-xl md:p-2 text-center  ">${price}</p>

      <button className="p-2 bg-[#59ab6e] hover:bg-[#2f6c3e] text-white m-2 rounded-lg md:p-3 md:text-lg  transition-all">
        <Link href={`/productId=${id}`}>See Details</Link>
      </button>
    </li>
  );
};

export default Product;
