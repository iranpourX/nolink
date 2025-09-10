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
import {IconClipboard, IconX} from "@tabler/icons-react";

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
                                className="text-base flex items-center justify-between px-4 py-2 font-semibold text-gray-800">
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
                                    <svg className="size-5 fill-gray-600" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 384 512">
                                        <path
                                            d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/>
                                    </svg>
                                </button>
                            </DialogTitle>

                            <TabGroup>
                                <TabList
                                    className={'border-b px-4 mt-3 flex justify-start items-center text-xs gap-4 text-gray-700 overflow-x-auto'}>
                                    <Tab
                                        className="tabs-style border-b-2 border-transparent data-selected:border-b-blue-500 data-selected:text-blue-600">
                                        <svg
                                            className={'size-3.5 fill-gray-700 data-selected:fill-blue-600'}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 576 512">
                                            <path
                                                d="M0 256C0 150 86 64 192 64l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-48 0C103.6 96 32 167.6 32 256s71.6 160 160 160l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-48 0C86 448 0 362 0 256zm160 0c0-8.8 7.2-16 16-16l224 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16zM384 64c106 0 192 86 192 192S490 448 384 448l-48 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l48 0c88.4 0 160-71.6 160-160S472.4 96 384 96l-48 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l48 0z"/>
                                        </svg>
                                        General
                                    </Tab>
                                    <Tab
                                        className="tabs-style border-b-2 border-transparent data-selected:border-b-blue-500 data-selected:text-blue-600">
                                        <svg
                                            className={'size-3.5 fill-gray-700 data-selected:fill-blue-600'}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512">
                                            <path
                                                d="M144 64c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16l-96 0c-8.8 0-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16l96 0zM48 32C21.5 32 0 53.5 0 80l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48L48 32zM160 336l0 96c0 8.8-7.2 16-16 16l-96 0c-8.8 0-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16l96 0c8.8 0 16 7.2 16 16zM48 288c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-96 0zM304 64l96 0c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16l-96 0c-8.8 0-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zM256 80l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-96 0c-26.5 0-48 21.5-48 48zm8 240a24 24 0 1 0 48 0 24 24 0 1 0 -48 0zm0 128a24 24 0 1 0 48 0 24 24 0 1 0 -48 0zm152-24a24 24 0 1 0 0 48 24 24 0 1 0 0-48zM392 320a24 24 0 1 0 48 0 24 24 0 1 0 -48 0zm-40 40a24 24 0 1 0 0 48 24 24 0 1 0 0-48zM96 104a24 24 0 1 0 0 48 24 24 0 1 0 0-48zM72 384a24 24 0 1 0 48 0 24 24 0 1 0 -48 0zM352 104a24 24 0 1 0 0 48 24 24 0 1 0 0-48z"/>
                                        </svg>
                                        QRcode
                                    </Tab>
                                    <Tab
                                        className="tabs-style border-b-2 border-transparent data-selected:border-b-blue-500 data-selected:text-blue-600">
                                        <svg
                                            className={'size-3.5 fill-gray-700 data-selected:fill-blue-600'}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512">
                                            <path
                                                d="M192 176c0-79.5 64.5-144 144-144s144 64.5 144 144-64.5 144-144 144c-11.1 0-22-1.3-32.4-3.6-5.4-1.2-11 .4-14.9 4.3L257.4 352 208 352c-8.8 0-16 7.2-16 16l0 48-48 0c-8.8 0-16 7.2-16 16l0 48-96 0 0-81.4 162.8-162.8c4.2-4.2 5.7-10.5 3.9-16.2-4.4-13.8-6.7-28.4-6.7-43.7zM336 0c-97.2 0-176 78.8-176 176 0 15.1 1.9 29.8 5.5 43.9L4.7 380.7c-3 3-4.7 7.1-4.7 11.3L0 496c0 8.8 7.2 16 16 16l128 0c8.8 0 16-7.2 16-16l0-48 48 0c8.8 0 16-7.2 16-16l0-48 40 0c4.2 0 8.3-1.7 11.3-4.7l30-30c10 1.8 20.2 2.7 30.7 2.7 97.2 0 176-78.8 176-176S433.2 0 336 0zm32 168a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/>
                                        </svg>
                                        Password
                                    </Tab>

                                    <Tab
                                        className={`tabs-style border-b-2 border-transparent data-selected:border-b-blue-500 data-selected:text-blue-600`}>
                                        <svg
                                            className={'size-3.5 fill-gray-700 data-selected:fill-blue-600'}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512">
                                            <path fill="currentColor"
                                                  d="M480 256a224 224 0 1 0 -448 0 224 224 0 1 0 448 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM272 112l0 144c0 8.8-7.2 16-16 16l-112 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l96 0 0-128c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                                        </svg>
                                        Expiration
                                    </Tab>
                                    <Tab
                                        className={`tabs-style data-selected:border-b-blue-500 data-selected:text-blue-600`}>Preview</Tab>
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

                                            <ShortedLink/>

                                        </Transition>
                                    </TabPanel>
                                    <TabPanel>

                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>

                            <div className="mt-4 bg-gray-50 border-t rounded-b-lg p-4 flex items-center justify-end">
                                <Btn>
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