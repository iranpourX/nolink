'use server'

import axios from 'axios'
import {saveCookie} from "@/app/lib/cookie"

export async function sendPhoneNumber(value: { phone_number: string }) {
    const response = await axios.post('https://api.nolink.ir/auth/login', value)

    const {status, data} = response

    return {
        status,
        data
    }
}

export async function loginWithCode(value: { phone_number: string }) {
    const response = await axios.post('https://api.nolink.ir/auth/loginwithcode', value)

    const {status, data} = response

    return {
        status,
        data
    }
}

export async function loginWithPassword(value: { phone_number: string; password: string; }) {
    const response = await axios.post('https://api.nolink.ir/auth/loginwithpass', value)

    const {status, data} = response

    if (status === 200 && data.status.code === 200) {
        await saveCookie('token', data.data.token, {
            expire: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        })
        await saveCookie('refresh_token', data.data.refresh_token)
    }

    return {
        status,
        data
    }
}