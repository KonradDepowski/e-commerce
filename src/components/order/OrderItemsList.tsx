import React from "react";

const OrderItemsList = () => {
  return (
    <ul className="py-4 flex flex-col justify-center items-center gap-3">
      {orderProductInfo.map((order) => (
        <OrderItemDetails
          id={order._doc._id}
          name={order._doc.name}
          image={order._doc.images[0]}
          size={order.size}
          price={order._doc.price}
          quantity={order.quantity}
        />
      ))}
    </ul>
  );
};

export default OrderItemsList;
