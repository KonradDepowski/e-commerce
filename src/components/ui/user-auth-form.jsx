"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";

import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useState, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/models/loginSchema";
import { toast } from "sonner";
import { OAuthStrategy } from "@clerk/types";

export function UserAuthForm({ ...props }) {
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
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmitHandler = async (data) => {
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
          first_name: formData.firstName,
          last_name: formData.lastName,
          emailAddress: formData.emailAddress,
          password: formData.password,
        });

        // send the email.
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        // change the UI to our pending section.
        setPendingVerification(true);
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
        console.log(err.errors[0].message);

        toast.error(err.errors[0].message);
      }
    } else {
      try {
        const completeSignIn = await signIn.create({
          identifier: data.email,
          password: data.password,
        });

        if (completeSignIn.status !== "complete") {
          // The status can also be `needs_factor_on', 'needs_factor_two', or 'needs_identifier'
          // Please see https://clerk.com/docs/references/react/use-sign-in#result-status for  more information
          console.log(JSON.stringify(completeSignIn, null, 2));
        }

        if (completeSignIn.status === "complete") {
          // If complete, user exists and provided password match -- set session active
          await setActive({ session: completeSignIn.createdSessionId });
          // Redirect the user to a post sign-in route
          router.push("/");
        }
      } catch (err) {
        // This can return an array of errors.
        // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
        toast(err.message);
        console.error(JSON.stringify(err, null, 2));
      }
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        console.log("success");
        toast("Success");
        router.push("/");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      toast(err.message);
    }
  };

  const signInWith = (strategy) => {
    return signIn.authenticateWithRedirect({
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
                      className="lg:p-6 lg:px-3"
                      id="firstName"
                      placeholder="First name"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="on"
                      autoCorrect="off"
                      disabled={isSubmitting}
                      {...register("firstName")}
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
                      className="lg:p-6 lg:px-3"
                      id="lastName"
                      placeholder="Last name"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect="off"
                      disabled={isSubmitting}
                      {...register("lastName")}
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
                  className="lg:p-6 lg:px-3"
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="on"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...register("email")}
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
                  className="lg:p-6 lg:px-3"
                  id="password"
                  placeholder="********"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-[10px] md:text-[12px] px-2">
                  {errors.password.message}
                </p>
              )}
              <Button
                className="lg:p-6 lg:px-3 text-white bg-[var(--h3)] hover:bg-[#5a3dbb] focus:bg-[#5a3dbb]]"
                disabled={isSubmitting}
              >
                {isSubmitting && <p>Loading</p>}
                {mode === "signup" ? "Sign Up" : "Sign In"}
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
            className="lg:p-6 lg:px-3 border-[1px] border-dashed  border-[#DD5144] hover:bg-[var(--red-hover)] "
            variant="outline"
            type="button"
            disabled={isSubmitting}
            onClick={() => signInWith("oauth_google")}
          >
            {isSubmitting ? <p>Loading</p> : <p>Google</p>}
          </Button>
          <Button
            className="lg:p-6 lg:px-3 border-[1px] border-dashed border-[#4267B2] hover:bg-[var(--blue-hover)] "
            variant="outline"
            type="button"
            disabled={isSubmitting}
            onClick={() => signInWith("oauth_facebook")}
          >
            {isSubmitting ? <p>Loading</p> : <p> Facebook</p>}
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
            className="lg:p-6 lg:px-3 mt-4 bg-[var(--h3)] hover:bg-[#5a3dbb] "
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
