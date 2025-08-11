'use client'
import React, {useState} from 'react'
import {SubmitHandler, useForm} from "react-hook-form";
import Card from "@/components/ui/card/card";
import CardHeader from "@/components/ui/card/card-header";
import {toast} from "sonner";
import Btn from "@/components/ui/button/Btn";
import CardFooter from "@/components/ui/card/card-footer";
import {ErrorMessage} from "@hookform/error-message";
import {cn} from "@/utils/helper";

interface IUser {
    user: {
        id: string
        phone_number: string
        user_name: string
        display_name: string
        role: {
            display_name: string
            name: string
        }
    }
}


const UpdateInfo: React.FC<IUser> = (props) => {
    const [loading, setLoading] = useState<boolean>(false)


    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm<IUser>()

    const onSubmitInfo: SubmitHandler<IUser> = async () => {
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

                        <label htmlFor={'full-name'} className="lg:w-4/12 text-gray-700 w-full mb-2">full
                            name</label>
                        <div className="lg:w-8/12 w-full">
                            <input
                                id={'full-name'}
                                autoComplete={'off'}
                                {...register('user.display_name', {
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
                                defaultValue={props.user.display_name}
                                className={cn('info-input',
                                    [
                                        errors.user?.display_name &&
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

                            {!errors.user?.display_name && (<small className="h-6 block"></small>)}

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

export default UpdateInfo