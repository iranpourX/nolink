'use client'

import React, {createContext, ReactNode, useContext, useState} from 'react'
import {toast} from "sonner"

const LinkContext = createContext<LinkContextType | undefined>(undefined)

export function LinkProvider({children}: { children: ReactNode }) {
    const [shortedData, setShortedData] = useState<ShortedLink | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [QROptions, setQROptions] = useState({
        width: 240,
        height: 240,
        type: 'canvas',
        data: null,
        margin: 10,
        qrOptions: {
            typeNumber: 0,
            mode: 'Byte',
            errorCorrectionLevel: 'Q'
        },
        imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 20,
            crossOrigin: 'anonymous',
            saveAsBlob: true,
        }
    })

    const sendLink = async (value: CreateLink) => {
        setLoading(true)
        try {
            const res = await fetch('/api/home', {
                method: 'POST',
                body: JSON.stringify({
                    url: value.url,
                    domain_id: '5191ef90-41b5-ef11-84ee-901b0e934f17'
                })
            })
            const json = await res.json()
            if (res.ok) {
                setShortedData(json)
                setQROptions(op => ({
                    ...op,
                    data: json.short_url
                }))
                setOpen(true)
            }
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "خطای ناشناخته")
        } finally {
            setLoading(false)
        }
    }

    const close = () => {
        setOpen(false)
    }

    return (<LinkContext.Provider
        value={{
            loading,
            shortedData,
            sendLink,
            open,
            close,
            QROptions,
            setQROptions
        }}>
        {children}
    </LinkContext.Provider>)
}

export function useLink() {
    const context = useContext(LinkContext)
    if (!context) {
        throw new Error("useUser باید داخل LinkProvider استفاده شود")
    }
    return context
}