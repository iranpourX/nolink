'use client'

import {useUser} from "@/context/UserContext"
import HeaderInfo from "@/components/profile/header-info"
import UpdateInfo from "@/components/profile/update-info"
import Sessions from "@/components/profile/sessions"

export default function ProfilePage() {
    const {user, loading} = useUser()

    return (
        <>
            <HeaderInfo user={user} loading={loading}/>

            <UpdateInfo user={user}/>

            <Sessions/>
        </>
    )
}