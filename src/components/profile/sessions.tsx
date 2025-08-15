'use client'

import Card from "@/components/ui/card/card";
import CardHeader from "@/components/ui/card/card-header";
import React, {useEffect, useState} from "react";
import client from "@/app/lib/client";
import {toast} from "sonner";
import {useRouter} from "next/navigation"

type ISessions = {
    browser: string
    current: boolean
    id: string
    ip_address: string
    is_active: boolean
    last_activity: string
    os: string
}

export const SessionsSkeleton = () => {
    return (
        <>

            {[...Array(3)].map((x, i) =>
                <div key={i}
                     className="py-4 flex animate-pulse items-center border-b last:border-none border-gray-100 dark:border-gray-700">
                    <div className={'size-9 rounded-lg bg-gray-200 dark:bg-gray-600'}></div>
                    <div className="ms-3 flex flex-col gap-1.5">
                        <div className="bg-gray-200 dark:bg-gray-600 rounded-lg p-2.5 w-48"></div>
                        <div className="bg-gray-200 dark:bg-gray-600 rounded-lg p-2 w-56"></div>
                    </div>
                    <div className={'flex grow justify-end'}>
                        <span className={'bg-gray-200 dark:bg-gray-600 p-2.5 rounded-lg'}></span>
                    </div>
                </div>
            )}
        </>
    )
}

const Sessions = () => {
    const [sessions, setSessions] = useState<ISessions[]>([])
    const router = useRouter()

    const getSessions = async () => {
        return await client.get('account/active-sessions')
    }

    useEffect(() => {
        getSessions().then(({status, data}) => {
            if (status === 200 && data.status.code === 200) {
                setSessions(data.data)
            }
        })
    }, [])

    const remove = async (id: string) => {
        const {status, data} = await client.post(`account/remove-session/${id}`)
        if (status === 200 && data.status.code === 200) {
            toast.success(data.status.message)
        }
        router.refresh()
    }

    return (
        <>
            <Card>
                <CardHeader title={'Sessions'}/>

                <div className="p-8">
                    {sessions.length > 0
                        ? (sessions.map((session: ISessions) => (
                            <div
                                key={session.id}
                                className="py-4 flex items-center border-b last:border-none border-gray-100 dark:border-gray-700">
                                <div>
                                    {
                                        session.os === 'Windows'
                                            ? (<svg
                                                className={'size-9 fill-gray-600 dark:fill-gray-400'}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 576 512">
                                                <path
                                                    d="M512 32L64 32C46.3 32 32 46.3 32 64l0 192 512 0 0-192c0-17.7-14.3-32-32-32zm64 224l0 32 0 64c0 35.3-28.7 64-64 64l-149.1 0 10.7 64 58.4 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-72 0-144 0-72 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l58.4 0 10.7-64L64 416c-35.3 0-64-28.7-64-64l0-64 0-32L0 64C0 28.7 28.7 0 64 0L512 0c35.3 0 64 28.7 64 64l0 192zM32 288l0 64c0 17.7 14.3 32 32 32l167.7 0c.2 0 .4 0 .6 0l111.5 0c.2 0 .4 0 .6 0L512 384c17.7 0 32-14.3 32-32l0-64L32 288zM234.9 480l106.2 0-10.7-64-84.9 0-10.7 64z"/>
                                            </svg>)
                                            : (<svg
                                                className={'size-9 fill-gray-600 dark:fill-gray-400'}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 384 512">
                                                <path
                                                    d="M96 32C78.3 32 64 46.3 64 64l0 384c0 17.7 14.3 32 32 32l192 0c17.7 0 32-14.3 32-32l0-384c0-17.7-14.3-32-32-32L96 32zM32 64C32 28.7 60.7 0 96 0L288 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64L32 64zM160 400l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                                            </svg>)
                                    }
                                </div>

                                <div className="ms-3 flex flex-col gap-1.5">
                                    <div className="text-sm text-gray-700 dark:text-gray-400">
                                        {session.os} - {session.browser}
                                    </div>

                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {session.ip_address},

                                        {
                                            session.current
                                                ? (<span className="text-green-500 font-semibold"> This device</span>)
                                                : (` Last active ${session.last_activity}`)
                                        }

                                    </div>
                                </div>
                                <div className={'flex grow justify-end'}>
                                    <button
                                        onClick={() => remove(session.id)}
                                        type="button">
                                        <svg
                                            className={'size-5 fill-red-600'}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512">
                                            <path
                                                d="M164.2 39.5L148.9 64l150.3 0L283.8 39.5c-2.9-4.7-8.1-7.5-13.6-7.5l-92.5 0c-5.5 0-10.6 2.8-13.6 7.5zM311 22.6L336.9 64 384 64l32 0 16 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0 0 336c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80L32 96 16 96C7.2 96 0 88.8 0 80s7.2-16 16-16l16 0 32 0 47.1 0L137 22.6C145.8 8.5 161.2 0 177.7 0l92.5 0c16.6 0 31.9 8.5 40.7 22.6zM64 96l0 336c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-336L64 96zm80 80l0 224c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-224c0-8.8 7.2-16 16-16s16 7.2 16 16zm96 0l0 224c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-224c0-8.8 7.2-16 16-16s16 7.2 16 16zm96 0l0 224c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-224c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )))
                        : (<SessionsSkeleton/>)}
                </div>
            </Card>
        </>
    )
}

export default Sessions