'use server'

import {cookies} from "next/headers"

export async function getCookie(name: string) {
    const cookie = await cookies()
    const token = cookie.get(name)?.value
    if (!token) {
        return null
    }

    return token
}

export async function saveCookie(name: string, token: string, options = {httpOnly: true}) {
    const cookieStore = await cookies()
    cookieStore.set(name, token, {...options})
}
