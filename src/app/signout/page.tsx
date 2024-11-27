"use client";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SignOut = () => {
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("cart");
    localStorage.removeItem("totalAmount");
    router.replace("/");
  }, []);
  return (
    <div className="min-h-screen">
      <Loader />
    </div>
  );
};

export default SignOut;
