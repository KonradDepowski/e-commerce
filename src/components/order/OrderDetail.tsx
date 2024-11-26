import { fetchSingleOrder } from "@/lib/actions/order";
import GoBackButton from "../buttons/GoBackButton";
import { Suspense } from "react";
import OrderDetailList from "./OrderDetailList";
import Loader from "../Loader/Loader";

const OrderDetail = async ({ params }: { params: { orderId: string } }) => {
  const orderId = params.orderId.slice(10, params.orderId.length);

  const order = await fetchSingleOrder(orderId);

  const orderProductInfo = order[0].products;
  const discount = order[0].discount !== "" ? `${order[0].discount}%` : "0%";

  const deliveryInfo = `${order[0].deliveryData.town} ${order[0].deliveryData.postalCode} ${order[0].deliveryData.street}`;
  const date = order[0].date;

  return (
    <section className="p-3 max-w-[1500px] m-auto md:min-h-[60vh] w-full ">
      <h2 className="text-xl py-2 font-bold md:text-2xl text-center xl:text-3xl xl:pb-8 ">
        Order Details
      </h2>
      <GoBackButton />
      <div className=" flex flex-col md:flex-row md:flex-wrap ">
        <div className="py-2 md:w-1/2 md:py-0  ">
          <h3 className="text-lg font-bold py-1  text-[var(--green-main)] md:w-full xl:text-2xl">
            Order Info
          </h3>
          <p className="flex gap-2 pt-2">
            <span className="text-[var(--dark-600)] md:text-lg font-bold">
              Order Id:
            </span>
            <span className="text-gray-600 md:text-lg">{orderId}</span>
          </p>
          <p className="flex  gap-2">
            <span className="text-[var(--dark-600)] md:text-lg font-bold">
              Total Amount:
            </span>
            <span className="text-gray-600 md:text-lg">
              ${order[0].totalAmount}
            </span>
          </p>
          <p className="flex  gap-2">
            <span className="text-[var(--dark-600)] md:text-lg font-bold">
              Discount:
            </span>
            <span className="text-gray-600 md:text-lg">{discount}</span>
          </p>
          <p className="flex  gap-2">
            <span className="text-[var(--dark-600)]  md:text-lg font-bold">
              Delivery Info:
            </span>
            <span className="text-gray-600 md:text-lg">{deliveryInfo}</span>
          </p>
          <p className="flex  gap-2">
            <span className="text-[var(--dark-600)]  md:text-lg font-bold">
              Date:
            </span>
            <span className="text-gray-600 md:text-lg">
              {date.toLocaleDateString()} {""}
              {date.toLocaleTimeString()}
            </span>
          </p>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-lg font-bold py-1  text-[var(--green-main)] xl:text-2xl">
            Products Ordered
          </h3>
          <Suspense fallback={<Loader />}>
            <OrderDetailList orderProductInfo={orderProductInfo} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
