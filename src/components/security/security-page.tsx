'use client'

import Sessions from '@/components/security/sessions'
import UpdatePassword from '@/components/security/update-password'

export default function SecurityPage() {
    return (
        <>
            <UpdatePassword/>

            <Sessions/>
        </>
    )
}