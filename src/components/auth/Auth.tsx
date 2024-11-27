import Link from "next/link";

import { UserAuthForm } from "@/components/auth/UserAuthForm";

export default function AuthenticationPage({
  searchParams,
}: {
  searchParams: { mode: string };
}) {
  const mode: string = searchParams.mode;

  return (
    <>
      <div className="container bg-primary dark:bg-background relative p-10 flex-col items-center justify-center md:grid lg:max-w-none lg:py-20 lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] lg:w-[480px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight lg:text-5xl text-[var(--green-main)]">
                {mode === "signup"
                  ? "Create a new account"
                  : "Sign in to your account"}
              </h1>
              <p className="text-sm lg:text-lg ">
                {mode === "signup"
                  ? "Enter your email and password to create your account"
                  : "Enter your email and password to log in your account"}
              </p>
            </div>
            <UserAuthForm mode={mode} />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary hover:text-slate-600 "
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary hover:text-slate-600 "
              >
                Privacy Policy
              </Link>
            </p>
            <Link
              className="text-center text-md text-[var(--font-color)] underline hover:text-slate-600 "
              href={
                mode === "signup" ? "/login?mode=login" : "/login?mode=signup"
              }
            >
              {mode === "signup"
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
