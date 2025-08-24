import {getCookie} from '@/app/lib/cookie'

export default async function api(url: string, options?: RequestInit) {
    const token = await getCookie('token')

    if (!token) {
        console.log('Authentication token not found.')
    }

    const headers = {
        ...options?.headers,
        'Authorization': `Bearer ${token}`
    }

    return await fetch(`https://api.nolink.ir/${url}`, {
        credentials: 'include',
        ...options,
        headers
    })
}