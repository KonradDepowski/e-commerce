import { orderSchemaType } from "@/lib/types/types";
import OrderItem from "./OrderItem";

const OrdersList = ({ orders }: { orders: orderSchemaType[] }) => {
  return orders.map((order) => (
    <OrderItem key={order._id} id={order._id!} date={order.createdAt!} />
  ));
};

export default OrdersList;
