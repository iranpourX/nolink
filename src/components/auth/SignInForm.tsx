"use client"

import React, {useEffect, useState} from 'react'
import {Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react'
import {useUser} from "@/context/UserContext"
import UserDropdown from "@/components/header/UserDropdown"
import {ThemeToggleButton} from "@/components/common/ThemeToggleButton"
import {useOtp} from '@/context/OtpContext'
import GetNumber from "@/components/auth/GetNumber";
import WithPassword from "@/components/auth/WithPassword";
import {WithOTP} from "@/components/auth/WithOTP";

export default function SignInForm() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {showLoginPopup, setShowLoginPopup, user} = useUser()
    const {page} = useOtp()

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
        setShowLoginPopup(false)
    }

    useEffect(() => {
        setIsOpen(showLoginPopup)
    }, [showLoginPopup])

    return (
        <>
            <div className="flex items-center gap-4">
                {!!user
                    ? (<UserDropdown toRight={true}/>)
                    : (<button
                        onClick={open}
                        type={'button'}
                        className="px-6 py-3 text-sm bg-white rounded-lg shadow flex justify-center items-center gap-3">
                        ورود | ثبت نام
                        <svg
                            className={'size-5 fill-gray-600 rotate-180'}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path
                                d="M347.3 267.3c6.2-6.2 6.2-16.4 0-22.6l-128-128c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L297.4 240 16 240c-8.8 0-16 7.2-16 16s7.2 16 16 16l281.4 0L196.7 372.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l128-128zM336 448c-8.8 0-16 7.2-16 16s7.2 16 16 16l96 0c44.2 0 80-35.8 80-80l0-288c0-44.2-35.8-80-80-80l-96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l96 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-96 0z"/>
                        </svg>
                    </button>)
                }

                <ThemeToggleButton/>

            </div>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <DialogBackdrop className="fixed inset-0 bg-black/40"/>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel transition
                                     className="w-full max-w-sm rounded-lg bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                            {
                                (() => {
                                    switch (page) {
                                        case 1:
                                            return (<GetNumber/>)
                                        case 2:
                                            return (<WithOTP/>)
                                        case 3:
                                            return (<WithPassword/>)
                                    }
                                })()
                            }

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}


