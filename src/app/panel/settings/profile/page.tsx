'use client'

import React, {useEffect, useState} from 'react'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import Card from "@/components/ui/card/card"
import CardHeader from "@/components/ui/card/card-header"
import Image from "next/image"
import CardFooter from "@/components/ui/card/card-footer"
import Btn from "@/components/ui/button/Btn"
import {cn} from '@/utils/helper'
import {ErrorMessage} from "@hookform/error-message"
import {SubmitHandler, useForm} from "react-hook-form"
import {toast} from "sonner";
import Link from "next/link"
import client from "@/app/lib/client";

interface IFormInputs {
    display_name: string
    user_name: string
    email: string
}

export default function Profile() {
    const [user, setUser] = useState(null)

    useEffect(() => {

        const res = client('account/profile')

        // setUser('asdasdasd')

        console.log(res)
    })

    function HeaderInfo() {

        return (
            <Card className="mb-5 mb-xl-10">
                <div className="p-8">
                    <div className="flex flex-wrap sm:flex-nowrap">
                        <div className="me-7 mb-2">
                            <div className="relative">
                                <Image
                                    className={'rounded-lg'}
                                    src={'/images/user/avatar.jpg'}
                                    alt={'avatar'} width={160} height={160}/>
                                <div
                                    className="absolute bottom-0 shadow -right-2 z-9 border-4 border-gray-50 bg-blue-600 rounded-full size-5"></div>
                            </div>
                        </div>
                        <div className="grow">

                            <div className="flex justify-between items-start mb-2">
                                <div className="flex flex-col">
                                    <div className="flex items-center mb-2">
                                        <span className="text-gray-800 font-medium text-lg me-1">Ali Iranpour</span>
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
                                        <Link href="/" className={cn(
                                            'py-1 px-2 text-2xs flex items-center justify-center',
                                            'text-blue-500 bg-blue-100 font-semibold rounded-md'
                                        )}>Upgrade to Pro</Link>
                                    </div>

                                    <div className="flex items-center justify-center flex-wrap pe-2">
                                        <span
                                            className="flex items-baseline text-sm font-medium text-gray-400 me-5 mb-2">
                                            <i className="me-1">
                                                <svg className={'size-3.5 fill-gray-400'}
                                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path
                                                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                                            </i>
                                            Ali
                                        </span>
                                        <span className="flex items-baseline text-sm font-medium text-gray-400 mb-2">
                                            <i className="me-1">
                                                <svg className={'size-3.5 fill-gray-400'}
                                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path
                                                        d="M64 208.1L256 65.9 448 208.1l0 47.4L289.5 373c-9.7 7.2-21.4 11-33.5 11s-23.8-3.9-33.5-11L64 255.5l0-47.4zM256 0c-12.1 0-23.8 3.9-33.5 11L25.9 156.7C9.6 168.8 0 187.8 0 208.1L0 448c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-239.9c0-20.3-9.6-39.4-25.9-51.4L289.5 11C279.8 3.9 268.1 0 256 0z"/>
                                                </svg>
                                            </i> ali_iranpour1@hotmail.com
                                        </span>
                                    </div>

                                </div>

                            </div>

                            <div className="flex flex-wrap items-center">

                                <div className="flex flex-col grow pe-8">

                                    <div className="flex flex-wrap">
                                        <div
                                            className="min-w-32 border border-gray-300 border-dashed rounded-lg py-3 px-5 me-6 mb-3">
                                            <div className="flex items-center">
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
                                                <div className="text-lg font-semibold text-gray-700">
                                                    $4,500
                                                </div>
                                            </div>
                                            <div className="font-medium text-sm text-gray-400">Earnings</div>
                                        </div>


                                        <div
                                            className="min-w-32 border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                            <div className="flex items-center">
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
                                                <div className="text-lg font-semibold text-gray-700">75</div>
                                            </div>
                                            <div className="font-medium text-sm text-gray-400">Projects</div>

                                        </div>

                                        <div
                                            className="min-w-32 border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                            <div className="flex items-center">
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
                                                <div className="text-lg font-semibold text-gray-700">%60</div>
                                            </div>
                                            <div className="font-medium text-sm text-gray-400">Success Rate</div>

                                        </div>

                                    </div>

                                </div>

                                <div className="flex items-center w-80 flex-col mt-3">

                                    <div className="flex w-full items-center justify-between mb-1">
                                        <span
                                            className="text-sm font-medium text-gray-500 dark:text-white">Flowbite</span>
                                        <span className="text-sm font-medium text-gray-500 dark:text-white">45%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '45%'}}></div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </Card>
        )
    }

    function InfoUpdate() {
        const [loading, setLoading] = useState<boolean>(false)

        const {
            handleSubmit,
            register,
            formState: {errors}
        } = useForm<IFormInputs>()

        const onSubmitInfo: SubmitHandler<IFormInputs> = async () => {
            setLoading(true)

            toast.success('کیر تو جواد')

            setLoading(false)
        }

        return (
            <Card>
                <CardHeader title={`Personal Info`}/>

                <form id="info-form" autoComplete={'off'} onSubmit={handleSubmit(onSubmitInfo)}>
                    <div className="p-9">
                        <div className="flex items-center flex-wrap mb-6">

                            <label htmlFor={'full-name'} className="lg:w-4/12 text-gray-700 w-full mb-2">full name</label>
                            <div className="lg:w-8/12 w-full">
                                <input
                                    id={'full-name'}
                                    autoComplete={'off'}
                                    {...register('display_name', {
                                        min: {
                                            value: 3,
                                            message: 'sadsdadsadasdadssdgijgsdi'
                                        },
                                        max: {
                                            value: 50,
                                            message: 'weweqeqweqeqeqweqeerwerwr'
                                        },
                                        required: 'llllklkllkllklllklklklklk'
                                    })}
                                    defaultValue={'Ali Iranpour'}
                                    className={cn('info-input',
                                        [
                                            errors.display_name &&
                                            'ring-red-500 border-red-500 focus:border-red-500 focus:ring-red-500'
                                        ]
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="display_name"
                                    render={({message}) => <small
                                        className="px-1 text-red-500 text-xs">{message}</small>}
                                />

                                {!errors.display_name && (<small className="h-6 block"></small>)}

                            </div>
                        </div>
                    </div>
                </form>

                <CardFooter>
                    <Btn inType={'submit'} loading={loading} form={'info-form'} size="sm">
                        Save Changes
                    </Btn>
                </CardFooter>

            </Card>
        )
    }

    return (
        <div className="">
            <PageBreadcrumb pageTitle="Profile"/>

            <HeaderInfo/>

            <InfoUpdate/>

        </div>
    )
}