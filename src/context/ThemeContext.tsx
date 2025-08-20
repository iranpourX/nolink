"use client"

import {createContext, useContext, useEffect, useState, ReactNode} from "react"

type Theme = "light" | "dark"

type ThemeContextType = {
    theme: Theme
    toggleTheme: () => void
    selectTheme: (mode: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({children}: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light")

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null
        if (savedTheme) {
            setTheme(savedTheme)
            document.documentElement.classList.add(savedTheme)
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            setTheme(prefersDark ? "dark" : "light")
            document.documentElement.classList.add(prefersDark ? "dark" : "light")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
        document.documentElement.classList.remove(theme)
        document.documentElement.classList.add(newTheme)
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

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme باید داخل ThemeProvider استفاده شود")
    }
    return context
}
