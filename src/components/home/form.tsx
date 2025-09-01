'use client'

import {cn} from "@/utils/helper"
import React, {useRef, useState} from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import {useUser} from "@/context/UserContext"
import {ErrorMessage} from "@hookform/error-message"
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    Field,
    Input,
    Label,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Textarea
} from "@headlessui/react"
import Creatable from "react-select/creatable"
import Select from "react-select"
import QRCodeStyling, {Options} from 'qr-code-styling'
import Btn from "@/components/ui/button/Btn";



export default function Form() {
    const [ShortedData, setShortedData] = useState<ShortedLink>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {user, setShowLoginPopup} = useUser()

    const [options, setOptions] = useState<Options>({
        width: 300,
        height: 300,
        type: 'canvas',
        data: '',
        margin: 10,
        qrOptions: {
            typeNumber: 0,
            mode: 'Byte',
            errorCorrectionLevel: 'Q'
        },
        imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 20,
            crossOrigin: 'anonymous',
            saveAsBlob: true,
        }
    });

    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
        watch,
        setValue
    } = useForm<CreateLink>()

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const selectOptions = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'}
    ]

    const onSubmitInfo: SubmitHandler<CreateLink> = async (value) => {
        setLoading(true)
        const response = await fetch('/api/home', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: value.url,
                domain_id: '5191ef90-41b5-ef11-84ee-901b0e934f17'
            }),
        })
        const data = await response.json()
        if (response.status === 200) {
            open()
            setShortedData(data)

            setOptions(options => ({
                ...options,
                data: data.short_url
            }))
        }

        setLoading(false)
    }

    const pasteIcon = () => {
        const expression = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&\/=]*$/;
        const regex = new RegExp(expression)
        if (navigator.clipboard && navigator.clipboard.readText) {
            navigator.clipboard.readText()
                .then(clipText => {
                    if (clipText.match(regex)) {
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

    const ref = useRef<HTMLDivElement>(null)

    const CreateQR = () => {

        let qr = new QRCodeStyling(options)

        qr?.append(document.getElementById("canvas"))

        // if (!qrCode) return
        // qrCode?.update(options)
    }


    // console.log(options)

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmitInfo)}
                className={'w-full mt-8'}>
                <div
                    className="relative md:bg-transparent bg-white border md:border-none border-gray-300 rounded-lg md:rounded-none overflow-hidden">
                    <input
                        type="text"
                        placeholder="paste link"
                        autoComplete={'off'}
                        {...register('url', {
                            required: 'مقدار خالی است',
                            pattern: {
                                value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&\/=]*$/,
                                message: 'its not link'
                            }
                        })}
                        className={cn(
                            'dark:bg-dark-900 w-full rounded-lg border-none md:border md:border-gray-300',
                            'bg-white py-3.5 pl-4 pr-4 md:pr-38 text-lg text-gray-800 shadow-none md:shadow-xs',
                            'placeholder:text-gray-400 focus:border-blue-300 focus:outline-0',
                            'dark:border-gray-800 dark:bg-gray-900 ring-0 focus:ring-0',
                            'dark:text-white dark:placeholder:text-gray-200 outline-none'
                        )}
                    />

                    <div
                        className={cn(
                            'relative md:p-0 p-4 md:absolute flex gap-4 md:gap-2 justify-between',
                            'md:justify-center items-center md:right-2 md:top-1/2 md:-translate-y-1/2 md:-tracking-[0.2px]'
                        )}>

                        {!!watch('url')
                            ? (<button
                                onClick={cleanIcon}
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
                                        d="M7.5 105c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l151 151 151-151c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-151 151 151 151c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-151-151-151 151c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l151-151-151-151z"/>
                                </svg>
                                <span className={'md:hidden text-gray-600 text-sm'}>clear</span>
                            </button>)
                            : (<button
                                onClick={pasteIcon}
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
                                        d="M64 32C46.3 32 32 46.3 32 64l0 384c0 17.7 14.3 32 32 32l256 0c17.7 0 32-14.3 32-32l0-384c0-17.7-14.3-32-32-32L64 32zM0 64C0 28.7 28.7 0 64 0L320 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm112 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 96l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 96l96 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-96 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                                </svg>
                                <span className={'md:hidden text-gray-600 text-sm'}>paste</span>
                            </button>)
                        }

                        {!!user
                            ? (<button
                                type={'submit'}
                                disabled={loading}
                                className={cn(
                                    'flex',
                                    'items-center rounded-lg border justify-center border-blue-600 bg-blue-600 w-full',
                                    'px-4 py-2 text-base font-semibold text-white',
                                    'dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400'
                                )}>
                                <span>Short it</span>
                            </button>)
                            : (<button
                                onClick={() => setShowLoginPopup(true)}
                                type={'button'}
                                className={cn(
                                    'flex',
                                    'items-center rounded-lg border justify-center border-blue-600 bg-blue-600 w-full',
                                    'px-4 py-2 text-base font-semibold text-white',
                                    'dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400'
                                )}>
                                <span>Short it</span>
                            </button>)
                        }

                    </div>
                </div>
                <ErrorMessage
                    errors={errors}
                    name="url"
                    render={({message}) => <small
                        className="px-1 text-red-500 text-xs">{message}</small>}
                />

                {!errors.url && (<small className="h-6 block"></small>)}
            </form>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <DialogBackdrop className="fixed z-99999 inset-0 bg-black/40"/>
                <div className="fixed inset-0 z-999999 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-start justify-center pt-16 px-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-xl shadow border rounded-lg bg-white backdrop-blur-2xl duration-200 ease-out data-closed:transform-[scale(98%)] data-closed:opacity-0">
                            <DialogTitle
                                as="span"
                                className="text-base flex items-center justify-between border-b p-4 font-semibold text-gray-800">
                                <p className="flex">New Link</p>

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
                                    className={`border-b px-4 mt-3 flex justify-start items-center text-xs gap-6 text-gray-700`}>
                                    <Tab
                                        className={`border-b-2 py-3 border-transparent focus:outline-0 data-selected:border-b-blue-500 data-selected:text-blue-500 data-selected:font-medium`}>General</Tab>
                                    <Tab
                                        className={`border-b-2 py-3 border-transparent focus:outline-0 data-selected:border-b-blue-500 data-selected:text-blue-500 data-selected:font-medium`}>QR
                                        code</Tab>
                                    <Tab
                                        className={`border-b-2 py-3 border-transparent focus:outline-0 data-selected:border-b-blue-500 data-selected:text-blue-500 data-selected:font-medium`}>Password</Tab>

                                    <Tab
                                        className={`border-b-2 py-3 border-transparent focus:outline-0 data-selected:border-b-blue-500 data-selected:text-blue-500 data-selected:font-medium`}>Expiration</Tab>
                                    <Tab
                                        className={`border-b-2 py-3 border-transparent focus:outline-0 data-selected:border-b-blue-500 data-selected:text-blue-500 data-selected:font-medium`}>Preview</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        <Field className="p-4">
                                            <Label className="my-label">
                                                Destination URL
                                            </Label>
                                            <Input
                                                defaultValue={ShortedData?.original_url}
                                                disabled={true}
                                                className="my-input"/>
                                        </Field>
                                        <Field className="px-4 py-2">
                                            <Label className="my-label">Shortened link</Label>
                                            <div className="flex">
                                                <span
                                                    className="inline-flex items-center px-3 text-sm text-blue-500 bg-blue-50 border border-r-0 rounded-r-none border-blue-300 rounded-l-lg">
                                                    no.link
                                                </span>
                                                <input
                                                    type="text"
                                                    id="website-admin"
                                                    disabled={true}
                                                    defaultValue={ShortedData?.short_url}
                                                    className={cn(
                                                        'rounded-r-lg bg-gray-50 border text-gray-900',
                                                        'block w-full text-sm border-gray-300 p-2.5',
                                                        'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
                                                        'dark:text-white'
                                                    )}
                                                />
                                            </div>
                                        </Field>

                                        <Field className="px-4 py-2">
                                            <Label className="my-label">Tags</Label>
                                            <Creatable isMulti={true} options={selectOptions}/>
                                        </Field>

                                        <Field className="px-4 py-2">
                                            <Label className="my-label">Category</Label>
                                            <Select options={selectOptions}/>
                                        </Field>

                                        <Field className="px-4 py-2">
                                            <Label className="my-label">Comment</Label>
                                            <Textarea
                                                className={cn(
                                                    'block w-full resize-none rounded-lg',
                                                    'border border-gray-300 bg-white px-3 py-2 text-sm',
                                                    'text-gray-800 focus:not-data-focus:outline-none',
                                                    'data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                                )}
                                                rows={5}
                                                placeholder="Leave your comments here"
                                            />
                                        </Field>
                                    </TabPanel>
                                    <TabPanel>
                                        {/*<div style={styles.inputWrapper}>*/}
                                        <div id={'canvas'} ref={ref}/>
                                        {/*</div>*/}

                                        <Btn onClick={CreateQR}>
                                            ساخت QRCode
                                        </Btn>
                                    </TabPanel>
                                    <TabPanel>
                                        <Field className="p-4">
                                            <Label className="my-label">
                                                Destination URL
                                            </Label>
                                            <Input
                                                placeholder={`Paste your URL here`}
                                                className="my-input"
                                            />
                                        </Field>
                                        <Field className="px-4 py-2">
                                            <Label className="my-label">
                                                Destination URL
                                            </Label>
                                            <Input
                                                placeholder={`Paste your URL here`}
                                                className="my-input"
                                            />
                                        </Field>
                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>

                            <div className="mt-4 bg-gray-50 border-t rounded-b-lg p-4 flex items-center justify-end">
                                <button
                                    className="rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium text-white focus:outline-0"
                                    onClick={close}
                                >
                                    Create Link
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}