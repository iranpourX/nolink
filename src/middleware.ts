import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"

const protectedRoutes = ["/panel"]

export function middleware(req: NextRequest) {
    const {pathname} = req.nextUrl

    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        const token = req.cookies.get("token")?.value

        if (!token) {
            const loginUrl = new URL("/", req.url)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/panel/:path*"]
}
