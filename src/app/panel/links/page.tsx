"use client"

import React from 'react'
import {Toaster} from 'sonner'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'

export default function Links() {

    return (
        <div className="flex">
            <PageBreadcrumb pageTitle="Links" showBreadcrumbs={false}/>

            <Toaster richColors/>
        </div>
    )
}