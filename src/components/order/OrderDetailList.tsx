import React from "react";
import OrderItemDetails from "./OrderItemDetails";

const OrderDetailList = ({ orderProductInfo }: { orderProductInfo: any }) => {
  return (
    <ul className="py-4 flex flex-col justify-center items-center gap-3">
      {orderProductInfo.map((order: any) => (
        <OrderItemDetails
          id={order._doc._id}
          name={order._doc.name}
          image={order._doc.images[0]}
          size={order.size}
          price={order.price}
          quantity={order.quantity}
        />
      ))}
    </ul>
  );
};

export default OrderDetailList;
