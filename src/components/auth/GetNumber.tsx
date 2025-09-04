'use client'

import Btn from "@/components/ui/button/Btn"
import {SubmitHandler, useForm} from "react-hook-form"
import {useOtp} from '@/context/OtpContext'
import {ErrorMessage} from "@hookform/error-message"
import {cn} from "@/utils/helper"

const GetNumber = () => {
    const {sendOtp, loading} = useOtp()

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm<{ phone_number: string }>()

    const onSubmitPhone: SubmitHandler<{ phone_number: string }> = async (value) => {
        await sendOtp(value)
    }

    return (
        <div>
            <div className="mb-4 sm:mb-8 px-6 flex flex-col justify-center items-center">
                <h1 className="mb-2 font-semibold text-gray-800 text-xl">
                    Sign In
                </h1>
                <p className={'text-sm text-gray-500'}>
                    To use all features of Nolink, Enter your phone number, you’ll receive a one-time code
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmitPhone)} className="flex flex-col">
                <label htmlFor={'phone_number'} className="my-label">Phone</label>
                <div className={'relative'}>
                    <input
                        maxLength={11}
                        id="phone_number"
                        placeholder="09.."
                        inputMode={'tel'}
                        autoFocus={true}
                        className={cn(
                            'block w-full rounded-lg border border-gray-300 mb-1',
                            'bg-gray-50/85 p-2.5 text-sm text-gray-800 focus:outline-0',
                            'focus:ring-2 ring-blue-100 focus:border-blue-200',
                            [
                                errors.phone_number &&
                                'ring-red-400 border-red-400 focus:border-red-400 focus:ring-red-400'
                            ]
                        )}
                        autoComplete={'off'}
                        {...register("phone_number", {
                            required: 'phone number is required',
                            pattern: {
                                value: /^\d+$/,
                                message: "This input is number only.",
                            },
                            minLength: {
                                value: 10,
                                message: 'This input exceed maxLength'
                            }
                        })}
                    />
                </div>

                <ErrorMessage
                    errors={errors}
                    name="phone_number"
                    render={({message}) => <small
                        className="px-1 text-red-500 text-xs">{message}</small>}
                />

                {!errors.phone_number && (<small className="h-4 block"></small>)}

                <span className={'text-sm my-2'}>I accept privacy policy of using Nolink</span>

                <Btn inType={'submit'} loading={loading}>submit</Btn>
            </form>

        </div>
    )
}

export default GetNumber