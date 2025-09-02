type User = {
    id?: string
    phone_number?: string
    user_name?: string
    display_name?: string
    avatar: {
        original: string
        thumbnail: string
        updated_at?: string
    } | null
    role?: {
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

type DropdownItemProps = {
    tag?: "a" | "button"
    href?: string
    onClick?: () => void
    onItemClick?: () => void
    className?: string
    children: React.ReactNode
}

type NavItem = {
    name: string
    icon: React.ReactNode
    path?: string
    subItems?: {
        name: string
        path: string
        pro?: boolean
    }[]
}

type CreateLink = {
    url: string
    domain_id: string
}

type ShortedLink = {
    id: string
    original_url: string
    short_url: string
    is_active: boolean
    has_password: boolean
    user_title: string
    start_date: string
    end_date: string
    description: string
    update_url: string
    delete_url: string
} | null
