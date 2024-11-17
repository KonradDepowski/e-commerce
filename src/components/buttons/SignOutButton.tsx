"use client";

import { CartContext } from "@/lib/store/CartContext";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "sonner";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const cartCtx = useContext(CartContext);
  return (
    <button
      className=" absolute bottom-3 right-3 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 font-bold text-white"
      onClick={() => {
        router.push("/");
        signOut();
        cartCtx?.clearCart();
        toast.success("Successfully logged out");
      }}
    >
      Logout
    </button>
  );
};
