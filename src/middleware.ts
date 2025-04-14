import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/",
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

const privateRoutes = ["/UI/profile"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  console.log("[token]", token);

  const pathname = request.nextUrl.pathname;
  console.log("[pathname]", pathname);

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // ✅ If user is NOT logged in and tries to access a private route
  if (!token && isPrivateRoute) {
    console.log("if1");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPrivateRoute) {
    return NextResponse.next();
  }

  // ✅ If user IS logged in and tries to access a public route
  if (token && isPublicRoute) {
    console.log("if2");
    return NextResponse.redirect(new URL("/UI/profile", request.url));
  }

  console.log("if3");
  // ✅ Otherwise, allow the request
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
    "/UI/profile",
  ],
};
