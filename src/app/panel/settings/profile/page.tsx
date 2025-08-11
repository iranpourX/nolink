'use client'

import React, {useEffect, useState} from 'react'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import client from "@/app/lib/client";
import HeaderInfo from "@/components/profile/header-info"
import UpdateInfo from "@/components/profile/update-info";

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

interface IData {
    data: IUser,
    status: object
}

export default function Profile() {
    const [user, setUser] = useState<IData | null>(null)

    useEffect(() => {
        client.get('account/profile')
            .then(res => {
                setUser(res.data)
            })
    }, []);

    console.log(user)

    return (
        <div className="">
            <PageBreadcrumb pageTitle="Profile"/>

            <HeaderInfo data={user?.data} status={user?.status} />


            {/*<UpdateInfo user={user}/>*/}

        </div>
    )
}