import axios from "axios";
import storage from "./storage"

export default async function loginWithCode(value: { phone_number: string }) {
    const response = await axios.post('https://api.nolink.ir/auth/loginwithcode', value)

    const {status, data} = response

    if (status === 200 && data.status.code === 200) {

        await storage('token', data.data.token)
        await storage('refresh_token', data.data.refresh_token)

    }

    return {
        status,
        data
    }
}