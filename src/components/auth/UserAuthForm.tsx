"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";

import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/models/loginSchema";
import { toast } from "sonner";
import { OAuthStrategy } from "@clerk/types";
import { signupSchema } from "@/lib/models/signup";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
type Props = {
  mode: string;
};

type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export function UserAuthForm({ ...props }: UserAuthFormProps | Props) {
  const params = useSearchParams();
  const mode = params.get("mode");
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(mode === "signup" ? signupSchema : loginSchema),
  });

  const handleSubmitHandler = async (data: FormValues) => {
    const formData = {
      emailAddress: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    if (!isLoaded) {
      return;
    }

    if (mode === "signup") {
      try {
        await signUp.create({
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailAddress: formData.emailAddress,
          password: formData.password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        setPendingVerification(true);
      } catch (err: any) {
        toast.error(err.errors[0].message);
      }
    } else {
      try {
        const completeSignIn = await signIn!.create({
          identifier: data.email,
          password: data.password,
        });

        if (completeSignIn.status === "complete") {
          await setActive({ session: completeSignIn.createdSessionId });
          router.push("/");
          toast.success("Success. You logged in!");
        }
      } catch (err: any) {
        toast.error(err.errors[0].message);
      }
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        router.push("/");
        toast.success("Success. You logged in!");
      }
    } catch (err: any) {
      toast.error(err.errors[0].message);
    }
  };

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn!.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  return (
    <div className={cn("grid gap-6")} {...props}>
      {!pendingVerification && (
        <>
          <form onSubmit={handleSubmit(handleSubmitHandler)}>
            <div className="grid gap-2 mt-2">
              {mode === "signup" && (
                <>
                  <div className="grid gap-1 ">
                    <Label className="sr-only" htmlFor="firstName">
                      Fist Name
                    </Label>
                    <Input
                      className="lg:p-6 lg:px-3  border-[var(--dark-300)]"
                      id="firstName"
                      placeholder="First name"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="on"
                      autoCorrect="off"
                      disabled={isSubmitting}
                      {...register("firstName" as const)}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-[10px] md:text-[12px] px-2">
                      {errors.firstName.message}
                    </p>
                  )}
                  <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="lastName">
                      Last Name
                    </Label>
                    <Input
                      className="lg:p-6 lg:px-3  border-[var(--dark-300)]"
                      id="lastName"
                      placeholder="Last name"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isSubmitting}
                      {...register("lastName" as const)}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-red-500 text-[10px] md:text-[12px] px-2">
                      {errors.lastName.message}
                    </p>
                  )}
                </>
              )}

              <div className="grid gap-1 ">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  className="lg:p-6 lg:px-3  border-[var(--dark-300)]"
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="on"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...register("email" as const)}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[10px] md:text-[12px] px-2">
                  {errors.email.message}
                </p>
              )}
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  className="lg:p-6 lg:px-3 border-[var(--dark-300)]"
                  id="password"
                  placeholder="********"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...register("password" as const)}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-[10px] md:text-[12px] px-2">
                  {errors.password.message}
                </p>
              )}
              <Button
                className="lg:p-6 lg:px-3 text-white bg-[var(--purple)] hover:bg-[var(--purple-hover)] focus:bg-[var(--purple-hover)]"
                disabled={isSubmitting}
              >
                {isSubmitting && <p>Submitting</p>}
                {!isSubmitting && (mode === "signup" ? "Sign Up" : "Sign In")}
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            className="lg:p-6 lg:px-3 border-[1px] border-dashed  border-[#DD5144] bg-[var(--googleBtn)] hover:bg-[var(--red-hover)] hover:text-white text-white "
            variant="outline"
            type="button"
            disabled={isSubmitting}
            onClick={() => signInWith("oauth_google")}
          >
            {isSubmitting ? <p>Submitting</p> : <p>Google</p>}
          </Button>
          <Button
            className="lg:p-6 lg:px-3 border-[1px] border-dashed border-[#4267B2] hover:bg-[var(--blue-hover)] bg-[var(--fbBtn)] text-white hover:text-white "
            variant="outline"
            type="button"
            disabled={isSubmitting}
            onClick={() => signInWith("oauth_facebook")}
          >
            {isSubmitting ? <p>Submitting</p> : <p> Facebook</p>}
          </Button>
        </>
      )}
      {pendingVerification && (
        <div className="flex flex-col w-[80%] m-auto max-w-[300px]">
          <Input
            className="lg:p-6 lg:px-3 "
            id="code"
            placeholder="Enter a code"
            type="number"
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isSubmitting}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            className="lg:p-6 lg:px-3 text-white mt-4 bg-[var(--purple)] hover:bg-[var(--purple-hover)] focus:bg-[var(--purple-hover)] "
            variant="secondary"
            disabled={isSubmitting}
            onClick={onPressVerify}
          >
            {isSubmitting ? <p>Loading</p> : <p>Submit</p>}
          </Button>
        </div>
      )}
    </div>
  );
}
