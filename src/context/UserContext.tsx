'use client'

import React, {createContext, useContext, useState, useEffect} from 'react'

type User = {
    id: string
    phone_number: string
    user_name: string
    display_name: string
    role: {
        display_name: string
        name: string
    }
} | null

type UserContextType = {
    user: User
    loading: boolean
    setUser: (user: User) => void
    showLoginPopup: boolean
    setShowLoginPopup: (callback: boolean) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState(true)
    const [showLoginPopup, setShowLoginPopup] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/settings/profile', {method: 'GET'})
                if (response.ok) {
                    const data = await response.json()
                    setUser(data)
                }
            } catch (err) {
                console.error("خطا در گرفتن کاربر:", err)
            } finally {
                setLoading(false)
            }
        }

        void fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{user, loading, setUser, showLoginPopup, setShowLoginPopup}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser باید داخل UserProvider استفاده شود")
    }
    return context
}