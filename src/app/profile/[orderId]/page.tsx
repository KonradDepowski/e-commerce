import OrderDetail from "@/components/order/OrderDetail";
import React from "react";

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
  return <OrderDetail params={params} />;
};

export default OrderDetails;
