// import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {setUserAgent} from "@/app/lib/global-fetch";

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get("user-agent") || "Unknown-UA";
    setUserAgent(userAgent);

    // const themePreference = request.cookies.get('token')
    // if (!themePreference) {
    //     if (request.nextUrl.pathname.startsWith('/panel')) {
    //         return NextResponse.redirect(new URL('/signin', request.url))
    //     }
    // } else {
    //     if (request.nextUrl.pathname === '/signin') {
    //         return NextResponse.redirect(new URL('/panel', request.url))
    //     }
    // }
}