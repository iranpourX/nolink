"use client"

import type React from 'react'
import {createContext, useState, useContext, useEffect} from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextType = {
    theme: Theme
    toggleTheme: () => void
    selectTheme: (mode: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [theme, setTheme] = useState<Theme>('system')
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null
        const initialTheme = savedTheme || 'system'

        setTheme(initialTheme)
        setIsInitialized(true)
    }, [])

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('theme', theme)
            if (theme === "dark") {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
    }, [theme, isInitialized])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    const selectTheme = (mode: Theme) => {
        setTheme(mode)
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme, selectTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
};
