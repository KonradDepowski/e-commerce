"use client";
import { fetchUserOrder } from "@/lib/actions/order";
import { useAuth, UserProfile } from "@clerk/nextjs";
import {  useEffect, useState } from "react";
import { SignOutButton } from "../buttons/SignOutButton";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import type { Theme } from "@clerk/types";
import OrdersList from "../order/OrdersList";
import Loader from "../Loader/Loader";
import { orderSchemaType } from "@/lib/types/types";

const Profile = () => {
  const { userId } = useAuth();
  const [orders, setOrders] = useState<orderSchemaType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUserOrders = async () => {
      setLoading(true);
      if (userId) {
        const fetchedOrders = await fetchUserOrder(userId);
        setOrders(fetchedOrders);
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [userId]);

  const appearanceConfig: Theme | undefined =
    theme === "dark" ? { baseTheme: dark } : undefined;

  return (
    <section className="flex flex-row flex-wrap justify-center py-4 gap-5 w-full  ">
      <UserProfile appearance={appearanceConfig} />
      <div className="dark:bg-primary bg-white shadow-2xl w-[95%] min-h-[40vh] max-w-[40rem] p-4 xl:p-8 rounded-xl relative pb-12">
        <h2 className="text-2xl font-bold py-3 xl:text-3xl text-[var(--green-main)]">
          My Orders
        </h2>
        <ul className="py-5 overflow-scroll  no-scrollbar">
          <li className="flex w-full">
            <span className="w-1/2 font-bold text-[var(--dark-500)]">
              ORDER ID
            </span>
            <span className="w-1/2 font-bold text-[var(--dark-500)]">DATE</span>
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
