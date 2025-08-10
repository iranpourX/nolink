import React from 'react'
import {Metadata} from 'next'
import Image from 'next/image'
import {faker} from '@faker-js/faker'
import Card from '@/components/ui/card/card'
import CardHeader from '@/components/ui/card/card-header'
import CardFooter from '@/components/ui/card/card-footer'
import {ThemeToggle} from '@/components/settings/theme-toggle'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'

export const metadata: Metadata = {
    title: 'Settings'
}

export default function Settings() {

    const roles = []
    for (let i = 0; i < 4; i++) {
        roles.push(
            <option key={i}>{faker.person.firstName('female')}</option>
        )
    }

    return (
        <div className="">
            <PageBreadcrumb pageTitle="Settings" showBreadcrumbs={false}/>

            <Card>

                <CardHeader title={`People`}/>

                <div className="px-10">
                    <div
                        className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-b-gray-700">
                        <div className="flex items-center justify-center gap-x-3">
                            <Image
                                src={faker.image.avatar()}
                                className="rounded-full"
                                alt="Avatar"
                                width={36}
                                height={36}
                            />
                            <div className="flex flex-col items-start justify-center gap-y-1">
                                <span className="font-semibold text-sm text-gray-800 dark:text-gray-400">
                                    {faker.person.fullName()}
                                </span>
                                <span className="font-medium text-xs text-gray-500 dark:text-gray-400">
                                    {faker.internet.email()}
                                </span>
                            </div>
                        </div>

                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {roles}
                        </select>
                    </div>
                </div>

                <div className="px-8 my-8">
                    <div className="flex">
                        <span className="w-2/12 font-normal mt-4 text-sm text-gray-700">Link</span>
                        <div className="w-10/12 relative">
                            <input
                                disabled={true}
                                className="w-full border border-gray-200 rounded-lg text-sm bg-gray-50 py-3 pl-4 pr-10"
                            />
                            <span className="absolute right-4 top-3">
                                <svg className="w-5 h-5 fill-gray-400 cursor-pointer" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 448 512">
                                    <path
                                        d="M384 352l-160 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l108.1 0c4.2 0 8.3 1.7 11.3 4.7l67.9 67.9c3 3 4.7 7.1 4.7 11.3L416 320c0 17.7-14.3 32-32 32zM433.9 81.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L224 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l160 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l160 0c35.3 0 64-28.7 64-64l0-32-32 0 0 32c0 17.7-14.3 32-32 32L64 480c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0 0-32-64 0z"/></svg>
                            </span>
                            <br/>
                            <br/>
                            <button
                                className="flex items-center justify-center gap-x-2 py-2 px-3 border border-gray-200 rounded-lg shadow-xs text-sm text-gray-600 dark:text-gray-400 bg-transparent">
                                <svg className="w-4 h-4 fill-gray-400" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512">
                                    <path
                                        d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z"/>
                                </svg>
                                Reset Link
                            </button>
                        </div>
                    </div>
                    <p className="text-sm mt-8 text-gray-600">
                        Click below to RSVP for our exclusive event. Limited spaces
                        available, so dont miss out. Reserve your spot now with this special invitation link!</p>
                </div>

                <CardFooter>
                    <button className="bg-blue-500 font-normal py-2.5 px-4 text-xs text-white rounded-lg">
                        Invite People
                    </button>
                </CardFooter>
            </Card>

            <br/>

            <Card>
                <CardHeader title={`Theme`}/>

                <div className="px-10">
                    <div
                        className="flex py-4 border-b border-gray-200 dark:border-b-gray-700">
                        <div className="w-full">
                            <span className="block font-medium text-base text-gray-700 dark:text-gray-400">
                                Theme mode
                            </span>
                            <span className="block font-normal mb-4 text-sm text-gray-500 dark:text-gray-400">
                                Select or customize your ui theme
                            </span>

                            <ThemeToggle/>

                        </div>
                    </div>
                </div>

                <div className="px-8 my-8">
                    <div className="flex">
                        <span className="w-2/12 font-normal text-sm text-gray-700">
                            Transparent sidebar
                        </span>
                        <div className="w-10/12 relative">

                            <label className="inline-flex items-center cursor-pointer">
                                <span
                                    className="mr-3 text-sm font-normal text-gray-700 dark:text-gray-300">Active</span>
                                <input type="checkbox" value="" className="sr-only peer"/>
                                <div
                                    className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>

                                <p className="text-sm ml-8 text-gray-600 font-normal">
                                    Toggle the transparent sidebar for a sleek interface. Switch it on for transparency
                                    or off for a solid background.
                                </p>
                            </label>

                            <br/>
                        </div>

                    </div>
                </div>

            </Card>

            <br/>

            <Card>

                <CardHeader title={`Public API Key`}/>

                <div className="px-8 my-8">
                    <div className="flex">
                        <span className="w-2/12 font-normal mt-4 text-sm text-gray-700">API Key</span>
                        <div className="w-10/12 relative">
                            <input
                                disabled={true}
                                className="w-full border border-gray-200 rounded-lg text-sm bg-gray-50 py-3 pl-4 pr-10"
                                value={`RSVP?c=12345XYZt`}
                            />
                            <span className="absolute right-4 top-3">
                                <svg className="w-5 h-5 fill-gray-400 cursor-pointer" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 448 512">
                                    <path
                                        d="M384 352l-160 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l108.1 0c4.2 0 8.3 1.7 11.3 4.7l67.9 67.9c3 3 4.7 7.1 4.7 11.3L416 320c0 17.7-14.3 32-32 32zM433.9 81.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L224 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l160 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l160 0c35.3 0 64-28.7 64-64l0-32-32 0 0 32c0 17.7-14.3 32-32 32L64 480c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0 0-32-64 0z"/></svg>
                            </span>

                        </div>
                    </div>
                </div>

            </Card>

        </div>

    );
}