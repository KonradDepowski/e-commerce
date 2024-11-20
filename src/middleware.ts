import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/login",
    "/",
    "/api/webhook(.*)",
    "/api/webhook/stripe",
    "/_next/static/chunks/app/page.js", // Add specific static assets here
    "/favicon.ico", // Allow public access to favicon
  ],
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
