import {NextRequest, NextResponse} from "next/server";
import api from "@/app/lib/client";

export async function GET(req: NextRequest) {
    const response = await api('account/profile', {
        method: "GET",
        headers: {
            'User-Agent': req.headers.get('user-agent') || ''
        }
    })
    const sessions = await response.json()

    return NextResponse.json(sessions.data)
}