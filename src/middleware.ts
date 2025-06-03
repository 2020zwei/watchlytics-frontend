import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenValid } from "./utils/isTokenValid";

const baseURL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

const publicRoutes = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

const privateRoutePrefixes = [
  "/dashboard",
  "/profile",
  "/inventory",
  "/subscriptions",
  "/transaction",
  "/add-transaction",
  "/subscription",
  "/reports",
  "/trading",
  "/add-trading",
  "/customers",
  "/invoices",
  "/checkout"
];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value || null;
  const pathname = request.nextUrl.pathname;

  const tokenIsValid = token ? isTokenValid(token) : false;
  const isAuthenticated = Boolean(tokenIsValid);

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  const isPrivateRoute =
    pathname === "/" || privateRoutePrefixes.some((route) => pathname.startsWith(route));

  const redirectTo = (path: string) => {
    const url = new URL(path, request.url);
    if (url.pathname !== pathname) {
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  };


  if (isPrivateRoute && !isAuthenticated) {
    return redirectTo("/login");
  }

  if (isAuthenticated && isPrivateRoute) {
    try {
      const meResponse = await fetch(`${baseURL}/api/me`, {
        headers: {
          Cookie: `access_token=${token}`,
        },
      });

      const res = await meResponse.json();

      if (
        !res?.isSubscribed &&
        !pathname.startsWith("/subscription") &&
        !pathname.startsWith("/checkout")
      ) {
        return redirectTo("/subscription");
      }
    } catch (error) {
      return redirectTo("/login");
    }
  }

  if (isPublicRoute && isAuthenticated) {
    return redirectTo("/dashboard");
  }

  if (pathname === "/") {
    return redirectTo("/dashboard");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/dashboard",
    "/profile",
    "/inventory/:path*",
    "/subscriptions/:path*",
    "/transaction/:path*",
    "/subscription",
    "/reports/:path*",
    "/trading/:path*",
    "/invoices/:path*",
    "/add-trading",
    "/customers/:path*",
    "/checkout/:path*",
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|.*.png|.*.svg|.*.jpg).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};