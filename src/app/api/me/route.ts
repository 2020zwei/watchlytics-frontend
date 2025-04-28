import { URLS } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("access_token")?.value;

        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const url = `https://api-dev.watchlytics.io/api${URLS.ME}`


        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await res.json()
        if (!res.ok) {
            console.log(res)
            return NextResponse.json({ isSubscribed: false });
        }
   

        console.log(data,"Ali")

        return NextResponse.json({ isSubscribed: data?.is_subscribed });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ isSubscribed: false });
    }
}
