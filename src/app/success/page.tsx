"use client";
import { CartContext } from "@/lib/store/CartContext";
import { useAuth, useUser } from "@clerk/nextjs";
import { redirect, useSearchParams } from "next/navigation";

import React, { useContext, useEffect } from "react";

const Success = () => {
  const cartCtx = useContext(CartContext);
  const params = useSearchParams();
  const id = params.get("id");
  useEffect(() => {
    cartCtx?.clearCart(id!);
    redirect("/");
  }, []);
  return (
    <div className="min-h-[100vh]">
      <p>Loading...</p>
    </div>
  );
};

export default Success;
