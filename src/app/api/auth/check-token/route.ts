import {NextResponse} from "next/server"
import {getCookie} from "@/app/lib/cookie"

export async function GET() {
    const token = await getCookie('token')
    if (!token) {
        return NextResponse.json({hasToken: false}, {status: 200})
    }
    return NextResponse.json({hasToken: true}, {status: 200})
}