import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

function SSOCallback() {
  return (
    <div className="min-h-[100vh]">
      <p>Loading...</p>
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
export default SSOCallback;
