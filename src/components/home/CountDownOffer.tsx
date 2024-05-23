"use client";

import { calculateTimeLeft } from "@/lib/utils";
import { useEffect, useState } from "react";

const CountDownOffer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex flex-row  gap-4 w-full ">
      <div className="bg-[#fff] w-[30%] max-w-[180px] h-[90px] lg:h-[100px] rounded-xl flex flex-col justify-center gap-2 items-center">
        <span className="text-black text-2xl lg:text-3xl font-bold">
          {timeLeft.hours}
        </span>
        <span className="text-slate-600 lg:text-lg">Hours</span>
      </div>
      <div className="bg-[#fff] w-[30%] max-w-[180px] h-[90px] lg:h-[100px] rounded-xl flex flex-col justify-center gap-2 items-center">
        <span className="text-black text-2xl lg:text-3xl font-bold">
          {timeLeft.minutes}
        </span>
        <span className="text-slate-600 lg:text-lg">Minutes</span>
      </div>
      <div className="bg-[#fff] w-[30%] max-w-[180px] h-[90px] lg:h-[100px] rounded-xl flex flex-col justify-center gap-2 items-center">
        <span className="text-black text-2xl lg:text-3xl font-bold">
          {timeLeft.seconds}
        </span>
        <span className="text-slate-600 lg:text-lg">Seconds</span>
      </div>
    </div>
  );
};

export default CountDownOffer;
