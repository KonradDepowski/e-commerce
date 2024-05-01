"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SignOut = () => {
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("cart");
    localStorage.removeItem("totalAmount");
    router.replace("/");
  }, []);
  return <div>Loading...</div>;
};

export default SignOut;
