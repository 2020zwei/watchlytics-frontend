import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Define arrays for public, private, customer, and photographer routes
const publicRoutes = [
  // "/",
  "/login",
  "/sign-up",
  "/forgot-password",
  "/verify",
  "/create-password",
  "/register",
];

const privateRoutes = [
  "/settings",
  "/chat",
  "/transaction-history",
  "/search",
  "/chat",
  "/profile",
  "/search",
  "/packages",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authState")?.value;
  const userType = request.cookies.get("type")?.value;

  const isCustomer = userType === "0";
  const isAdmin = userType !== "0";

  const pathname = request.nextUrl.pathname;

  // Redirect unauthenticated users trying to access private routes
  if (!token && privateRoutes.some((route) => pathname.includes(route))) {
    console.log("if1");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect authenticated users away from public routes
  if (token && publicRoutes.some((route) => pathname.includes(route))) {
    console.log("if2");
    if (isCustomer)
      return NextResponse.redirect(new URL("/choose-location", request.url)); // Assuming this is the default route after login
    if (isAdmin) {
      console.log("if2 --------");

      return NextResponse.redirect(new URL("/services", request.url)); // Assuming this is the default route after login
    }
    if (pathname === "/") {
      if (isCustomer) {
        return NextResponse.redirect(new URL("/choose-location", request.url));
      }
      if (isAdmin) {
        return NextResponse.redirect(new URL("/services", request.url));
      }
    }
  }

  // Allow access to public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    // console.log("if#");
    if (token) {
      // Redirect logged-in users away from splash screen
      if (pathname === "/") {
        if (isCustomer) {
          return NextResponse.redirect(
            new URL("/choose-location", request.url)
          );
        }
        if (isAdmin) {
          return NextResponse.redirect(new URL("/services", request.url));
        }
      }
    }
    return NextResponse.next();
  }

  // Ensure a token is available for the homepage (/)
  if (token && pathname === "/") {
    if (isCustomer) {
      return NextResponse.redirect(new URL("/choose-location", request.url));
    } else if (isAdmin) {
      return NextResponse.redirect(new URL("/services", request.url));
    }
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
    "/",
    "/login",
    "/sign-up",
    "/forgot-password",
    "/verify",
    "/create-password",
    "/settings",
    "/chat",
    "/choose-location",
    "/search",
    "/upload",
    "/packages",
    "/profile",
    "/search",
    "/detail/:path*",
    "/transaction-history",
    "/create-profile",
    "/stripe-connect",
    "/services",
    "/booking",
    "/register",
  ],
};
