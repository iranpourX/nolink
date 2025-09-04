import {NextResponse, NextRequest} from 'next/server'
import {saveCookie} from "@/app/lib/cookie";

export async function POST(req: NextRequest) {
    const num_with_pass = await req.json()

    const res = await fetch('https://api.nolink.ir/auth/loginwithpass', {
        method: 'POST',
        body: JSON.stringify(num_with_pass),
        headers: {
            'User-Agent': req.headers.get('User-Agent') || '',
            'Content-Type': 'application/json'
        }
    })

    const dataRes = await res.json()

    if (res.ok) {
        await saveCookie('token', dataRes.data.token)
        await saveCookie('refresh_token', dataRes.data.refresh_token)
    }

    return NextResponse.json(dataRes)
}
