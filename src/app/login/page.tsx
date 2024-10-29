import AuthenticationPage from "@/components/auth/Auth";

const Auth = ({ searchParams }: { searchParams: { mode: string } }) => {
  return <AuthenticationPage searchParams={searchParams} />;
};

export default Auth;
