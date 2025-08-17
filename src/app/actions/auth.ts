'use server'

import {saveCookie} from "@/app/lib/cookie"

export async function sendPhoneNumber(value: { "phone_number": string }) {
    const response = await fetch('https://api.nolink.ir/auth/login', {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    })

    return await response.json()
}

export async function loginWithCode(value: { phone_number: string }) {
    const response = await fetch('https://api.nolink.ir/auth/loginwithcode', {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    })

    return await response.json()
}

export async function loginWithPassword(value: { phone_number: string; password: string; }) {
    const response = await fetch('https://api.nolink.ir/auth/loginwithpass', {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    })
    const res = await response.json()

    if (response.ok) {
        await saveCookie('token', res.data.token)
        await saveCookie('refresh_token', res.data.refresh_token)
    }

    return res
}