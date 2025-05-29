import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isTokenValid } from "./utils/isTokenValid";

const baseURL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

const publicRoutes = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

const privateRoutes = [
  "/",
  "/dashboard",
  "/profile",
  "/inventory",
  "/subscriptions",
  "/subscription",
  "/reports",
  "/trading",
  "/add-trading",
];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value || null;
  const pathname = request.nextUrl.pathname;

  const tokenIsValid = token ? isTokenValid(token) : false;
  const isAuthenticated = Boolean(tokenIsValid);

  const isPublicRoute = publicRoutes.includes(pathname);
  const isPrivateRoute = privateRoutes.includes(pathname);

  const redirectTo = (path: string) => {
    const url = new URL(path, request.url);
    if (url.pathname !== pathname) {
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  };

  // 🚫 Prevent unauthenticated access to private routes
  if (isPrivateRoute && !isAuthenticated) {
    return redirectTo("/login");
  }

  // 🚫 Prevent authenticated users from accessing public routes
  if (isPublicRoute && isAuthenticated) {
    return redirectTo("/dashboard");
  }

  // ✅ Authenticated users accessing private routes → check subscription
  if (isAuthenticated && isPrivateRoute) {
    const meResponse = await fetch(`${baseURL}/api/me`, {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });

    const res = await meResponse.json();

    if (!res?.isSubscribed && !pathname.startsWith("/subscription")) {
      return redirectTo("/subscription");
    }
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
