import { orderSchemaType } from "@/lib/models/Order";
import OrderItem from "./OrderItem";

const OrdersList = ({ orders }: { orders: orderSchemaType[] }) => {
  return orders.map((order) => (
    <OrderItem id={order._id!} date={order.createdAt!} />
  ));
};

export default OrdersList;
