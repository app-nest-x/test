import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in*",
    "/sign-up*",
    "/api/webhooks*",
    "/api/trpc*",
    "/_next*",
    "/favicon.ico",
  ],
  ignoredRoutes: [
    "/((?!api|trpc))(_next|.*\\..*|favicon.ico)(.*)",
    "/api/webhooks(.*)",
    "/_next/static(.*)",
  ],
  debug: process.env.NODE_ENV === 'development'
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};