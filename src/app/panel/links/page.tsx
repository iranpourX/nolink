"use client"

import React, {useEffect, useState} from 'react'
import {Toaster, toast} from 'sonner'
import PageBreadcrumb from '../../../components/common/PageBreadCrumb'
import {faker} from "@faker-js/faker"
import {cn} from '@/utils/helper'
import Badge from "@/components/ui/badge/Badge";
import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Dialog,
    DialogPanel,
    DialogTitle,
    Field,
    Label,
    DialogBackdrop,
    Textarea,
    Input
} from '@headlessui/react'
import Creatable from 'react-select/creatable'
import Select from "react-select"

export default function Links() {
    const [isOpen, setIsOpen] = useState(false)
    const [links, setLinks] = useState<{
        id: number
        original_link: string
        shorted_link: string
        tags: string
        clicks: number
        categories: string
        last_modified: string
        creators: string
    }[]>([])

    useEffect(() => {
        const ff = []
        for (let i = 0; i < 9; i++) {
            const data = {
                id: faker.number.int(),
                original_link: faker.internet.url(),
                shorted_link: 'amzn.id/ffYHHcGm',
                tags: 'public',
                clicks: faker.number.int({
                    min: 0,
                    max: 100,
                }),
                categories: faker.commerce.productAdjective(),
                last_modified: faker.date.anytime().toDateString(),
                creators: faker.person.firstName()
            }
            ff.push(data)
        }

        setLinks(ff)
    }, [])

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const options = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'}
    ]

    return (
        <div className="">
            <PageBreadcrumb pageTitle="Links" showBreadcrumbs={false}/>

            <TabGroup>
                <TabList className={`border-b flex justify-between items-center`}>
                    <div>
                        <Tab
                            className={`border-b-2 p-3 mr-4 border-transparent focus:outline-0 data-selected:border-b-blue-500 data-selected:text-blue-500`}>All</Tab>
                        <Tab
                            className={`border-b-2 p-3 mr-4 border-transparent focus:outline-0 data-selected:border-b-blue-500 data-selected:text-blue-500`}>Favorites</Tab>
                    </div>

                    <div className="flex items-center gap-3">
                        <form>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Quick Link Generator"
                                    className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-gray-100 py-2 pl-2 pr-24 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-200 focus:outline-hidden focus:ring-1 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-blue-300"
                                />

                                <button
                                    className="absolute right-0.5 top-1/2 flex font-medium -translate-y-1/2 items-center rounded-lg border border-gray-200 bg-white shadow-xs px-3 py-2 text-xs text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                                    Generate
                                </button>
                            </div>
                        </form>
                        <button
                            onClick={() => toast.success('My first toast')}
                            className="bg-gray-50 py-2 px-4 text-sm text-gray-600 shadow border border-gray-200 rounded-lg flex items-center gap-2">
                            <svg className="size-5 fill-gray-400" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M0 73.7C0 50.7 18.7 32 41.7 32l428.6 0c23 0 41.7 18.7 41.7 41.7c0 9.6-3.3 18.9-9.4 26.3L336 304.5l0 143.2c0 17.8-14.5 32.3-32.3 32.3c-7.3 0-14.4-2.5-20.1-7l-92.5-73.4c-9.6-7.6-15.1-19.1-15.1-31.3l0-63.7L9.4 100C3.3 92.6 0 83.3 0 73.7zM55 80L218.6 280.8c3.5 4.3 5.4 9.6 5.4 15.2l0 68.4 64 50.8L288 296c0-5.5 1.9-10.9 5.4-15.2L457 80 55 80z"/>
                            </svg>
                            Filter
                        </button>

                        <button
                            onClick={open}
                            className="bg-blue-500 py-2 px-3 text-sm text-gray-100 border border-blue-500 rounded-lg flex items-center gap-2">
                            Create Link
                        </button>
                    </div>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className="border-gray-200 dark:border-gray-800 my-8">

                            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">

                                <div className="max-w-full overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead
                                            className="px-6 py-3.5 border-t border-gray-100 border-y bg-gray-50 dark:bg-gray-900">
                                        <tr className="font-medium text-gray-600 dark:text-gray-400 text-xs">
                                            <td className="pl-6 pr-1 py-3 text-start">
                                                <label className="inline-flex cursor-pointer">
                                                    <input
                                                        className="size-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60"
                                                        type="checkbox"/>
                                                </label>
                                            </td>
                                            <td className="px-6 py-3 text-start">Link</td>
                                            <td className="px-6 py-3 text-start">Tags</td>
                                            <td className="px-6 py-3 text-start">Clicks</td>
                                            <td className="px-6 py-3 text-start">Category</td>
                                            <td className="px-6 py-3 text-start">Last Modified</td>
                                            <td className="px-6 py-3 text-start">Creators</td>
                                            <td className="px-6 py-3 text-start"></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {links.map((link) => (
                                            <tr key={link.id} className={`border-b border-b-gray-100`}>
                                                <td className="pl-6 pr-1 py-3.5">
                                                    <label
                                                        className="flex items-center cursor-pointer relative">
                                                        <input
                                                            className="size-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60"
                                                            type="checkbox"
                                                        />
                                                    </label>
                                                </td>

                                                <td className="px-4 sm:px-6 py-3.5">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <div
                                                            className="flex p-3 items-center bg-gray-200 justify-center rounded-full text-red-600">
                                                            <span className="text-sm font-medium">JD</span></div>
                                                        <div>
                                                            <span
                                                                className="mb-0.5 block text-sm font-medium text-gray-700 dark:text-gray-400">{link.shorted_link}</span>
                                                            <span
                                                                className="text-gray-500 text-xs dark:text-gray-400">{link.original_link}</span>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className=" px-4 sm:px-6 py-3.5">
                                                    <Badge>{link.tags}</Badge>
                                                </td>
                                                <td className="px-4 sm:px-6 py-3.5">{link.clicks}</td>
                                                <td className="px-4 sm:px-6 py-3.5">{link.categories}</td>
                                                <td className="px-4 sm:px-6 py-3.5">{link.last_modified}</td>
                                                <td className="px-4 sm:px-6 py-3.5">{link.creators}</td>
                                                <td className="px-4 sm:px-6 py-3.5">
                                                    <Menu>
                                                        <MenuButton
                                                            className="data-open:ring-2 ring-blue-400 p-1 rounded-lg">
                                                            <svg
                                                                className="size-5 fill-gray-500"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 128 512">
                                                                <path
                                                                    d="M64 368a48 48 0 1 0 0 96 48 48 0 1 0 0-96zm0-160a48 48 0 1 0 0 96 48 48 0 1 0 0-96zM112 96A48 48 0 1 0 16 96a48 48 0 1 0 96 0z"/>
                                                            </svg>
                                                        </MenuButton>
                                                        <MenuItems
                                                            transition
                                                            anchor="bottom end"
                                                            className="w-64 origin-top-right bg-white shadow rounded-lg border border-gray-200 p-2 text-xs text-gray-600 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                                                        >
                                                            <MenuItem>
                                                                <button
                                                                    role={'button'}
                                                                    className={cn(
                                                                        'flex w-full items-center gap-2 rounded-lg',
                                                                        'my-1 px-3 py-2 data-focus:bg-gray-100'
                                                                    )}
                                                                >
                                                                    <svg className="size-4 fill-gray-400"
                                                                         xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 512 512">
                                                                        <path
                                                                            d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/>
                                                                    </svg>
                                                                    Edit
                                                                </button>
                                                            </MenuItem>
                                                            <MenuItem>
                                                                <button
                                                                    role={'button'}
                                                                    className={cn(
                                                                        'flex w-full items-center gap-2 rounded-lg',
                                                                        'my-1 px-3 py-2 data-focus:bg-gray-100'
                                                                    )}
                                                                >
                                                                    <svg
                                                                        className="size-4 fill-gray-400"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 576 512">
                                                                        <path
                                                                            d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 6-.4 12-1.1 17.9c-14.6-7.3-30.4-12.7-47-15.8c0-.7 0-1.4 0-2.1l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7l8.7-8c5.3 16.1 12.8 31.2 22.2 44.9l-.6 .6c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM432 224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 48-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 0 48c0 8.8 7.2 16 16 16s16-7.2 16-16l0-48 48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0 0-48z"/>
                                                                    </svg>
                                                                    Add to favorites
                                                                </button>
                                                            </MenuItem>
                                                            <MenuItem>
                                                                <button
                                                                    role={'button'}
                                                                    className={cn(
                                                                        'flex w-full items-center gap-2 rounded-lg',
                                                                        'my-1 px-3 py-2 data-focus:bg-gray-100'
                                                                    )}
                                                                >
                                                                    <svg className="size-4 fill-gray-400"
                                                                         xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 192 512">
                                                                        <path
                                                                            d="M56 72a40 40 0 1 1 80 0A40 40 0 1 1 56 72zM16 200c0-13.3 10.7-24 24-24l56 0c13.3 0 24 10.7 24 24l0 264 48 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 512c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0 0-240-32 0c-13.3 0-24-10.7-24-24z"/>
                                                                    </svg>
                                                                    Details
                                                                </button>
                                                            </MenuItem>
                                                            <MenuItem>
                                                                <button
                                                                    role={'button'}
                                                                    className={cn(
                                                                        'flex w-full items-center gap-2 rounded-lg',
                                                                        'my-1 px-3 py-2 data-focus:bg-gray-100'
                                                                    )}
                                                                >
                                                                    <svg className="size-4 fill-gray-400"
                                                                         xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 448 512">
                                                                        <path
                                                                            d="M144 80l0 96-96 0 0-96 96 0zM48 32C21.5 32 0 53.5 0 80l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48L48 32zm96 304l0 96-96 0 0-96 96 0zM48 288c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-96 0zM304 80l96 0 0 96-96 0 0-96zm-48 0l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-96 0c-26.5 0-48 21.5-48 48zM72 120l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16zM88 360c-8.8 0-16 7.2-16 16l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0zM328 120l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16zM256 304l0 160c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-64c0-8.8 7.2-16 16-16s16 7.2 16 16s7.2 16 16 16l64 0c8.8 0 16-7.2 16-16l0-96c0-8.8-7.2-16-16-16s-16 7.2-16 16s-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16s-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16zM368 448a16 16 0 1 0 0 32 16 16 0 1 0 0-32zm64 0a16 16 0 1 0 0 32 16 16 0 1 0 0-32z"/>
                                                                    </svg>
                                                                    QR Code
                                                                </button>
                                                            </MenuItem>
                                                            <MenuItem>
                                                                <button
                                                                    role={'button'}
                                                                    className={cn(
                                                                        'flex w-full items-center gap-2 rounded-lg',
                                                                        'my-1 px-3 py-2 data-focus:bg-gray-100'
                                                                    )}
                                                                >
                                                                    <svg className="size-4 fill-gray-400"
                                                                         xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 576 512">
                                                                        <path
                                                                            d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24L0 136 0 392c0 30.9 25.1 56 56 56l200 0 0-48L56 400c-4.4 0-8-3.6-8-8l0-232 208 0 0-48L48 112l0-88zM336 176l0-128 44.1 0 17 17c9.6 9.6 22.6 15 36.2 15L528 80l0 96-192 0zM288 32l0 160c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L433.3 32c-.8 0-1.7-.3-2.3-.9L409.4 9.4c-6-6-14.1-9.4-22.6-9.4L320 0c-17.7 0-32 14.3-32 32zm48 432l0-128 44.1 0 17 17c9.6 9.6 22.6 15 36.2 15l94.7 0 0 96-192 0zM288 320l0 160c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32l-110.7 0c-.8 0-1.7-.3-2.3-.9l-21.7-21.7c-6-6-14.1-9.4-22.6-9.4L320 288c-17.7 0-32 14.3-32 32z"/>
                                                                    </svg>
                                                                    Duplicate
                                                                </button>
                                                            </MenuItem>
                                                            <MenuItem>
                                                                <button
                                                                    role={'button'}
                                                                    className={cn(
                                                                        'flex w-full items-center gap-2 rounded-lg',
                                                                        'my-1 px-3 py-2 data-focus:bg-gray-100'
                                                                    )}
                                                                >
                                                                    <svg className="size-4 fill-gray-400"
                                                                         xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 448 512">
                                                                        <path
                                                                            d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"/>
                                                                    </svg>
                                                                    Copy Link ID
                                                                </button>
                                                            </MenuItem>
                                                            <div className="my-1 h-px bg-gray-200"/>
                                                            <MenuItem>
                                                                <button
                                                                    role={'button'}
                                                                    className={cn(
                                                                        'flex w-full items-center gap-2 rounded-lg',
                                                                        'my-1 px-3 py-2 data-focus:bg-gray-100'
                                                                    )}
                                                                >
                                                                    <svg className="size-4 fill-gray-400"
                                                                         xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 512 512">
                                                                        <path
                                                                            d="M48 80l0 48 416 0 0-48L48 80zM32 32l448 0c17.7 0 32 14.3 32 32l0 80c0 17.7-14.3 32-32 32L32 176c-17.7 0-32-14.3-32-32L0 64C0 46.3 14.3 32 32 32zM160 248c0-13.3 10.7-24 24-24l144 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-144 0c-13.3 0-24-10.7-24-24zM32 416l0-208 48 0 0 208c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-208 48 0 0 208c0 35.3-28.7 64-64 64L96 480c-35.3 0-64-28.7-64-64z"/>
                                                                    </svg>
                                                                    Archive
                                                                </button>
                                                            </MenuItem>
                                                            <MenuItem>
                                                                <button
                                                                    role={'button'}
                                                                    className={cn(
                                                                        'flex w-full items-center gap-2 rounded-lg',
                                                                        'my-1 px-3 py-2 data-focus:bg-gray-100'
                                                                    )}
                                                                >
                                                                    <svg className="size-4 fill-gray-400"
                                                                         xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 448 512">
                                                                        <path
                                                                            d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"/>
                                                                    </svg>
                                                                    Transfer
                                                                </button>
                                                            </MenuItem>
                                                            <MenuItem>
                                                                <button
                                                                    role={'button'}
                                                                    className={cn(
                                                                        'flex w-full items-center gap-2 rounded-lg',
                                                                        'my-1 px-3 py-2 data-focus:bg-gray-100 text-red-500'
                                                                    )}
                                                                >
                                                                    <svg className="size-4 fill-red-500"
                                                                         xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 448 512">
                                                                        <path
                                                                            d="M177.1 48l93.7 0c2.7 0 5.2 1.3 6.7 3.6l19 28.4-145 0 19-28.4c1.5-2.2 4-3.6 6.7-3.6zM354.2 80L317.5 24.9C307.1 9.4 289.6 0 270.9 0L177.1 0c-18.7 0-36.2 9.4-46.6 24.9L93.8 80 80.1 80 32 80l-8 0C10.7 80 0 90.7 0 104s10.7 24 24 24l11.6 0L59.6 452.7c2.5 33.4 30.3 59.3 63.8 59.3l201.1 0c33.5 0 61.3-25.9 63.8-59.3L412.4 128l11.6 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-8 0-48.1 0-13.7 0zm10.1 48L340.5 449.2c-.6 8.4-7.6 14.8-16 14.8l-201.1 0c-8.4 0-15.3-6.5-16-14.8L83.7 128l280.6 0z"/>
                                                                    </svg>
                                                                    Delete
                                                                </button>
                                                            </MenuItem>
                                                        </MenuItems>
                                                    </Menu>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel>Content 2</TabPanel>
                </TabPanels>
            </TabGroup>


            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <DialogBackdrop className="fixed z-99999 inset-0 bg-black/40"/>
                <div className="fixed inset-0 z-999999 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-start justify-center pt-16 px-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-xl shadow border rounded-lg bg-white backdrop-blur-2xl duration-200 ease-out data-closed:transform-[scale(98%)] data-closed:opacity-0"
                        >
                            <DialogTitle as="span"
                                         className="text-base flex items-center justify-between border-b p-4 font-semibold text-gray-800">
                                <p className="flex">New Link</p>

                                <button
                                    onClick={close}
                                    className="border border-transparent p-1"
                                >
                                    <svg className="size-5 fill-gray-600" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 384 512">
                                        <path
                                            d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/>
                                    </svg>
                                </button>
                            </DialogTitle>

                            <TabGroup>
                                <TabList
                                    className={`border-b px-4 mt-3 flex justify-start items-center text-xs gap-6 text-gray-700`}>
                                    <Tab
                                        className={`border-b-2 py-3 border-transparent focus:outline-0 data-selected:border-b-blue-500 data-selected:text-blue-500 data-selected:font-medium`}>General</Tab>
                                    <Tab
                                        className={`border-b-2 py-3 border-transparent focus:outline-0 data-selected:border-b-blue-500 data-selected:text-blue-500 data-selected:font-medium`}>Password</Tab>
                                    <Tab
                                        className={`border-b-2 py-3 border-transparent focus:outline-0 data-selected:border-b-blue-500 data-selected:text-blue-500 data-selected:font-medium`}>Expiration</Tab>
                                    <Tab
                                        className={`border-b-2 py-3 border-transparent focus:outline-0 data-selected:border-b-blue-500 data-selected:text-blue-500 data-selected:font-medium`}>QR
                                        code</Tab>
                                    <Tab
                                        className={`border-b-2 py-3 border-transparent focus:outline-0 data-selected:border-b-blue-500 data-selected:text-blue-500 data-selected:font-medium`}>Preview</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        <Field className="p-4">
                                            <Label className="my-label">
                                                Destination URL
                                            </Label>
                                            <Input
                                                placeholder={`Paste your URL here`}
                                                className="my-input"
                                            />
                                        </Field>
                                        <Field className="px-4 py-2">
                                            <Label className="my-label">Shortened link</Label>
                                            <div className="flex">
                                                <span
                                                    className="inline-flex items-center px-3 text-sm text-blue-500 bg-blue-50 border border-r-0 rounded-r-none border-blue-300 rounded-l-lg">
                                                    no.link
                                                </span>
                                                <input
                                                    type="text"
                                                    id="website-admin"
                                                    className={cn(
                                                        'rounded-r-lg bg-gray-50 border text-gray-900',
                                                        'focus:ring-blue-400 focus:ring-1 focus:border-blue-400',
                                                        'block w-full text-sm border-gray-300 p-2.5 focus:outline-0',
                                                        'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
                                                        'dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                                    )}
                                                />
                                            </div>
                                        </Field>

                                        <Field className="px-4 py-2">
                                            <Label className="my-label">Tags</Label>
                                            <Creatable isMulti={true} options={options}/>
                                        </Field>

                                        <Field className="px-4 py-2">
                                            <Label className="my-label">Category</Label>
                                            <Select options={options}/>
                                        </Field>

                                        <Field className="px-4 py-2">
                                            <Label className="my-label">Comment</Label>
                                            <Textarea
                                                className={cn(
                                                    'block w-full resize-none rounded-lg',
                                                    'border border-gray-300 bg-white px-3 py-2 text-sm',
                                                    'text-gray-800 focus:not-data-focus:outline-none',
                                                    'data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                                )}
                                                rows={5}
                                                placeholder="Leave your comments here"
                                            />
                                        </Field>
                                    </TabPanel>

                                    <TabPanel>
                                        <Field className="p-4">
                                            <Label className="my-label">
                                                Destination URL
                                            </Label>
                                            <Input
                                                placeholder={`Paste your URL here`}
                                                className="my-input"
                                            />
                                        </Field>
                                        <Field className="px-4 py-2">
                                            <Label className="my-label">
                                                Destination URL
                                            </Label>
                                            <Input
                                                placeholder={`Paste your URL here`}
                                                className="my-input"
                                            />
                                        </Field>
                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>

                            <div className="mt-4 bg-gray-50 border-t rounded-b-lg p-4 flex items-center justify-end">
                                <button
                                    className="rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium text-white focus:outline-0"
                                    onClick={close}
                                >
                                    Create Link
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            <Toaster richColors/>
        </div>
    )
}