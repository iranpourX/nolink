'use client'
import {SubmitHandler, useForm} from "react-hook-form";
import Card from "@/components/ui/card/card";
import CardHeader from "@/components/ui/card/card-header";
import {cn} from "@/utils/helper";
import {ErrorMessage} from "@hookform/error-message";
import CardFooter from "@/components/ui/card/card-footer";
import Btn from "@/components/ui/button/Btn";
import React, {useState} from "react";
import client from "@/app/lib/client";
import {toast} from "sonner";


interface IUser {
    id: string
    phone_number: string
    user_name: string
    display_name: string
    role: {
        display_name: string
        name: string
    }
}

interface IData {
    data?: IUser
    status?: object
}

const UpdateInfo: React.FC<IData> = ({data: user}) => {
    const [loading, setLoading] = useState<boolean>(false)

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm<IUser>()

    const onSubmitInfo: SubmitHandler<IUser> = async (value) => {
        setLoading(true)
        const {data, status} = await client.post('account/update-profile', value)
        if (status === 200 && data.status.code === 200) {
            toast.success(data.status.message)
        }
        setLoading(false)
    }

    return (
        <Card className={'mb-10'}>
            <CardHeader title={`Personal Info`}/>

            <form id="info-form" autoComplete={'off'} onSubmit={handleSubmit(onSubmitInfo)}>
                <div className="p-8">
                    <div className="flex items-center flex-wrap mb-6">
                        <div className={'lg:w-6/12 w-full'}>
                            <div className="w-full">
                                <label htmlFor={'full-name'} className="text-gray-700 block w-full mb-2">full
                                    name</label>
                                <input
                                    id={'full-name'}
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
                                    defaultValue={user?.display_name}
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

                            <div className="w-full">
                                <label htmlFor={'user-name'} className="text-gray-700 block w-full mb-2">
                                    username
                                </label>
                                <input
                                    id={'user-name'}
                                    {...register('user_name', {
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
                                    defaultValue={user?.user_name}
                                    className={cn('info-input',
                                        [
                                            errors.user_name &&
                                            'ring-red-500 border-red-500 focus:border-red-500 focus:ring-red-500'
                                        ]
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="user_name"
                                    render={({message}) => <small
                                        className="px-1 text-red-500 text-xs">{message}</small>}
                                />

                                {!errors.user_name && (<small className="h-6 block"></small>)}
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <CardFooter>
                <Btn inType={'submit'} loading={loading} form={'info-form'} size="md">
                    Save Changes
                </Btn>
            </CardFooter>

        </Card>
    )
}

export default UpdateInfo;