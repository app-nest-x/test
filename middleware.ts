import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api(.*)",
    "/_next(.*)",
    "/favicon.ico",
    "/public(.*)",
    "/model.glb",
    "/logo.svg",
    "/spendsense.png",
    "/icon.png"
  ],
  ignoredRoutes: [
    "/((?!api|trpc))(_next|.*\\.[\\w]+$)",
    "/api/webhooks(.*)",
  ],
  debug: process.env.NODE_ENV === 'development'
});

export const config = {
  matcher: [
    "/((?!.*\\.[\\w]+$|_next).*)", // exclude static files
    "/",
  ],
};