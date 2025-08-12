'use client'

import HeaderInfo from "@/components/profile/header-info";

import {useEffect, useState} from "react";
import client from "@/app/lib/client";

interface IUser {
    id: string
    phone_number: string
    user_name: string
    display_name: string
    role: {
        display_name: string
        name: string
    }
}

export default function ProfilePage() {
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {

        client.get('account/profile')
            .then(({status, data}) => {
                setUser(data.data)
            })
    }, [])

    return (
        <>
            <HeaderInfo user={user}/>

        </>
    )
}