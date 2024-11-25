import Link from "next/link";

type OrderItemProps = {
  id: string;
  date: Date;
};

const OrderItem = ({ id, date }: OrderItemProps) => {
  return (
    <Link scroll={false} href={`/profile/orderId=${id}`} key={id}>
      <li className="flex w-full py-1 border-b-2 border-b-[var(--dark-300)] gap-2 md:gap-0">
        <span className="w-1/2 text-[var(--dark-500)] text-[12px] sm:text-sm">
          {id}
        </span>
        <span className="w-1/2 text-[var(--dark-500)] text-[12px] sm:text-sm">
          {date.toLocaleDateString()} {""}
          {date.toLocaleTimeString()}
        </span>
      </li>
    </Link>
  );
};

export default OrderItem;
