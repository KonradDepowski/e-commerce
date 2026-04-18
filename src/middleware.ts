import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/login",
    "/",
    "/shop",
    "/api/webhook(.*)",
    "/api/webhook/stripe",
    "/favicon.ico",
    "/:productId",
  ],
  ignoredRoutes: ["/no-auth-in-this-route"],
});

export const config = {
  matcher: [
    "/api/webhook(.*)",
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/:productId",
  ],
};
