'use server'

import {cookies} from "next/headers"

export default async function saveCookie(name: string, token: string, options = {httpOnly: true} ) {
    const cookieStore = await cookies()
    cookieStore.set(name, token, {...options})
}