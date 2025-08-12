import React from 'react'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import ProfilePage from "@/components/profile/profile-page";

export default async function Profile() {
    return (
        <div className="">
            <PageBreadcrumb pageTitle="Profile"/>

            <ProfilePage/>
        </div>
    )
}