import React from 'react'
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
    data: {
        data: IUser,
        status: object
    }
}

export default async function Profile() {

    const {data: {data: user}}: IData = await client.get('account/profile')



    return (
        <div className="">
            <PageBreadcrumb pageTitle="Profile"/>

            <HeaderInfo user={user}/>


            <UpdateInfo user={user}/>

        </div>
    )
}