import {NextResponse, NextRequest} from "next/server"
import api from "@/app/lib/client";

export async function POST(req: NextRequest) {
    const formData = await req.formData()

    if (!formData) {
        return NextResponse.json({error: "فایلی ارسال نشد"}, {status: 400})
    }

    const res = await api("account/update-avatar", {
        method: "POST",
        body: formData,
        headers: {
            'User-Agent': req.headers.get('User-Agent') || '',
        }
    })

    const data = await res.json()

    return NextResponse.json(data)
}
