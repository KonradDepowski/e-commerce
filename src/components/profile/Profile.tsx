import { UserProfile, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Profile = () => {
  const date = new Date();
  return (
    <section className="flex flex-row flex-wrap justify-center  py-4 gap-5">
      <UserProfile />
      <div className="bg-primary w-[95%] max-w-[40rem]  p-4 xl:p-8 rounded-xl">
        <h2 className="text-2xl font-bold py-3  xl:text-3xl ">My Orders</h2>
        <ul className="py-5">
          <li className="flex w-full cursor-pointer">
            <span className="w-1/2 ">ORDER ID</span>
            <span className="w-1/2">DATE</span>
          </li>

          <Link href="/dada">
            <li className="flex w-full py-1 border-b-2 border-b-gray-700 ">
              <span className="w-1/2 text-gray-400">
                66e9a997e47b8a2ce7ca543f
              </span>
              <span className="w-1/2 text-gray-400">
                {date.toLocaleDateString()} {date.toLocaleTimeString()}
              </span>
            </li>
          </Link>
          <li className="flex w-full py-1  border-b-2 border-b-gray-700 ">
            <span className="w-1/2 text-gray-400">938749384793</span>
            <span className="w-1/2 text-gray-400">
              {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </span>
          </li>
          <li className="flex w-full py-1  border-b-2 border-b-gray-700 ">
            <span className="w-1/2 text-gray-400">938749384793</span>
            <span className="w-1/2 text-gray-400">
              {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </span>
          </li>
          <li className="flex w-full py-1  border-b-2 border-b-gray-700 ">
            <span className="w-1/2 text-gray-400">938749384793</span>
            <span className="w-1/2 text-gray-400">
              {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </span>
          </li>
        </ul>
        {/* <table className="w-full">
          <tr>
            <td>OREDER ID</td>
            <td>DATE</td>
          </tr>
          <tr className="m-5">
            <td>9387493dadadadad84793</td>
            <td>
              {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </td>
          </tr>
          <tr>
            <td>938749384793</td>
            <td>
              {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </td>
          </tr>
          <tr>
            <td>938749384793</td>
            <td>
              {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </td>
          </tr>
        </table> */}
      </div>
    </section>
  );
};

export default Profile;
