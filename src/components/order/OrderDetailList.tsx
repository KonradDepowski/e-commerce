import React from "react";
import OrderItemDetails from "./OrderItemDetails";
import { productsType } from "@/lib/types/types";

const OrderDetailList = ({
  orderProductInfo,
}: {
  orderProductInfo: productsType[];
}) => {
  return (
    <ul className="py-4 flex flex-col justify-center items-center gap-3">
      {orderProductInfo.map((order) => (
        <OrderItemDetails
          id={order._id!}
          name={order.name}
          image={order.images![0]}
          size={order.size}
          price={order.price}
          quantity={order.quantity}
        />
      ))}
    </ul>
  );
};

export default OrderDetailList;
