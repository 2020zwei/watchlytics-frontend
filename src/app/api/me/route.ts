import { URLS } from "@/utils/constants";
import { NextResponse,NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const baseURL=process.env.NEXT_PUBLIC_API_BASE_URL
    try {
        const token = req.cookies.get("access_token")?.value;

        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const url = `${baseURL}${URLS.ME}`;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });


        // Check if the response is not JSON (i.e., it might be an HTML page like a 404 or error page)
        if (!res.ok) {
            const errorText = await res.text();  // Get the raw response text
            // console.error("Error response:", errorText);
            return NextResponse.json({ isSubscribed: false });
        }

        try {
            const data = await res.json();
            return NextResponse.json({ isSubscribed: data?.is_subscribed });
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            return NextResponse.json({ isSubscribed: false });
        }
    } catch (error: any) {
        return NextResponse.json({ isSubscribed: false });
    }
}
