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
  const toggleSheetHandler = () => {
    setOpenSheet((prev) => !prev);
  };
  return (
    <div className="flex items-center gap-3 md:hidden">
      <ThemeToggle />
      <Sheet onOpenChange={toggleSheetHandler} open={openSheet}>
        <SheetTrigger asChild>
          <RxHamburgerMenu size={24} />
        </SheetTrigger>
        <SheetContent className="bg-primary flex flex-col justify-center pt-5 border-0 h-full">
          {/* Scrollable container */}
          <ul
            id="scroll"
            className="flex flex-col items-center gap-10 w-full text-[var(--color)] overflow-y-auto px-4 pb-20 "
          >
            <li className="w-full text-3xl text-center font-bold uppercase">
              <Link onClick={toggleSheetHandler} href="/">
                Home
              </Link>
            </li>
            <li className="w-full text-3xl text-center font-bold uppercase">
              <Link onClick={toggleSheetHandler} href="/shop">
                Shop
              </Link>
            </li>
            <li className="flex justify-center w-full text-3xl text-center font-bold uppercase">
              <Link
                onClick={toggleSheetHandler}
                href="/cart"
                className="flex gap-1"
              >
                Cart
              </Link>
            </li>
            <li className="flex justify-center w-full text-3xl text-center font-bold uppercase">
              <Link onClick={toggleSheetHandler} href={linkToProfile}>
                {userId ? "PROFILE" : "Login"}
              </Link>
            </li>
          </ul>
          {/* Footer */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-primary">
            <h2 className="text-xl mb-2 font-bold text-[var(--green-main)] text-center">
              Contact Us
            </h2>
            <div className="flex justify-center gap-5">
              <div className="flex flex-row gap-2 py-1 items-center">
                <FaPhoneAlt className="text-[var(--dark-500)] text-sm" />
                <span className="text-[var(--dark-500)] text-sm">
                  834352525
                </span>
              </div>
              <div className="flex flex-row gap-2 py-1 items-center">
                <MdEmail className="text-[var(--dark-500)] text-sm" />
                <span className="text-[var(--dark-500)] text-sm">
                  test@wp.pl
                </span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NarrowNav;
