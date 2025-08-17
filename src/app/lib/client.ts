import {getCookie} from '@/app/lib/cookie'

export default async function api(url: string, options?: RequestInit) {
    const token = await getCookie('token')

    if (!token) {
        throw new Error('Authentication token not found.')
    }

    const headers = {
        ...options?.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }

    const response = await fetch(`https://api.nolink.ir/${url}`, {
        credentials: 'include',
        ...options,
        headers,
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'API request failed')
    }

    return response
}