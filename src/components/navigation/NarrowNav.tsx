"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import ThemeToggle from "../ui/ThemeToggle";
import Link from "next/link";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

type NarrowNavProps = {
  userId: string;
};
const NarrowNav = ({ userId }: NarrowNavProps) => {
  const [openSheet, setOpenSheet] = useState(false);
  const linkToProfile = userId ? "/profile" : "/login?mode=signup";
  const toogleSheetHandler = () => {
    setOpenSheet((prev) => !prev);
  };
  return (
    <div className="flex items-center gap-3 md:hidden ">
      <ThemeToggle />
      <Sheet onOpenChange={toogleSheetHandler} open={openSheet}>
        <SheetTrigger asChild>
          <RxHamburgerMenu size={24} />
        </SheetTrigger>
        <SheetContent className="bg-primary p-4 flex-col justify-center pt-20 border-0">
          <ul className="flex flex-col items-center gap-10 w-full text-[var(--color)]">
            <li className=" w-full text-3xl text-center font-bold uppercase ">
              <Link onClick={toogleSheetHandler} href="/">
                Home
              </Link>
            </li>
            <li className="  w-full text-3xl text-center font-bold uppercase ">
              <Link onClick={toogleSheetHandler} href="/shop">
                Shop
              </Link>
            </li>

            <li className=" flex justify-center w-full text-3xl text-center font-bold uppercase ">
              <Link
                onClick={toogleSheetHandler}
                href="/cart"
                className="flex gap-1"
              >
                Cart
              </Link>
            </li>
            <li className=" flex justify-center w-full text-3xl text-center font-bold uppercase ">
              <Link onClick={toogleSheetHandler} href={linkToProfile}>
                {userId ? "PROFILE" : "Login"}
              </Link>
            </li>
          </ul>
          <div className="absolute bottom-0 left-0 w-full p-4 ">
            <h2 className="text-xl mb-2 md:py-4 font-bold  text-[var(--green-main)] text-center">
              Contact Us
            </h2>
            <div className="flex justify-center gap-5">
              <div className="flex flex-row gap-2 py-1 items-center ">
                <FaPhoneAlt className="text-[var(--h2)]  text-sm " />
                <span className="text-[var(--h2)] text-sm">834352525</span>
              </div>
              <div className="flex flex-row gap-2 py-1 text-slate-300 items-center ">
                <MdEmail className="text-sm text-[var(--h2)]  " />
                <span className="text-[var(--h2)] text-sm">test@wp.pl</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NarrowNav;
