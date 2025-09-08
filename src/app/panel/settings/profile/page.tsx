import React from 'react'
import type {Metadata} from 'next'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import HeaderInfo from '@/components/profile/header-info'
import UpdateInfo from '@/components/profile/update-info'

export const metadata: Metadata = {
    title: 'Profile'
}

export default async function Profile() {
    return (
        <>
            <PageBreadcrumb pageTitle="Profile"/>

            <HeaderInfo/>

            <UpdateInfo/>
        </>
    )
}