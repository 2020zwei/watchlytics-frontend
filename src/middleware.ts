import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenValid } from "./utils/isTokenValid";
const publicRoutes = [
  "/",
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

const privateRoutes = ["/UI/profile", "/UI/inventory", "/UI/subscriptions","/subscription"];

export function middleware(request: NextRequest, response:NextResponse) {
  const token = request.cookies.get("access_token")?.value;
  const pathname = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isLoginPage = pathname === "/login";

  const isInvalidToken = token && !isTokenValid(token);

  if ((isInvalidToken || (!token && isPrivateRoute)) && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPrivateRoute) {
    return NextResponse.next();
  }

  if (token && isPublicRoute && !isLoginPage) {
    return NextResponse.redirect(new URL("/UI/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|.*.png|.*.svg|.*.jpg).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    "/login",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/UI/inventory",
    "/UI/profile",
    "/UI/subscriptions",
    "/subscription"
  ],
};
