"use client";
import Loader from "@/components/Loader/Loader";
import { CartContext } from "@/lib/store/CartContext";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useContext, useEffect } from "react";

const Success = () => {
  const cartCtx = useContext(CartContext);
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();
  useEffect(() => {
    cartCtx?.clearUserCart(id!);
    router.replace("/");
  }, []);
  return (
    <div className="min-h-full flex justify-center items-center w-screen">
      <Loader />
    </div>
  );
};

export default Success;
