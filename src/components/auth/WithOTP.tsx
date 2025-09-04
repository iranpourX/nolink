import React from "react";
import {cn} from "@/utils/helper";
import {OTPInput, REGEXP_ONLY_DIGITS} from "input-otp";
import Btn from "@/components/ui/button/Btn";
import {useOtp} from "@/context/OtpContext"

export const WithOTP = () => {
    const {countDown, loading, resend} = useOtp()

    return (
        <div className="relative">
            <div className="flex flex-col justify-center items-center">
                <svg
                    className="size-24 mt-4 fill-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                >
                    <path className="icon-secondary"
                          d="M48 64l0 384c0 26.5 21.5 48 48 48l192 0c26.5 0 48-21.5 48-48l0-384c0-26.5-21.5-48-48-48l-32 0 0 24c0 13.3-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24l0-24L96 16C69.5 16 48 37.5 48 64z"/>
                    <path
                        d="M256 16l0 24c0 13.3-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24l0-24L96 16C69.5 16 48 37.5 48 64l0 384c0 26.5 21.5 48 48 48l192 0c26.5 0 48-21.5 48-48l0-384c0-26.5-21.5-48-48-48l-32 0zm-16 0l-96 0 0 24c0 4.4 3.6 8 8 8l80 0c4.4 0 8-3.6 8-8l0-24zM32 64C32 28.7 60.7 0 96 0L288 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64L32 64z"/>
                </svg>

                <span className="font-medium mt-4">Verify your phone</span>
                <span className="font-medium mt-4 text-sm text-gray-500">
                                                                    Enter the verification code we sent to
                                                                </span>
                <span className="font-semibold mt-2 text-sm text-gray-800">
                                                                    09197459963 -  <button
                    className="text-blue-500">edit</button>
                                                                </span>

                <OTPInput
                    inputMode="tel"
                    pattern={REGEXP_ONLY_DIGITS}
                    maxLength={4}
                    autoComplete={'one-time-code'}
                    containerClassName="group mt-4 flex items-center has-[:disabled]:opacity-30"
                    render={({slots}) => (
                        <div className="flex gap-4">
                            {slots.slice(0, 4)
                                .map(({char, hasFakeCaret, isActive}, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            'relative size-12 text-xl',
                                            'flex items-center justify-center',
                                            'transition-all duration-100 border',
                                            ' rounded-lg outline-0 outline-blue-100',
                                            {'outline-3 outline-blue-300': isActive}
                                        )}>
                                        {char !== null && <div>{char}</div>}
                                        {hasFakeCaret &&
                                            <div
                                                className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
                                                <div className="w-0.5 h-8 bg-gray-400"/>
                                            </div>
                                        }
                                    </div>
                                ))}
                        </div>
                    )}
                />

                <span className="font-medium my-4 text-sm text-gray-800">
                    Didn’t receive a code? ( {countDown}s ) -
                    <button
                        onClick={resend}
                        disabled={countDown > 0}
                        className="text-blue-500 font-semibold disabled:text-gray-400 ml-1">
                        Resend
                    </button>
                </span>

                <Btn className={'w-full'} loading={loading}>
                    Continue
                </Btn>

                <button
                    className="bg-transparent border text-sm mt-6 border-transparent text-blue-500 px-4">
                    Enter with Password
                </button>
            </div>
        </div>
    )
}