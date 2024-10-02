"use client";
import { fetchUserOrder } from "@/lib/actions/order";
import { orderSchemaType } from "@/lib/models/Order";
import { useAuth, UserProfile, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SignOutButton } from "../buttons/SignOutButton";

const Profile = () => {
  const { userId } = useAuth();
  const { user } = useUser();
  const [orders, setOrders] = useState<orderSchemaType[]>([]);

  useEffect(() => {
    const fetchOrd = async () => {
      if (userId) {
        try {
          const fetchedOrders = await fetchUserOrder(userId);
          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrd(); // Call the async function
  }, [userId]); // Add userId as dependency

  return (
    <section className="flex flex-row flex-wrap justify-center py-4 gap-5">
      <UserProfile />
      <div className="bg-primary w-[95%] max-w-[40rem] p-4 xl:p-8 rounded-xl">
        <h2 className="text-2xl font-bold py-3 xl:text-3xl">My Orders</h2>
        <ul className="py-5">
          <li className="flex w-full cursor-pointer">
            <span className="w-1/2">ORDER ID</span>
            <span className="w-1/2">DATE</span>
          </li>

          {orders.map((order) => (
            <Link href={`/profile/orderId=${order._id}`} key={order._id}>
              <li className="flex w-full py-1 border-b-2 border-b-gray-700">
                <span className="w-1/2 text-gray-400">{order._id}</span>
                <span className="w-1/2 text-gray-400">
                  {order.createdAt.toLocaleDateString()} {""}
                  {order.createdAt.toLocaleTimeString()}
                </span>
              </li>
            </Link>
          ))}
        </ul>
        <SignOutButton />
      </div>
    </section>
  );
};

export default Profile;
