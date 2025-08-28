type User = {
    id: string
    phone_number: string
    user_name: string
    display_name: string
    avatar: {
        original: string
        thumbnail: string
        updated_at: string
    }
    role: {
        display_name: string
        name: string
    }
} | null

type Session = {
    browser: string
    current: boolean
    id: string
    ip_address: string
    is_active: boolean
    last_activity: string
    os: string
}