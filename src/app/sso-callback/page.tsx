import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

function SSOCallback() {
  return (
    <div className="min-h-[100vh]">
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
export default SSOCallback;
