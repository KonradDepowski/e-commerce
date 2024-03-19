import { Metadata } from "next";

import Link from "next/link";

import { UserAuthForm } from "@/components/ui/user-auth-form";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage({ searchParams }: any) {
  const mode: string = searchParams.mode;

  return (
    <>
      <div className="container relative p-10 flex-col items-center justify-center md:grid lg:max-w-none lg:py-20 lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] lg:w-[480px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight lg:text-5xl">
                {mode === "signup"
                  ? "Create a new account"
                  : "Sign in to your account"}
              </h1>
              <p className="text-sm text-muted-foreground lg:text-lg">
                {mode === "signup"
                  ? "Enter your email and password to create your account"
                  : "Enter your email and password to log in your account"}
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>
              and
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <Link
              className="text-center text-md text-[var(--font-color)] underline "
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
