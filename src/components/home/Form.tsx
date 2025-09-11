'use client'

import React from "react"
import {useLink} from "@/context/LinkContext"
import {cn, urlValid} from "@/utils/helper"
import {url} from "@/utils/validations"
import {SubmitHandler, useForm} from "react-hook-form"
import {useUser} from "@/context/UserContext"
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Transition
} from "@headlessui/react"

import Btn from "@/components/ui/button/Btn"
import {ShortedLink} from "@/components/home/ShortedLink"
import Image from "next/image"
import ErrorMessage from "@/components/ui/error/ErrorMessage"
import {
    IconClipboard,
    IconX,
    IconLink,
    IconQrcode,
    IconKey,
    IconRoadSign,
    IconClockHour9, IconCopy
} from "@tabler/icons-react"
import {QRCode} from "@/components/home/QRCode"

export default function Form() {
    const {loading, sendLink, open, close} = useLink()
    const {user, setShowLoginPopup} = useUser()

    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
        watch,
        setValue
    } = useForm<CreateLink>()

    const onSubmitInfo: SubmitHandler<CreateLink> = async (value) => {
        if (!user) {
            setShowLoginPopup(true)
            return
        }

        await sendLink(value)
    }

    const pasteIcon = () => {
        if (navigator.clipboard && navigator.clipboard.readText) {
            navigator.clipboard.readText()
                .then(clipText => {
                    if (clipText.match(urlValid)) {
                        reset({url: clipText})
                    }
                })
                .catch(err => {
                    console.error('Failed to read clipboard contents: ', err)
                    alert('Please grant clipboard access to paste.')
                });
        } else {
            alert('Clipboard API not supported in this browser.')
        }
    }

    const cleanIcon = () => {
        setValue('url', '')
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitInfo)} className={'w-full mt-8'}>
                <div
                    className="relative md:bg-transparent bg-white border md:border-none border-gray-300 rounded-lg md:rounded-none overflow-hidden">
                    <input
                        type="text"
                        placeholder="paste link"
                        autoFocus={true}
                        autoComplete={'off'}
                        disabled={loading}
                        {...register('url', url)}
                        className={cn(
                            'dark:bg-dark-900 w-full rounded-lg border-none md:border md:border-gray-300',
                            'bg-white py-3.5 pl-4 md:pr-38 pr-4 text-lg text-gray-800 shadow-none',
                            'placeholder:text-gray-400 focus:border-blue-300 focus:outline-0',
                            'dark:border-gray-800 dark:bg-gray-900 ring-0 focus:ring-0',
                            'dark:text-white dark:placeholder:text-gray-200',
                        )}
                    />

                    <div
                        className={cn(
                            'relative md:p-0 p-4 md:absolute flex gap-4 md:gap-2 justify-between',
                            'md:justify-center items-center md:right-2 md:top-1/2 md:-translate-y-1/2 md:-tracking-[0.2px]'
                        )}>

                        <Btn
                            size={'sm'}
                            className={'md:bg-transparent bg-gray-100 px-2 shadow-none w-full md:w-auto'}
                            onClick={!!watch('url') ? cleanIcon : pasteIcon}>
                            {
                                !!watch('url')
                                    ? (<>
                                        <IconX className={'text-gray-400 dark:text-gray-200'}/>
                                        <span className={'md:hidden text-gray-600 text-base'}>clear</span>
                                    </>)
                                    : (<>
                                        <IconClipboard className={'text-gray-400 dark:text-gray-200'}/>
                                        <span className={'md:hidden text-gray-600 text-base'}>paste</span>
                                    </>)
                            }
                        </Btn>

                        <Btn
                            inType={!!user ? 'submit' : 'button'}
                            loading={loading}
                            className={'text-base border border-blue-600 py-2 font-semibold'}
                            onClick={!!user ? () => null : () => setShowLoginPopup(true)}>
                            short it
                        </Btn>
                    </div>
                </div>
                <ErrorMessage error={errors.url}/>
            </form>

            <Dialog open={open} as="div"
                    className="relative z-10 focus:outline-none" onClose={() => {
            }}>
                <DialogBackdrop className="fixed z-99999 inset-0 bg-black/40"/>
                <div className="fixed inset-0 z-999999 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-start justify-center pt-16 px-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-xl relative shadow border rounded-lg bg-white backdrop-blur-2xl duration-200 ease-out data-closed:transform-[scale(98%)] data-closed:opacity-0">
                            <DialogTitle
                                as="span"
                                className="text-base flex items-center justify-between px-4 pt-4 font-semibold text-gray-800">
                                <div id="element" className="flex items-center gap-3">
                                    <Image
                                        width={64}
                                        height={64}
                                        src={'/images/tick.png'}
                                        alt={'tick'}
                                    />
                                    <div className={'flex flex-col'}>
                                        <span>Your link is ready!</span>
                                        <span className={'text-xs text-gray-400'}>You can now add a password, set an expiration date, and more.</span>
                                    </div>
                                </div>

                                <button
                                    onClick={close}
                                    className="border border-transparent p-1">
                                    <IconX className={'text-gray-600'}/>
                                </button>
                            </DialogTitle>

                            <TabGroup>
                                <TabList
                                    className={'border-b px-4 mt-3 flex justify-start items-center text-xs gap-4 text-gray-700 overflow-x-auto'}>
                                    <Tab
                                        className="tabs-style border-b-2 border-transparent data-selected:border-b-blue-500 data-selected:text-blue-600">
                                        <IconLink size={16}
                                                  className={'text-gray-700 rotate-45 data-selected:text-blue-600'}/>
                                        Link
                                    </Tab>
                                    <Tab
                                        className="tabs-style border-b-2 border-transparent data-selected:border-b-blue-500 data-selected:text-blue-600">
                                        <IconQrcode size={16} className={'text-gray-700 data-selected:text-blue-600'}/>
                                        QRcode
                                    </Tab>
                                    <Tab
                                        className="tabs-style border-b-2 border-transparent data-selected:border-b-blue-500 data-selected:text-blue-600">
                                        <IconKey size={16} className={'text-gray-700 data-selected:text-blue-600'}/>
                                        Password
                                    </Tab>

                                    <Tab
                                        className={`tabs-style border-b-2 border-transparent data-selected:border-b-blue-500 data-selected:text-blue-600`}>
                                        <IconClockHour9 size={16}
                                                        className={'text-gray-700 data-selected:text-blue-600'}/>
                                        Expiration
                                    </Tab>
                                    <Tab
                                        className={`tabs-style border-b-2 border-transparent data-selected:border-b-blue-500 data-selected:text-blue-600`}>
                                        <IconRoadSign size={16}
                                                            className={'text-gray-700 data-selected:text-blue-600'}/>
                                        Preview
                                    </Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        <Transition
                                            as={'div'}
                                            appear
                                            enter="transform transition duration-500"
                                            enterFrom="translate-y-1 opacity-0"
                                            enterTo="translate-y-0 opacity-100">

                                            <ShortedLink/>

                                        </Transition>
                                    </TabPanel>

                                    <TabPanel>
                                        <Transition
                                            as={'div'}
                                            appear
                                            enter="transform transition duration-500"
                                            enterFrom="translate-y-1 opacity-0"
                                            enterTo="translate-y-0 opacity-100">

                                            <QRCode/>

                                        </Transition>
                                    </TabPanel>
                                    <TabPanel>

                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>

                            <div className="mt-4 bg-gray-50 border-t rounded-b-lg p-4 flex items-center justify-end">
                                <Btn className={'w-full'}>
                                    <IconCopy size={18} className={'text-gray-50'} />
                                    Copy Shortened link
                                </Btn>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}