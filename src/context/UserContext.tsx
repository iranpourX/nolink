'use client'

import React, {createContext, useContext, useState, useEffect, useCallback} from 'react'

type UserContextType = {
    user: User
    loading: boolean
    isAuth: boolean
    showLoginPopup: boolean
    setShowLoginPopup: (callback: boolean) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({children}: { children: React.ReactNode }) {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState(true)
    const [showLoginPopup, setShowLoginPopup] = useState(false)

    const fetchUser = useCallback(async () => {
        try {
            const checkResponse = await fetch('/api/auth/check-token', {
                method: 'GET',
                credentials: 'include',
            })
            const {hasToken} = await checkResponse.json()
            if (!hasToken) {
                setIsAuth(false)
                setUser(null)
                setLoading(false)
                return
            }

            const response = await fetch('/api/settings/profile', {method: 'GET'})
            if (response.ok) {
                const data = await response.json()
                setUser(data)
                setIsAuth(true)
            }
        } catch (err) {
            console.error("خطا در گرفتن کاربر:", err)
        } finally {
            setLoading(false)
        }

    }, [])

    useEffect(() => {
        void fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{isAuth, user, loading, showLoginPopup, setShowLoginPopup}}>
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