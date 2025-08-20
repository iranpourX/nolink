import React from 'react'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import ProfilePage from "@/components/profile/profile-page";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Profile'
}

export default async function Profile() {
    return (
        <div className="">
            <PageBreadcrumb pageTitle="Profile"/>

            <ProfilePage/>
        </div>
    )
}