"use client";
import { fetchUserOrder } from "@/lib/actions/order";
import { orderSchemaType } from "@/lib/models/Order";
import { useAuth, UserProfile } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { SignOutButton } from "../buttons/SignOutButton";
import OrderItem from "../order/OrderItem";

const Profile = () => {
  const { userId } = useAuth();
  const [orders, setOrders] = useState<orderSchemaType[]>([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (userId) {
        try {
          const fetchedOrders = await fetchUserOrder(userId);
          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchUserOrders();
  }, [userId]);

  return (
    <section className="flex flex-row flex-wrap justify-center py-4 gap-5 ">
      <UserProfile />
      <div className="bg-primary w-[95%] max-w-[40rem] p-4 xl:p-8 rounded-xl relative">
        <h2 className="text-2xl font-bold py-3 xl:text-3xl">My Orders</h2>
        <ul className="py-5 overflow-scroll max-h-[40vh] no-scrollbar">
          <li className="flex w-full cursor-pointer">
            <span className="w-1/2">ORDER ID</span>
            <span className="w-1/2">DATE</span>
          </li>
          {orders.map((order) => (
            <OrderItem id={order._id!} date={order.createdAt} />
          ))}
        </ul>
        <SignOutButton />
      </div>
    </section>
  );
};

export default Profile;
