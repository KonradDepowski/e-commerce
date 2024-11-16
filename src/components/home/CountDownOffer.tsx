"use client";

import { useEffect, useState } from "react";

const TARGET_TIME_KEY = "countdown_target_time";

const CountDownOffer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const targetTime = new Date(localStorage.getItem(TARGET_TIME_KEY) || 0);
    const timeDifference = targetTime.getTime() - now.getTime();

    if (timeDifference <= 0) {
      return {
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  useEffect(() => {
    // On first load, set the target time if it doesn't exist
    if (!localStorage.getItem(TARGET_TIME_KEY)) {
      const now = new Date();
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      localStorage.setItem(TARGET_TIME_KEY, tomorrow.toISOString());
    }

    // Set initial time left
    setTimeLeft(calculateTimeLeft());

    // Update the timer every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-row gap-4 w-full">
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
