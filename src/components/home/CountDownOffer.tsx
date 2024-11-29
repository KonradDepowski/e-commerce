"use client";

import { fetchOfferExpiresDate } from "@/lib/actions/product";
import { useOfferContext } from "@/lib/store/OfferProductContext";
import { useEffect, useState } from "react";

const TARGET_TIME_KEY = "countdown_target_time";

const CountDownOffer = () => {
  const offerCtx = useOfferContext();
  const [offerExpires, setOfferExpires] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  const calculateTimeLeft = (targetTime: Date) => {
    const now = new Date();
    const timeDifference = targetTime.getTime() - now.getTime();

    if (timeDifference <= 0) {
      return { hours: "00", minutes: "00", seconds: "00" };
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
    const fetchExpiresDate = async () => {
      try {
        const expiresDate = await fetchOfferExpiresDate();
        const fetchedDate = new Date(expiresDate[0].date);
        setOfferExpires(fetchedDate);

        // Store in localStorage as a fallback
        localStorage.setItem(TARGET_TIME_KEY, fetchedDate.toISOString());
      } catch (error) {
        console.error("Failed to fetch expiration date:", error);
      }
    };

    fetchExpiresDate();
  }, []);

  useEffect(() => {
    if (!offerExpires) return;

    const updateCountdown = () => {
      setTimeLeft(calculateTimeLeft(offerExpires));
    };

    updateCountdown(); // Initial call
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [offerExpires]);

  useEffect(() => {
    if (
      timeLeft.hours === "00" &&
      timeLeft.minutes === "00" &&
      timeLeft.seconds === "00"
    ) {
      offerCtx?.changeOfferStatus(true);
    }
  }, [timeLeft]);

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
