import axios from "axios";
import getCookie from "@/lib/auth/cookie"
import saveCookie from "@/lib/auth/storage";
import {da} from "@faker-js/faker";

const client = axios.create({
    baseURL: 'https://api.nolink.ir/',
    withCredentials: true
})


client.interceptors.request.use(
    async (config) => {
        const token = await getCookie("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Server-side request sent:', config.url);
        return config;
    },
    (error) => {
        // Handle request errors
        console.error('Server-side request error:', error.message);
        return Promise.reject(error);
    }
);

// Response Interceptor
client.interceptors.response.use(
    (response) => {
        // Log successful responses
        console.log('Server-side response received:', response.status);
        return response;
    },
    async (error) => {
        // Handle response errors (e.g., 401 Unauthorized, 500 Internal Server Error)
        if (error.response && error.response.status === 401) {
            console.log('Unauthorized');
        //     const {data, status} = await client.post('/auth/refresh-token', {
        //         token: getCookie("token"),
        //         refresh_token: getCookie("refresh_token")
        //     })
        //     if (status === 200) {
        //         await saveCookie('token', data.data.token);
        //         await saveCookie('refresh_token', data.data.refresh_token);
        //     }
        //
        //     console.log(data)
        //     console.warn('Server-side: Unauthorized access. Token might be expired.');
        //     // Logic to refresh token or redirect to login (if applicable in a server-side context)
        }
        // console.error('Server-side response error:', error.response ? error.response.status : error.message);
        return Promise.reject(error);
    }
);

export default client