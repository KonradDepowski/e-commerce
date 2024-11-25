import Image from "next/image";

import Link from "next/link";
import { productSchemaType } from "@/lib/models/Product";

const Product = ({ id, name, price, images }: productSchemaType) => {
  return (
    <li
      key={id}
      className="flex flex-col w-[200px] md:w-[250px] lg:w-[260px] bg-primary rounded-lg pb-1 h-auto  shadow-[var(--black)] dark:shadow-2xl relative border border-[var(--dark-300)] dark:border-0"
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

      <Link
        className="p-2 bg-[var(--green-main)] hover:bg-[var(--green-main-hover)] text-center text-white m-2 rounded-lg md:p-3 md:text-lg  transition-all"
        href={`/productId=${id}`}
      >
        See Details
      </Link>
    </li>
  );
};

export default Product;
