import Loader from "@/components/Loader/Loader";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

function SSOCallback() {
  return (
    <div className="min-h-[100vh]">
      <Loader />
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
export default SSOCallback;
