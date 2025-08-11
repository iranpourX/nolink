import getCookie from "@/lib/auth/cookie";
import {redirect} from "next/navigation";
import type {RequestInit} from "undici-types";

export async function client(input: string, init: RequestInit) {
    const isExpired = isTokenExpired()

    if (isExpired) {
        await refreshToken()
    }

    const cookie = await getCookie("token");
    return fetch(`https://api.nolink.ir/${input}`, {
        headers: {
            Authorization: `Bearer ${cookie}`,
        },
        ...init
    })
}

async function refreshToken() {
    const token = await getCookie("token")
    const refresh = await getCookie('refresh_token')

    console.log(token)
    console.log(refresh)
    const res = await fetch('https://api.nolink.ir/auth/refresh-token', {
        method: 'post',
        body: {
            token: token,
            refresh_token: refresh
        }
    })

    if (res.status === 401) {
        redirect('/signin')
    }
}

function isTokenExpired() {
    const cookie = document.cookie
        .split(';')
        .find(cookie => cookie.includes('expire'))

    if (!cookie) {
        return true
    }

    const expires = cookie.split('=')[1]
    if (Date.now() > expires) {
        return true
    }

    return false
}

export default client