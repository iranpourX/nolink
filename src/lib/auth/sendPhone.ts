import axios from "axios";

export default async function login(value: { phone_number: string }) {
    const response = await axios.post('https://api.nolink.ir/auth/login', value)

    const {status, data} = response

    return {
        status,
        data
    }
}