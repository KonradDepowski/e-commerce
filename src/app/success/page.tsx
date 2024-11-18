"use client";
import Loader from "@/components/Loader/Loader";
import { CartContext } from "@/lib/store/CartContext";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useContext, useEffect } from "react";
import { toast, Toaster } from "sonner";

const Success = () => {
  const cartCtx = useContext(CartContext);
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();
  useEffect(() => {
    cartCtx?.clearUserCart(id!);
    toast.success("Successfully ordered ");
    router.replace("/");
  }, []);
  return (
    <div className="min-h-full flex justify-center items-center w-screen">
      <Loader />
    </div>
  );
};

export default Success;
