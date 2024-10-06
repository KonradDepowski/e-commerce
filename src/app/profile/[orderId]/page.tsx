import Loader from "@/components/Loader/Loader";
import OrderDetail from "@/components/order/OrderDetail";
import { Suspense } from "react";

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
  return (
    <Suspense fallback={<Loader />}>
      <OrderDetail params={params} />
    </Suspense>
  );
};

export default OrderDetails;
