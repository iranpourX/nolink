// lib/global-fetch.ts

let currentUserAgent: string | null = null;

// تابع برای ست کردن user-agent از request اصلی
export function setUserAgent(ua: string) {
    currentUserAgent = ua;
}

const originalFetch = global.fetch;

global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const defaultHeaders: HeadersInit = {
        ...(init?.headers || {}),
        ...(currentUserAgent ? {"User-Agent": currentUserAgent} : {}),
    };

    return originalFetch(input, {
        ...init,
        headers: defaultHeaders,
    });
};
