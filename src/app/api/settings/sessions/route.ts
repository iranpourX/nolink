import api from "@/app/lib/client";
import {NextRequest, NextResponse} from "next/server"

export async function GET(req: NextRequest) {
    const response = await api("account/active-sessions", {
        method: "GET",
        headers: {
            'User-Agent': req.headers.get('user-agent') || ''
        }
    })
    const sessions = await response.json()

    return NextResponse.json(sessions.data)
}