const originalFetch = global.fetch

global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const defaultHeaders: HeadersInit = {
        "User-Agent": "MyNextApp/1.0.0",
    }

    return originalFetch(input, {
        ...init,
        headers: {
            ...defaultHeaders,
            ...(init?.headers || {})
        },
    })
}
