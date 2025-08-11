import getCookie from "@/lib/auth/cookie";
import {redirect} from "next/navigation";

export async function client(input: string, init: any) {
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
    const body = {
        "token": token,
        "refresh_token": refresh
    }
    console.log(token)
    console.log(refresh)
    const res = await fetch('https://api.nolink.ir/auth/refresh-token', {
        method: 'post',
        body: JSON.stringify(body)
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

    const expires = parseInt(cookie.split('=')[1])
    return Date.now() > expires


}

export default client