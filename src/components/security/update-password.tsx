'use client'

import {SubmitHandler, useForm} from "react-hook-form"
import Card from "@/components/ui/card/card"
import CardHeader from "@/components/ui/card/card-header"
import {cn} from "@/utils/helper"
import ErrorMessage from "@/components/ui/error/ErrorMessage"
import CardFooter from "@/components/ui/card/card-footer"
import Btn from "@/components/ui/button/Btn"
import React, {useState} from 'react'
import {toast} from "sonner"

type Password = {
    currentPassword?: string
    password: string
    confirmPassword?: string
}

const UpdatePassword: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm<Password>()

    const onSubmitPassword: SubmitHandler<Password> = async (value) => {
        setLoading(true)
        const response = await fetch('/api/settings/password', {
            method: "POST",
            body: JSON.stringify(value)
        })

        const {status} = await response.json()

        if (response.status === 200 && status.code === 200) {
            toast.success(status.message)

        }
        setLoading(false)
    }

    return (
        <Card className={'mb-10'}>
            <CardHeader title={`Password`}/>

            <form id="info-form" autoComplete={'off'} onSubmit={handleSubmit(onSubmitPassword)}>
                <div className="p-8">
                    <div className="flex items-center flex-wrap mb-6">
                        <div className={'lg:w-6/12 w-full'}>
                            <div className="w-full">
                                <label htmlFor={'full-name'}
                                       className="text-gray-700 dark:text-gray-300 block w-full mb-2">password</label>
                                <input
                                    id={'password'}
                                    {...register('password', {
                                        minLength: {
                                            value: 8,
                                            message: 'sadsdadsadasdadssdgijgsdi'
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'weweqeqweqeqeqweqeerwerwr'
                                        },
                                        required: 'llllklkllkllklllklklklklk'
                                    })}
                                    className={cn('info-input',
                                        [
                                            errors.password &&
                                            'ring-red-500 border-red-500 focus:border-red-500 focus:ring-red-500'
                                        ]
                                    )}
                                />
                                <ErrorMessage error={errors.password}/>
                            </div>

                            {/*<div className="w-full">*/}
                            {/*    <label htmlFor={'password-confirm'}*/}
                            {/*           className="text-gray-700 dark:text-gray-300 block w-full mb-2">*/}
                            {/*        password confirm*/}
                            {/*    </label>*/}
                            {/*    <input*/}
                            {/*        id={'password-confirm'}*/}
                            {/*        {...register('confirmPassword', {*/}
                            {/*            min: {*/}
                            {/*                value: 3,*/}
                            {/*                message: 'sadsdadsadasdadssdgijgsdi'*/}
                            {/*            },*/}
                            {/*            max: {*/}
                            {/*                value: 50,*/}
                            {/*                message: 'weweqeqweqeqeqweqeerwerwr'*/}
                            {/*            },*/}
                            {/*        })}*/}

                            {/*        className={cn('info-input',*/}
                            {/*            [*/}
                            {/*                errors.confirmPassword &&*/}
                            {/*                'ring-red-500 border-red-500 focus:border-red-500 focus:ring-red-500'*/}
                            {/*            ]*/}
                            {/*        )}*/}
                            {/*    />*/}
                            {/*    <ErrorMessage*/}
                            {/*        errors={errors}*/}
                            {/*        name="confirmPassword"*/}
                            {/*        render={({message}) => <small*/}
                            {/*            className="px-1 text-red-500 text-xs">{message}</small>}*/}
                            {/*    />*/}

                            {/*    {!errors.confirmPassword && (<small className="h-6 block"></small>)}*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </form>

            <CardFooter>
                <Btn inType={'submit'} loading={loading} form={'info-form'}>
                    Save Changes
                </Btn>
            </CardFooter>
        </Card>
    )
}

export default UpdatePassword