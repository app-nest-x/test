import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up", "/api/webhooks(.*)"],
  ignoredRoutes: ["/((?!api|trpc))(_next|.*\\..*|favicon.ico)(.*)"],
});

export const config = {
  matcher: [
    "/((?!api|trpc|_next|.*\\..*|favicon.ico).*)",
    "/",
    "/(api|trpc)(.*)"
  ],
};