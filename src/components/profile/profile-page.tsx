'use client'

import HeaderInfo from "@/components/profile/header-info";

import {useEffect, useState} from "react";
import client from "@/app/lib/client";

interface IUser {
    data?: {
        id: string
        phone_number: string
        user_name: string
        display_name: string
        role: {
            display_name: string
            name: string
        }
    }
    status?: object
}

export default function ProfilePage() {
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        client.get('account/profile')
            .then(({data}) => {
                setUser(data)
            })
    }, [])

    return (
        <>
            <HeaderInfo {...user}/>

        </>
    )
}