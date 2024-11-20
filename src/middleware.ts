import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/login",
    "/",
    "/shop",
    "/api/webhook(.*)",
    "/api/webhook/stripe",
    "/_next/static/chunks/app/page.js",
    "/favicon.ico",
    "/:productId",
  ],
  ignoredRoutes: ["/no-auth-in-this-route"],
});

export const config = {
  matcher: [
    "/api/webhooks(.*)",
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/:productId",
  ],
};
