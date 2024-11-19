import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/login", "/", "/api/webhook(.*)"],
  ignoredRoutes: ["/no-auth-in-this-route"],
});

export const config = {
  matcher: [
    "/api/webhooks(.*)",
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
