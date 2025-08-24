import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(request: NextRequest) {

    const themePreference = request.cookies.get('token')
    if (!themePreference) {
        if (request.nextUrl.pathname.startsWith('/panel')) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
}