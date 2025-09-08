"use client"

import React, {useState} from "react"
import Image from "next/image"
import {Dropdown} from "../ui/dropdown/Dropdown"
import DropdownItem from "../ui/dropdown/DropdownItem"
import {useUser} from '@/context/UserContext'
import {cn} from "@/utils/helper"

const Skeleton = () => {
    return (<button className="flex items-center animate-pulse">
        <span className="mr-1 overflow-hidden bg-gray-100 dark:bg-gray-600 rounded-full size-12"></span>
    </button>)
}

export default function UserDropdown({toRight}: { toRight?: boolean }) {
    const [isOpen, setIsOpen] = useState(false)
    const {user, loading} = useUser()

    function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation()
        setIsOpen((prev) => !prev)
    }

    function closeDropdown() {
        setIsOpen(false)
    }

    return (
        <div className="relative">

            {
                loading
                    ? (<Skeleton/>)
                    : (<button
                        onClick={toggleDropdown}
                        className="flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle">
                        <span className="overflow-hidden rounded-full size-12">
                            <Image
                                width={48}
                                height={48}
                                src={user?.avatar?.thumbnail ?? '/images/user/default.jpg'}
                                alt="Types"
                                className={`p-0.5 border-2 rounded-full ${isOpen ? "border-blue-400" : "border-gray-200 dark:border-gray-700"}`}
                            />
                        </span>
                    </button>)
            }

            <Dropdown
                isOpen={isOpen}
                onClose={closeDropdown}
                className={cn(
                    'mt-[17px] flex w-[260px] flex-col',
                    'bg-white p-3 dark:border-gray-800 dark:bg-gray-dark',
                    [toRight ? 'left-0' : 'right-0']
                )}>
                <div className={'px-2'}>
                    <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                        {user?.display_name}
                    </span>
                    <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
                        {user?.phone_number}
                    </span>
                </div>

                <ul className="flex flex-col gap-1 py-2 border-b border-gray-200 dark:border-gray-800">
                    <li>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            tag="a"
                            href="/panel/settings/profile">
                            <svg
                                className="size-5 fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512">
                                <path
                                    d="M406.5 399.6C387.4 352.9 341.5 320 288 320l-64 0c-53.5 0-99.4 32.9-118.5 79.6-35.6-37.3-57.5-87.9-57.5-143.6 0-114.9 93.1-208 208-208s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3l64 0c38.8 0 71.2 27.6 78.5 64.3zM256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"/>
                            </svg>
                            Edit profile
                        </DropdownItem>
                    </li>
                </ul>
                <button
                    type={"button"}
                    className={cn(
                        'flex items-center gap-3 p-2 mt-2 font-medium',
                        'text-red-700 rounded-lg group text-sm hover:bg-red-100',
                        'hover:text-red-700 dark:text-red-700 dark:hover:bg-red-400'
                    )}>
                    <svg
                        className={'size-5 fill-red-500 group-hover:fill-red-700'}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path
                            d="M336 64c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-80 0zM4.7 267.3c-6.2-6.2-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6L54.6 240 336 240c8.8 0 16 7.2 16 16s-7.2 16-16 16L54.6 272 171.3 388.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-144-144z"/>
                    </svg>
                    <span>Sign out</span>
                </button>
            </Dropdown>
        </div>
    )
}
