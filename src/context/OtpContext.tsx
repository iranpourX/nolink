"use client"

import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react"
import {useUser} from "@/context/UserContext"

import {toast} from "sonner"

const OtpContext = createContext<OtpContextType | undefined>(undefined)

export function OtpProvider({children}: { children: React.ReactNode }) {
    const [phone, setPhone] = useState<string | null>(null)
    const [page, setPage] = useState<number>(1)
    const [countDown, setCountDown] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const {refetchUser, setShowLoginPopup} = useUser()

    const sendOtp = async (value: { phone_number: string }) => {
        setLoading(true)
        setPhone(value.phone_number)
        try {
            const res = await fetch('/api/auth/send-number', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(value)
            })
            const resJson = await res.json()
            if (res.status === 200) {
                if (resJson.data.exists) {
                    setPage(3)
                } else {
                    setPage(2)
                    const response = await fetch('/api/auth/send-otp', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(value)
                    })
                    const responseJson = await response.json()
                    if (response.status === 200) {
                        toast.success(responseJson.status.message)
                        setCountDown(60)
                    }
                }
            }
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "خطای ناشناخته")
        } finally {
            setLoading(false)
        }
    }

    const withPassword = async (value: { password: string }) => {
        setLoading(true)
        try {
            const res = await fetch('/api/auth/send-password', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    phone_number: phone,
                    password: value.password
                })
            })
            const resJson = await res.json()
            if (res.ok) {
                setShowLoginPopup(false)
                toast.success(resJson.status.message)
                refetchUser()
            }

        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "خطای ناشناخته")
        } finally {
            setLoading(false)
        }
    }

    const withOtp = async (code: string) => {
        setLoading(true)
        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    phone_number: phone,
                    code: code
                })
            })

            const resJson = await res.json()

        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "خطای ناشناخته")
        } finally {
            setLoading(false)
        }
    }

    const backToOtp = async () => {
        setPage(2)
        setCountDown(60)
        // const response = await fetch('/api/auth/send-otp', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         phone_number: phone,
        //     })
        // })
        // const responseJson = await response.json()
        // if (response.status === 200) {
        //     toast.success(responseJson.status.message)
        //     setCountDown(60)
        // }
    }

    useEffect(() => {
        const secondInterval = setInterval(() => {
            setCountDown(prev => (prev - 1 < 0 ? 0 : prev - 1))
        }, 1000)

        return () => {
            clearInterval(secondInterval)
        }
    }, [countDown])

    const resend = () => {
        setCountDown(60)
    }

    const reset = () => {
        setPhone(null)
        setLoading(false)
    }

    return (<OtpContext.Provider
        value={{
            page,
            reset,
            phone,
            resend,
            sendOtp,
            loading,
            withOtp,
            countDown,
            backToOtp,
            withPassword,
        }}>{children}</OtpContext.Provider>)
}

export function useOtp() {
    const ctx = useContext(OtpContext)
    if (!ctx) {
        throw new Error("useOtp باید داخل OtpProvider استفاده شود")
    }
    return ctx
}
