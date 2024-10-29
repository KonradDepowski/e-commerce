import { Suspense } from "react";
import ThemeToggle from "../ui/ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";

type WideNavProps = {
  cartLength: number;
  userId: string;
  user: { imageUrl: string };
};

const WideNav = ({ cartLength, userId, user }: WideNavProps) => {
  return (
    <ul className="flex-row justify-between items-center hidden md:flex w-[40%] max-w-[500px]">
      <ThemeToggle />
      <li className="md:text-lg xl:text-xl text-center transition-all hover:text-[var(--link-hover-gray)] focus:text-[var( --link-hover-gray)]">
        <Link href="/">Home</Link>
      </li>

      <li className="md:text-lg xl:text-xl text-center  transition-all hover:text-[var(--link-hover-gray)] focus:text-[var( --link-hover-gray)]">
        <Link href="/shop">Shop</Link>
      </li>

      <li className="md:text-lg xl:text-xl text-center  transition-all hover:text-[var(--link-hover-gray)] focus:text-[var( --link-hover-gray)]">
        <Link
          className=" flex flex-row justify-center items-center gap-1 "
          href="/cart"
        >
          <span className="text-[15px]">{cartLength}</span>
          <BsCart3 />
        </Link>
      </li>
      {!userId && (
        <li className="md:text-lg xl:text-xl text-center font-bold   transition-all hover:text-[var( --link-hover-gray)] focus:text-[var( --link-hover-gray)]">
          <Link href="/login?mode=signup">
            <FaRegUser />
          </Link>
        </li>
      )}

      {userId && (
        <li className="md:text-lg xl:text-xl text-center hover:text-[var( --link-hover-gray)] focus:text-[var( --link-hover-gray)]">
          <Link href="/profile">
            <Suspense fallback="Loading...">
              <Image
                className="rounded-full"
                src={user?.imageUrl!}
                width={30}
                height={30}
                alt="avatar"
              />
            </Suspense>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default WideNav;
