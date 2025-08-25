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
