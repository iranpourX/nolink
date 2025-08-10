'use server'

import {cookies} from 'next/headers'
import axios from 'axios'

const tokens = async () => {
    const cookie = await cookies()
    const token = cookie.get('token')?.value
    const refresh_token = cookie.get('refresh_token')?.value

    return {token, refresh_token}
}

export async function login(value: { phone_number: string }) {
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

export async function loginWithPass(value: { phone_number: string; password: string; }) {
    const response = await axios.post('https://api.nolink.ir/auth/loginwithpass', value)

    const {status, data} = response

    if (status === 200 && data.status.code === 200) {
        const set = await cookies()
        set.set('token', data.data.token, {
            secure: true,
            httpOnly: true,
            priority: 'high'
        })

        set.set('refresh_token', data.data.refresh_token, {
            secure: true,
            httpOnly: true,
            priority: 'high'
        })
    }

    return {
        status,
        data
    }
}

export default tokens
