"use client";
import { useRouter } from "next/navigation";

const Reject = () => {
  const router = useRouter();
  return (
    <div className="min-h-full flex  flex-col justify-center items-center w-screen gap-4">
      <h1 className="text-lg xl:text-4xl text-[var(--error)]">
        Payment not succeeded
      </h1>
      <button
        className="bg-[var(--purple)] hover:bg-[var(--purple-hover)] py-1 px-2 xl:py-3 xl:px-5 text-lg rounded-lg"
        onClick={() => router.replace("/")}
      >
        Go to shop
      </button>
    </div>
  );
};

export default Reject;
