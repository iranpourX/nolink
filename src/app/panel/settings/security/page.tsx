import React from 'react'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import SecurityPage from "@/components/security/security-page";
import type {Metadata} from "next"

export const metadata: Metadata = {
    title: 'Security'
}

export default async function Security() {
    return (
        <div className="">
            <PageBreadcrumb pageTitle="Security"/>

            <SecurityPage/>
        </div>
    )
}