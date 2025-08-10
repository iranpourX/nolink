'use server'

import {cookies} from 'next/headers'
import axios from 'axios'

const client = axios.create({
    baseURL: 'https://api.nolink.ir/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

client.interceptors.request.use(
    async function (config) {
        // Do something before the request is sent
        // For example, add an authentication token to the headers
        // console.log(config)
        const token = await cookies()
        console.log(token.get('token')?.value)
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    async function () {
        // Handle the error
        // return Promise.reject(error);
        console.log('Error in interceptors.request.interceptors')
    }
);

client.interceptors.response.use(
    async function (response) {
        // Do something with the response data
        console.log('Response:', response);
        return response;
    },
    async function (error) {
        // Handle the response error
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error
            console.error('Unauthorized, logging out...');
            // Perform any logout actions or redirect to login page
        }
        return Promise.reject(error);
    }
);

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

export default client
