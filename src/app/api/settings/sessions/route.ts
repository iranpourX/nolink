import api from "@/app/lib/client";
import {NextResponse} from "next/server";

export async function GET() {
    const response = await api("account/active-sessions", {
        method: "GET"
    })
    const sessions = await response.json()

    return NextResponse.json(sessions.data)
}