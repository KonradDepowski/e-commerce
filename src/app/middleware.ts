import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/login?mode=signup", "/"],

  ignoredRoutes: ["/no-auth-in-this-route"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
