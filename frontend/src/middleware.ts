import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/auth/login", "/auth/register", "/pages/parking"];

export function middleware(req: NextRequest) {
   const { pathname } = req.nextUrl;
   const token = req.cookies.get("token")?.value;

   const isPublic = PUBLIC_PATHS.includes(pathname);
   const isAuthPage = pathname.startsWith("/auth");

   if (!isPublic && !token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/((?!_next|static|favicon.ico).*)"],
};
