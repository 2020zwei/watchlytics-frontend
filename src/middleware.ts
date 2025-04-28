import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isTokenValid } from "./utils/isTokenValid";
const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/me/`
const publicRoutes = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

const privateRoutes = ["/","/dashboard","/profile", "/inventory", "/subscriptions","/subscription","/reports"];
export async function middleware(request: NextRequest, response:NextResponse) {
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

  if (!isInvalidToken && isPublicRoute) {
    return NextResponse.next();
  }

  if ((isInvalidToken || (!token && isPrivateRoute)) && !isLoginPage) {
  
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPrivateRoute) {
    
      const meResponse = await fetch('http://localhost:3000/api/me', {
        headers: {
          Cookie: `access_token=${token}`,
        },
      });
    
      const res = await meResponse.json();
    if (!res.isSubscribed && !pathname.startsWith("/checkout")) {
      return NextResponse.rewrite(new URL('/subscription/', request.url))
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
  

