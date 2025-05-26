import { NextResponse } from "next/server";

export async function GET() {
    const baseURL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL
    const response = NextResponse.redirect(new URL("/login", baseURL));

    response.cookies.set("access_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(0),
    });

    return response;
}
