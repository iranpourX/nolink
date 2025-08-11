'use server'

import 'server-only'

import axios from "axios";
import storage from "@/lib/auth/storage";

const nowTimestamp = Date.now()
const oneMinuteInMilliseconds = 60 * 1000
const oneMinuteFromNowTimestamp = nowTimestamp + oneMinuteInMilliseconds

export default async function loginWithPassword(value: { phone_number: string; password: string; }) {
    const response = await axios.post('https://api.nolink.ir/auth/loginwithpass', value)

    const {status, data} = response

    if (status === 200 && data.status.code === 200) {

        await storage('token', data.data.token)
        await storage('refresh_token', data.data.refresh_token)
        await storage('expire', `${oneMinuteFromNowTimestamp}`, {httpOnly: false})

    }

    return {
        status,
        data
    }
}