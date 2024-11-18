"use client";
import { fetchUserOrder } from "@/lib/actions/order";
import { orderSchemaType } from "@/lib/models/Order";
import { useAuth, UserProfile } from "@clerk/nextjs";
import { Suspense, useEffect, useState } from "react";
import { SignOutButton } from "../buttons/SignOutButton";
import OrderItem from "../order/OrderItem";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import type { Theme } from "@clerk/types";
import OrdersList from "../order/OrdersList";
import Loader from "../Loader/Loader";

const Profile = () => {
  const { userId } = useAuth();
  const [orders, setOrders] = useState<orderSchemaType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUserOrders = async () => {
      setLoading(true);
      if (userId) {
        try {
          const fetchedOrders = await fetchUserOrder(userId);
          setOrders(fetchedOrders);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchUserOrders();
  }, [userId]);

  const appearanceConfig: Theme | undefined =
    theme === "dark" ? { baseTheme: dark } : undefined;

  return (
    <section className="flex flex-row flex-wrap justify-center py-4 gap-5 w-full  ">
      <UserProfile appearance={appearanceConfig} />
      <div className="dark:bg-primary bg-white shadow-2xl w-[95%] min-h-[40vh] max-w-[40rem] p-4 xl:p-8 rounded-xl relative">
        <h2 className="text-2xl font-bold py-3 xl:text-3xl text-[var(--green-main)]">
          My Orders
        </h2>
        <ul className="py-5 overflow-scroll  no-scrollbar">
          <li className="flex w-full cursor-pointer">
            <span className="w-1/2 font-bold">ORDER ID</span>
            <span className="w-1/2 font-bold">DATE</span>
          </li>
          {loading && <Loader />}
          {!loading && <OrdersList orders={orders} />}
        </ul>
        <SignOutButton />
      </div>
    </section>
  );
};

export default Profile;
