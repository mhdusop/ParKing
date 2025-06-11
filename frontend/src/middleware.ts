import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/pages/auth/login", "/pages/auth/register"];

export function middleware(req: NextRequest) {
   const { pathname } = req.nextUrl;
   const token = req.cookies.get("token")?.value;

   const isPublic = PUBLIC_PATHS.includes(pathname);

   if (!isPublic && !token) {
      return NextResponse.redirect(new URL("/pages/auth/login", req.url));
   }

   if (token && isPublic) {
      return NextResponse.redirect(new URL("/pages/parking", req.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/((?!_next|static|favicon.ico).*)"],
};
