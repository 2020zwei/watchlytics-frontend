import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isTokenValid } from "./utils/isTokenValid";
const baseURL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL
const publicRoutes = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

const privateRoutes = ["/", "/dashboard", "/profile", "/inventory", "/subscriptions", "/subscription", "/reports", "/trading", "/add-trading"];
export async function middleware(request: NextRequest, response: NextResponse) {
  const token = request.cookies.get("access_token")?.value;
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
  const isLoginPage = pathname === "/login";
  const isRootPath = pathname === "/";

  const isInvalidToken = token && !isTokenValid(token);
  if (token && token !== 'undefined' && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isInvalidToken && isPublicRoute) {
    return NextResponse.next();
  }

  if ((isInvalidToken || (!token && isPrivateRoute)) && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isRootPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (token && isPrivateRoute) {
    const meResponse = await fetch(`${baseURL}/api/me`, {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });

    const res = await meResponse.json();

    if (!res.isSubscribed && !pathname.startsWith("/checkout")) {
      return NextResponse.rewrite(new URL('/subscription/', request.url));
    }

    return NextResponse.next();
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
    "/inventory",
    "/reports",
    "/profile",
    "/subscriptions",
    "/subscription",
    "/trading",
    "/add-trading",
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


