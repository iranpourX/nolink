import {NextResponse, NextRequest} from 'next/server'

export async function POST(req: NextRequest) {
    const number = await req.json()

    const res = await fetch('https://api.nolink.ir/auth/login', {
        method: 'POST',
        body: JSON.stringify(number),
        headers: {
            'User-Agent': req.headers.get('User-Agent') || '',
            'Content-Type': 'application/json'
        }
    })

    const dataRes = await res.json()

    return NextResponse.json(dataRes)
}
