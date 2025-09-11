type withPassword = {
    phone_number: string
    password: string
}

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
    children: ReactNode
}

type NavItem = {
    name: string
    icon: ReactNode
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

type OtpContextType = {
    phone: string | null
    loading: boolean
    page: number
    sendOtp: (value: { phone_number: string }) => Promise<void>
    withPassword: (value: { password: string }) => Promise<void>
    withOtp: (code: string) => Promise<void>
    backToOtp: () => void
    reset: () => void
    resend: () => void
    countDown: number
}

type LinkContextType = {
    loading: boolean
    shortedData: ShortedLink
    sendLink: (value: CreateLink) => Promise<void>
    open: boolean,
    close: () => void
    QROptions: Options
    setQROptions: (options: Options) => void
}