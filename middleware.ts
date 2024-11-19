import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/login", "/", "/api/webhook(.*)", "/api/webhook/stripe"],
  ignoredRoutes: ["/no-auth-in-this-route"],
});
