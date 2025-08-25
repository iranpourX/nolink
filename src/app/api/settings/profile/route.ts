import {NextRequest, NextResponse} from "next/server"
import api from "@/app/lib/client"

export async function GET(req: NextRequest) {
    const response = await api('account/profile', {
        method: "GET",
        cache: 'no-cache',
        headers: {
            'User-Agent': req.headers.get('user-agent') || ''
        }
    })
    const sessions = await response.json()
    return NextResponse.json(sessions.data)
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const response = await api('account/update-profile', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'User-Agent': req.headers.get('user-agent') || '',
            'Content-Type': 'application/json'
        }
    })

    const profile = await response.json()

    return NextResponse.json(profile)
}