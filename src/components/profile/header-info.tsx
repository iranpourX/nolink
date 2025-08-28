'use client'

import React, {useState} from "react"
import Card from "@/components/ui/card/card"
import {cn} from "@/utils/helper"
import Image from "next/image"
import HeaderInfoSkeleton from "@/components/skeletons/settings/profile/header-info-skeleton"
import {toast} from "sonner"
import {useUser} from "@/context/UserContext"

const HeaderInfo: React.FC<{ user: User; loading: boolean }> = ({user, loading}) => {
    const [preview, setPreview] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {refetchUser} = useUser()

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        const f: File | null = e.target.files?.[0] || null
        const form = new FormData()
        form.append("Avatar", f as Blob)
        if (f) {
            setPreview(URL.createObjectURL(f))
        }
        try {
            const response = await fetch('/api/settings/profile/avatar', {
                method: "POST",
                body: form
            })
            const data = await response.json()
            if (data.status.code === 200) {
                toast.success(data.status.message)
                refetchUser()
            }
        } catch (err) {
            const e = err as Error
            toast.error(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="mb-10">
            <div className="p-8">
                <div className="flex flex-wrap gap-4 md:flex-nowrap">
                    {loading
                        ? (<HeaderInfoSkeleton/>)
                        : (<>
                            <div className="flex justify-start gap-4">
                                <div className="relative rounded-lg overflow-hidden group">
                                    {
                                        preview
                                            ? (<Image
                                                className={'md:size-40'}
                                                src={preview}
                                                alt={'avatar'} width={160} height={160}/>)
                                            : (<Image
                                                className={'md:size-40'}
                                                src={user?.avatar?.original ?? '/images/user/default.jpg'}
                                                alt={'avatar'} width={160} height={160}/>)
                                    }

                                    {
                                        isLoading
                                            ? (<div
                                                className={'absolute flex items-center justify-center p-2 w-full z-10 bg-black/85 left-0 right-0 bottom-0 top-0'}>
                                                <span className="loader"></span>
                                            </div>)
                                            : (<label htmlFor={'avatar'}
                                                      className={cn(
                                                          'absolute py-1.5 text-sm cursor-pointer w-full text-gray-100 transition-all',
                                                          'text-center z-10 bg-black/70 -bottom-10 left-0 right-0 group-hover:bottom-0'
                                                      )}>
                                                <svg className={'size-5 fill-gray-200 mx-auto'}
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 512">
                                                    <path
                                                        d="M193.1 32c-18.7 0-36.2 9.4-46.6 24.9L120.5 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-56.5 0-26-39.1C355.1 41.4 337.6 32 318.9 32L193.1 32zm-6.7 51.6c1.5-2.2 4-3.6 6.7-3.6l125.7 0c2.7 0 5.2 1.3 6.7 3.6l33.2 49.8c4.5 6.7 11.9 10.7 20 10.7l69.3 0c8.8 0 16 7.2 16 16l0 256c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l69.3 0c8 0 15.5-4 20-10.7l33.2-49.8zM256 384a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 272a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/>
                                                </svg>
                                            </label>)
                                    }

                                    <input hidden={true} id={'avatar'}
                                           name={'Avatar'}
                                           accept={'image/*'} type="file"
                                           onChange={handleChange}/>
                                </div>
                                <div className="flex md:hidden justify-between items-start">
                                    <div className="flex flex-col">
                                        <div className="flex items-center mb-2">
                                    <span
                                        className="text-gray-800 dark:text-gray-100 font-medium text-lg me-1">
                                        {user?.display_name}
                                    </span>
                                            <span className={'me-2'}>
                                        <svg
                                            className="size-5"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path
                                                className="fill-blue-400"
                                                d="M0 256c0 36.8 20.7 68.8 51.1 84.9C41 373.8 49 411 75 437s63.3 34 96.1 23.9C187.2 491.3 219.2 512 256 512s68.8-20.7 84.9-51.1C373.8 471 411 463 437 437s34-63.3 23.9-96.1C491.3 324.8 512 292.8 512 256s-20.7-68.8-51.1-84.9C471 138.2 463 101 437 75s-63.3-34-96.1-23.9C324.8 20.7 292.8 0 256 0s-68.8 20.7-84.9 51.1C138.2 41 101 49 75 75s-34 63.3-23.9 96.1C20.7 187.2 0 219.2 0 256zm136 0c0-6.1 2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l47 47c37-37 74-74 111-111c4.7-4.7 10.8-7 17-7s12.3 2.3 17 7c2.3 2.3 4.1 5 5.3 7.9c.6 1.5 1 2.9 1.3 4.4c.2 1.1 .3 2.2 .3 2.2c.1 1.2 .1 1.2 .1 2.5c-.1 1.5-.1 1.9-.1 2.3c-.1 .7-.2 1.5-.3 2.2c-.3 1.5-.7 3-1.3 4.4c-1.2 2.9-2.9 5.6-5.3 7.9c-42.7 42.7-85.3 85.3-128 128c-4.7 4.7-10.8 7-17 7s-12.3-2.3-17-7c-21.3-21.3-42.7-42.7-64-64c-4.7-4.7-7-10.8-7-17z"/>
                                            <path
                                                className="fill-gray-50"
                                                d="M369 175c9.4 9.4 9.4 24.6 0 33.9L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0z"/>
                                        </svg>
                                    </span>

                                        </div>
                                        <div className="flex items-center justify-start flex-wrap gap-2 pe-2">
                                            <span className="flex items-baseline text-sm font-medium text-gray-400">
                                                <i className="me-1">
                                                    <svg className={'size-3.5 fill-gray-400'}
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path
                                                            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
                                                    </svg>
                                                </i>
                                                {user?.user_name}
                                    </span>
                                            <span className="flex items-center text-sm font-medium text-gray-400">
                                        <i className="me-1">
                                            <svg
                                                className={'size-3.5 fill-green-400'}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512">
                                                <path
                                                    d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                            </svg>
                                        </i>
                                                {user?.role?.name}
                                    </span>
                                        </div>

                                    </div>

                                </div>

                            </div>
                            <div className="grow flex flex-col gap-y-3 justify-between">

                                <div className="hidden md:flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <div className="flex items-center mb-2">
                                            <span
                                                className="text-gray-800 dark:text-gray-100 font-medium text-lg me-1">
                                                {user?.display_name}
                                            </span>
                                            <span className={'me-2'}>
                                                <svg
                                                    className="size-5"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path
                                                        className="fill-blue-400"
                                                        d="M0 256c0 36.8 20.7 68.8 51.1 84.9C41 373.8 49 411 75 437s63.3 34 96.1 23.9C187.2 491.3 219.2 512 256 512s68.8-20.7 84.9-51.1C373.8 471 411 463 437 437s34-63.3 23.9-96.1C491.3 324.8 512 292.8 512 256s-20.7-68.8-51.1-84.9C471 138.2 463 101 437 75s-63.3-34-96.1-23.9C324.8 20.7 292.8 0 256 0s-68.8 20.7-84.9 51.1C138.2 41 101 49 75 75s-34 63.3-23.9 96.1C20.7 187.2 0 219.2 0 256zm136 0c0-6.1 2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l47 47c37-37 74-74 111-111c4.7-4.7 10.8-7 17-7s12.3 2.3 17 7c2.3 2.3 4.1 5 5.3 7.9c.6 1.5 1 2.9 1.3 4.4c.2 1.1 .3 2.2 .3 2.2c.1 1.2 .1 1.2 .1 2.5c-.1 1.5-.1 1.9-.1 2.3c-.1 .7-.2 1.5-.3 2.2c-.3 1.5-.7 3-1.3 4.4c-1.2 2.9-2.9 5.6-5.3 7.9c-42.7 42.7-85.3 85.3-128 128c-4.7 4.7-10.8 7-17 7s-12.3-2.3-17-7c-21.3-21.3-42.7-42.7-64-64c-4.7-4.7-7-10.8-7-17z"/>
                                                    <path
                                                        className="fill-gray-50"
                                                        d="M369 175c9.4 9.4 9.4 24.6 0 33.9L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0z"/>
                                                </svg>
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-start flex-wrap gap-2 pe-2">
                                            <span className="flex items-baseline text-sm font-medium text-gray-400">
                                                <i className="me-1">
                                                    <svg className={'size-3.5 fill-gray-400'}
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path
                                                            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
                                                    </svg>
                                                </i>
                                                {user?.user_name}
                                    </span>
                                            <span className="flex items-center text-sm font-medium text-gray-400">
                                        <i className="me-1">
                                            <svg
                                                className={'size-3.5 fill-green-400'}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512">
                                                <path
                                                    d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                            </svg>
                                        </i>
                                                {user?.role?.name}
                                    </span>
                                        </div>

                                    </div>

                                </div>

                                <div className="flex flex-wrap items-center justify-between">

                                    <div className="flex pe-8">

                                        <div className="flex flex-wrap gap-4">
                                            <div
                                                className="min-w-28 border border-gray-300 dark:border-gray-600 border-dashed rounded-lg py-3 px-4">
                                                <div className="flex items-baseline">
                                                    <i className="me-2">
                                                        <svg className={'size-4'}
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 384 512">
                                                            <path className="fill-gray-300"
                                                                  d="M128 256c42.7 0 85.3 0 128 0c0 61.3 0 122.7 0 184c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40c0-61.3 0-122.7 0-184z"/>
                                                            <path className="fill-blue-500"
                                                                  d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l96 0s0 0 0 0l128 0s0 0 0 0l96 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-160-160z"/>
                                                        </svg>
                                                    </i>
                                                    <div
                                                        className="text-lg font-semibold text-gray-700 dark:text-gray-400">
                                                        $4.50
                                                    </div>
                                                </div>
                                                <div className="font-medium text-sm text-gray-500">Earnings</div>
                                            </div>


                                            <div
                                                className="min-w-28 border border-gray-300 dark:border-gray-600 border-dashed rounded-lg py-3 px-4">
                                                <div className="flex items-baseline">
                                                    <i className="me-2">
                                                        <svg
                                                            className={'size-4'}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 384 512">
                                                            <path className="fill-gray-300"
                                                                  d="M128 72l0 184c42.7 0 85.3 0 128 0c0-61.3 0-122.7 0-184c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40z"/>
                                                            <path className="fill-red-500"
                                                                  d="M128 256s0 0 0 0l-96 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l160 160c12.5 12.5 32.8 12.5 45.3 0l160-160c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-96 0s0 0 0 0l-128 0z"/>
                                                        </svg>
                                                    </i>
                                                    <div
                                                        className="text-lg font-semibold text-gray-700 dark:text-gray-400">75
                                                    </div>
                                                </div>
                                                <div className="font-medium text-sm text-gray-500">Projects</div>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="flex items-center w-full max-w-80 flex-col mt-3">
                                        <div className="flex w-full items-center justify-between mb-1">
                                    <span
                                        className="text-sm font-medium text-gray-500 dark:text-white">Flowbite</span>
                                            <span
                                                className="text-sm font-medium text-gray-500 dark:text-white">45%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                            <div className="bg-blue-600 h-2.5 rounded-full"
                                                 style={{width: '45%'}}></div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </>)
                    }
                </div>
            </div>
        </Card>
    )
}

export default HeaderInfo