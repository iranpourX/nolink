import React from 'react'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import type {Metadata} from "next"
import UpdatePassword from "@/components/security/update-password"
import Sessions from "@/components/security/sessions"

export const metadata: Metadata = {
    title: 'Security'
}

export default async function Security() {
    return (
        <>
            <PageBreadcrumb pageTitle="Security"/>

            <UpdatePassword/>

            <Sessions/>
        </>
    )
}