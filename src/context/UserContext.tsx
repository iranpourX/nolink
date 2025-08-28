'use client'

import React, {createContext, useContext, useState} from 'react'
import {useQuery} from "@tanstack/react-query"

type UserContextType = {
    user: User | null
    loading: boolean
    refetchUser: () => void
    showLoginPopup: boolean
    setShowLoginPopup: (callback: boolean) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

async function fetchUser(): Promise<User> {
    const response = await fetch('/api/settings/profile')
    return response.json()
}

export function UserProvider({children}: { children: React.ReactNode }) {
    const [showLoginPopup, setShowLoginPopup] = useState(false)

    const {data: user, isLoading: loading, refetch} = useQuery<User | null>({
        queryKey: ["user"],
        queryFn: fetchUser,
        retry: false,
    })

    return (
        <UserContext.Provider value={{
            user: user ?? null,
            loading,
            refetchUser: refetch,
            showLoginPopup,
            setShowLoginPopup
        }}>
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