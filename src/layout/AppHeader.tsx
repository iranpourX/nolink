"use client";

import React, {useState, useEffect, useRef} from "react"
import {ThemeToggleButton} from "@/components/common/ThemeToggleButton"
import NotificationDropdown from "@/components/header/NotificationDropdown"
import UserDropdown from "@/components/header/UserDropdown"
import {useSidebar} from "@/context/SidebarContext"
import Image from "next/image"
import Link from "next/link"
import {cn} from "@/utils/helper"

const AppHeader: React.FC = () => {
    const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false)

    const {isMobileOpen, toggleSidebar, toggleMobileSidebar} = useSidebar()

    const handleToggle = () => {
        if (window.innerWidth >= 1024) {
            toggleSidebar()
        } else {
            toggleMobileSidebar()
        }
    }

    const toggleApplicationMenu = () => {
        setApplicationMenuOpen(!isApplicationMenuOpen)
    }
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault()
                inputRef.current?.focus()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return (
        <header
            className="sticky top-0 flex w-full bg-white z-99999 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
                <div
                    className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
                    <button
                        className="px-3 py-2 text-gray-500 rounded-lg flex lg:hidden dark:text-gray-400"
                        onClick={handleToggle}
                        aria-label="Toggle Sidebar"
                    >
                        {isMobileOpen ? (
                            <svg
                                className="size-6 dark:fill-gray-200"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path
                                    d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.6 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"/>
                            </svg>
                        ) : (
                            <svg
                                className="size-6 dark:fill-gray-200"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path
                                    d="M0 80c0-8.8 7.2-16 16-16l416 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L16 96C7.2 96 0 88.8 0 80zM0 240c0-8.8 7.2-16 16-16l288 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L16 256c-8.8 0-16-7.2-16-16zM192 400c0 8.8-7.2 16-16 16L16 416c-8.8 0-16-7.2-16-16s7.2-16 16-16l160 0c8.8 0 16 7.2 16 16z"/>
                            </svg>
                        )}
                    </button>

                    <Link href="/" className="lg:hidden">
                        <Image
                            width={154}
                            height={32}
                            className="dark:hidden"
                            src="/images/logo/logo.svg"
                            alt="Logo"
                        />
                        <Image
                            width={154}
                            height={32}
                            className="hidden dark:block"
                            src="/images/logo/logo-dark.svg"
                            alt="Logo"
                        />
                    </Link>

                    <button
                        onClick={toggleApplicationMenu}
                        className="flex px-3 py-2 rounded-lg z-99999 lg:hidden"
                    >
                        <svg
                            className={'size-6 fill-gray-600 dark:fill-gray-200'}
                            xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 448 512">
                            <path
                                d="M416 256a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm-160 0a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM64 288a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"/>
                        </svg>
                    </button>

                </div>
                <div className={cn(
                    'items-center justify-between w-full gap-4 px-5 py-4',
                    'lg:flex shadow-md lg:justify-end lg:px-0 lg:shadow-none',
                    [isApplicationMenuOpen ? 'flex' : 'hidden']
                )}>
                    <div className="flex items-center gap-2 2xsm:gap-3">

                        <ThemeToggleButton/>

                        <NotificationDropdown/>

                    </div>

                    <UserDropdown/>

                </div>
            </div>
        </header>
    );
};

export default AppHeader;
