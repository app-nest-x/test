import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/sign-in", "/sign-up"];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export default async function middleware(req: NextRequest) {
  const { userId } = await getAuth(req);
  const path = req.nextUrl.pathname;

  if (!isPublic(path) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};