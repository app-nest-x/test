import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api(.*)",
  ],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [
    "/((?!api|trpc))(_next|.*\\..*|favicon.ico)(.*)",
    "/api/webhooks(.*)",
    "/_next/static/(.*)",
    "/_next/image(.*)",
    "/favicon.ico",
    "/icon.png",
    "/model.glb",
    "/logo.svg",
    "/spendsense.png",
  ],
  debug: process.env.NODE_ENV === 'development'
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};