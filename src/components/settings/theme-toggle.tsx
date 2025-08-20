"use client"

import React from 'react'
import Image from 'next/image'
import {useTheme} from '@/context/ThemeContext'

export const ThemeToggle: React.FC = () => {
    const {selectTheme, theme} = useTheme()

    return (
        <ul className="grid md:grid-cols-12 gap-12">
            <li className="col-span-3">
                <button
                    onClick={() => selectTheme('dark')}
                    className={`flex w-full border-3 overflow-hidden rounded-xl cursor-pointer ${theme === 'dark' ? 'border-green-600' : 'border-transparent'}`}>
                    <div className="relative">
                        <Image
                            className="object-cover object-center"
                            width={340}
                            height={170}
                            src="/images/dark-mode.jpg"
                            alt="dark-mode"
                        />
                    </div>
                </button>
            </li>

            <li className="col-span-3">
                <button
                    onClick={() => selectTheme('light')}
                    className={`flex w-full border-3 overflow-hidden rounded-xl cursor-pointer ${theme === 'light' ? 'border-green-600' : 'border-transparent'}`}>
                    <div className="block">
                        <div className="relative">
                            <Image
                                className="rounded-lg object-cover object-center"
                                width={340}
                                height={170}
                                src="/images/light-mode.jpg"
                                alt="light-mode"
                            />
                        </div>
                    </div>

                </button>
            </li>
        </ul>
    );
};
