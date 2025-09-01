import {NextResponse, NextRequest} from 'next/server'
import api from '@/app/lib/client'

export async function POST(req: NextRequest) {
    const data = await req.json()

    const res = await api('links/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'User-Agent': req.headers.get('User-Agent') || '',
            'Content-Type': 'application/json'
        }
    })

    const dataRes = await res.json()

    return NextResponse.json(dataRes)
}
