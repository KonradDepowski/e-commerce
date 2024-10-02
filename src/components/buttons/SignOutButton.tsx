"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <button
      onClick={() => {
        signOut();
        router.push("/");
      }}
    >
      Sign out
    </button>
  );
};
