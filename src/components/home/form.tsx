'use client'

import {cn} from "@/utils/helper";
import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "sonner";
import api from "@/app/lib/client";

interface IForm {
    url: string,
    domain_id: string
    link_category_id: string
    is_active: boolean
    description: string
    password: string
    user_title: string
    start_date: string
    end_date: string
}

export default function Form() {
    const [loading, setLoading] = useState<boolean>(false)

    const {
        handleSubmit,
        register,
        formState: {errors},
        reset
    } = useForm<IForm>()

    const onSubmitInfo: SubmitHandler<IForm> = async (value) => {
        setLoading(true)
        const response = await api('links/create', {
            body: JSON.stringify(value),
        })
        const data = await response.json()
        if (data.status === 200 && data.data.status.code === 200) {
            toast.success(data.status.message)

        }
        setLoading(false)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmitInfo)}
            className={'w-full mt-8'}>
            <div
                className="relative md:bg-transparent bg-white rounded-lg md:rounded-none overflow-hidden">
                <input
                    type="text"
                    placeholder="Here"
                    className={cn(
                        'dark:bg-dark-900 w-full rounded-lg border-none md:border md:border-gray-400',
                        'bg-white py-3.5 pl-4 pr-4 md:pr-38 text-lg text-gray-800 shadow-none md:shadow-xs',
                        'placeholder:text-gray-400 focus:border-blue-300 focus:outline-0',
                        'dark:border-gray-800 dark:bg-gray-900',
                        'dark:text-white dark:placeholder:text-gray-200'
                    )}
                    defaultValue={'https://amazon.com/dp/B0CSLKLKS/sjikjd=jndd_jdjmLldhsnkos'}
                />

                <div
                    className={cn(
                        'relative md:p-0 p-4 md:absolute flex gap-4 md:gap-2 justify-between',
                        'md:justify-center items-center md:right-2 md:top-1/2 md:-translate-y-1/2 md:-tracking-[0.2px]'
                    )}>
                    <button
                        type={'button'}
                        className={cn(
                            'flex items-center justify-center border-none py-3 md:py-2 px-2',
                            'text-white bg-gray-100 md:bg-transparent rounded-lg md:rounded-none w-full md:w-auto',
                            'dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 gap-1 md:gap-0'
                        )}>

                        <svg
                            className="size-5 md:size-6 fill-gray-400 dark:fill-gray-200"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512">
                            <path
                                d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/>
                        </svg>
                        <span className={'md:hidden text-gray-400 text-sm'}>clear</span>
                    </button>

                    <button
                        type={'button'}
                        className={cn(
                            'flex',
                            'items-center rounded-lg border justify-center border-blue-600 bg-blue-600 w-full',
                            'px-4 py-2 text-base font-semibold text-white',
                            'dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400'
                        )}>
                        <span>Short it</span>
                    </button>
                </div>
            </div>
        </form>
    )
}