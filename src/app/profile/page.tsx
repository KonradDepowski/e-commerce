import Profile from "@/components/profile/Profile";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

const ProfilePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Profile />
    </Suspense>
  );
};

export default ProfilePage;
