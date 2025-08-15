'use server'

import {cookies} from "next/headers"

type cookieOptions = {
    httpOnly?: boolean
    expire?: Date
}

export async function getCookie(name: string) {
    const cookie = await cookies()
    const token = cookie.get(name)?.value
    if (!token) {
        return null
    }

    return token
}

export async function saveCookie(name: string, token: string, options: cookieOptions = {httpOnly: true}) {
    const cookieStore = await cookies()
    cookieStore.set(name, token, {...options})
}
