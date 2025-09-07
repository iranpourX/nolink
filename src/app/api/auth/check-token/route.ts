import {NextRequest, NextResponse} from "next/server"

export async function GET(req: NextRequest)  {
    const token = req.cookies.get('token')

    if (!token) {
        return NextResponse.json({hasToken: false}, {status: 200})
    }
    return NextResponse.json({hasToken: true}, {status: 200})
}