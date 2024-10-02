import { fetchSingleOrder } from "@/lib/actions/order";
import Image from "next/image";

const OrderDetail = async ({ params }: { params: { orderId: string } }) => {
  const orderId = params.orderId.slice(10, params.orderId.length);

  const order = await fetchSingleOrder(orderId);

  // const orderProductInfo = order._doc;

  console.log(order);

  // const deliveryInfo = `${order.deliveryData.town} ${order.deliveryData.postalCode} ${order.deliveryData.street}`;
  // const date = order.date;

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
            <span className="text-gray-600 md:text-lg"></span>
          </p>
          <p className="flex  gap-2">
            <span className="text-gray-300 md:text-lg">Delivery info:</span>
            <span className="text-gray-600 md:text-lg"></span>
          </p>
          <p className="flex  gap-2">
            <span className="text-gray-300 md:text-lg">Date:</span>
            <span className="text-gray-600 md:text-lg"></span>
          </p>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-md font-bold py-1 md:text-lg text-[#59ab6e] xl:text-xl">
            Products Ordered
          </h3>
          <ul className="py-4 flex flex-col justify-center items-center gap-3">
            <div className="w-[80%] border-dashed border-b-2 border-b-gray-700 ">
              <div className="flex justify-center ">
                <div className="w-[40%]">
                  <Image
                    src="https://i.ibb.co/Kzznjwp/reto.jpg"
                    width={90}
                    height={90}
                    alt="img"
                  />
                </div>
                <div className="flex flex-col justify-center items-center w-[60%]">
                  <h5 className="text-md  text-[#59ab6e] text-center py-1">
                    Air Jordan 1 Hi FlyEase
                  </h5>
                  <p>
                    <span>Size:</span> <span className="text-gray-600">12</span>
                  </p>
                </div>
              </div>
              <div className="flex justify-around py-3">
                <p>
                  <span>Price:</span> <span className="text-gray-600">$50</span>
                </p>
                <p>
                  <span>Qunatity:</span>{" "}
                  <span className="text-gray-600">2</span>
                </p>
                <p>
                  <span>Total:</span>{" "}
                  <span className="text-gray-600">$100</span>
                </p>
              </div>
            </div>
            <div className="w-[80%] border-dashed border-b-2 border-b-gray-700 ">
              <div className="flex ">
                <div className="w-[40%]">
                  <Image
                    src="https://i.ibb.co/Kzznjwp/reto.jpg"
                    width={90}
                    height={90}
                    alt="img"
                  />
                </div>
                <div className="flex flex-col justify-center items-center w-[60%]">
                  <h5 className="text-md  text-[#59ab6e] text-center py-1">
                    Nike Air Max
                  </h5>
                  <p>
                    <span>Size:</span> <span className="text-gray-600">12</span>
                  </p>
                </div>
              </div>
              <div className="flex justify-around py-3">
                <p>
                  <span>Price:</span> <span className="text-gray-600">$50</span>
                </p>
                <p>
                  <span>Qunatity:</span>{" "}
                  <span className="text-gray-600">2</span>
                </p>
                <p>
                  <span>Total:</span>{" "}
                  <span className="text-gray-600">$100</span>
                </p>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
