import Link from "next/link";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className=" bg-background p-5 pb-0 px-0  border-t-[1px] border-white border-dashed">
      <div className="flex flex-col md:flex-row p-3 md:justify-between max-w-[1500px] m-auto">
        <div className="py-3">
          <h2 className="text-2xl mb-2 md:py-4 font-bold ">Contact Us</h2>
          <div className="flex flex-row gap-2 py-1 items-center ">
            <FaPhoneAlt className="text-[var(--h2)]  text-md " />
            <span className="text-[var(--h2)] ">834352525</span>
          </div>
          <div className="flex flex-row gap-2 py-1 text-slate-300 items-center ">
            <MdEmail className="text-md text-[var(--h2)]  " />
            <span className="text-[var(--h2)] ">test@wp.pl</span>
          </div>
        </div>
        <div className="py-3">
          <h2 className="text-2xl mb-2 md:py-4 font-bold">Policy</h2>
          <div className="flex flex-col gap-2 py-1 text-slate-300 ">
            <span className="text-[var(--h2)] ">
              <Link href="/policy">Privacy Policy </Link>
            </span>
            <span className="text-[var(--h2)] ">
              <Link href="/policy">Terms & Conditions </Link>
            </span>
          </div>
        </div>
        <div className="py-3">
          <h2 className="text-2xl mb-2 md:py-4 font-bold">Info</h2>
          <div className="flex flex-col gap-2 py-1 text-slate-300 ">
            <span className="text-[var(--h2)]  ">
              <Link href="/cart">My cart</Link>
            </span>
            <span className="text-[var(--h2)]  ">
              <Link href="/profile">My account </Link>
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-10 p-4 border-t-[0.5px] border-dashed border-[var(--border)]">
        <p className="text-[10px] md:text-[12px]">
          Copyright 2024 All Right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
