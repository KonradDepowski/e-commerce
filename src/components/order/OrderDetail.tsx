import { fetchSingleOrder } from "@/lib/actions/order";
import OrderItemDetails from "./OrderItemDetails";

const OrderDetail = async ({ params }: { params: { orderId: string } }) => {
  const orderId = params.orderId.slice(10, params.orderId.length);

  const order = await fetchSingleOrder(orderId);

  const orderProductInfo = order[0].products;

  const deliveryInfo = `${order[0].deliveryData.town} ${order[0].deliveryData.postalCode} ${order[0].deliveryData.street}`;
  const date = order[0].date;

  return (
    <section className="p-3 max-w-[1500px] m-auto md:min-h-[60vh] ">
      <h2 className="text-xl py-2 font-bold md:text-2xl text-center xl:text-3xl xl:pb-8 ">
        Order Details
      </h2>
      <div className=" flex flex-col md:flex-row md:flex-wrap ">
        <div className="py-2 md:w-1/2 md:py-0 ">
          <h3 className="text-md font-bold py-1 md:text-lg text-[#59ab6e] md:w-full xl:text-xl">
            Order Info
          </h3>
          <p className="flex gap-2 pt-4">
            <span className="text-gray-300 md:text-lg ">Order Id:</span>
            <span className="text-gray-600 md:text-lg">{orderId}</span>
          </p>
          <p className="flex  gap-2">
            <span className="text-gray-300 md:text-lg">Total Amount:</span>
            <span className="text-gray-600 md:text-lg">
              ${order[0].totalAmount}
            </span>
          </p>
          <p className="flex  gap-2">
            <span className="text-gray-300 md:text-lg">Delivery info:</span>
            <span className="text-gray-600 md:text-lg">{deliveryInfo}</span>
          </p>
          <p className="flex  gap-2">
            <span className="text-gray-300 md:text-lg">Date:</span>
            <span className="text-gray-600 md:text-lg">
              {date.toLocaleDateString()} {""}
              {date.toLocaleTimeString()}
            </span>
          </p>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-md font-bold py-1 md:text-lg text-[#59ab6e] xl:text-xl">
            Products Ordered
          </h3>
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
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
