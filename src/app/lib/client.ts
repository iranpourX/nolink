import axios from "axios";
import {getCookie} from "@/app/lib/cookie";
import {redirect} from "next/navigation";

const client = axios.create({
    baseURL: 'https://api.nolink.ir/'
})

client.interceptors.request.use(async (config) => {
    const token = await getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        redirect('/signin')
    }
    return config
}, async (error) => {
    return Promise.reject(error)
})

export default client