'use server'

import 'server-only'

import {cookies} from "next/headers"


export default async function getCookie(name: string) {
    const cookie = await cookies()
    const token = cookie.get(name)?.value
    if (!token) {
        return null
    }

    return token
}