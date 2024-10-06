import Link from "next/link";

type OrderItemProps = {
  id: string;
  date: Date;
};

const OrderItem = ({ id, date }: OrderItemProps) => {
  return (
    <Link href={`/profile/orderId=${id}`} key={id}>
      <li className="flex w-full py-1 border-b-2 border-b-gray-700">
        <span className="w-1/2 text-gray-400">{id}</span>
        <span className="w-1/2 text-gray-400">
          {date.toLocaleDateString()} {""}
          {date.toLocaleTimeString()}
        </span>
      </li>
    </Link>
  );
};

export default OrderItem;
