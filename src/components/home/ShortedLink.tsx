import {Field, Input, Label} from "@headlessui/react"
import {cn, getPathName} from "@/utils/helper"
import React, {useRef, useState} from "react"
import {useLink} from "@/context/LinkContext"

export const ShortedLink = () => {
    const {loading, shortedData} = useLink()
    const [editModeToggle, setEditModeToggle] = useState<boolean>(true)
    const [defaultShortUrl, setDefaultShortUrl] = useState<string | undefined>(getPathName(shortedData?.short_url))
    const editing = useRef<HTMLInputElement>(null)

    const editMode = () => {
        setEditModeToggle(false)

        setTimeout(() => {
            editing.current?.focus()
        }, 1)
    }

    const cancelEditMode = () => {
        setDefaultShortUrl(getPathName(shortedData?.short_url))
        setEditModeToggle(true)
    }

    return (
        <>
            <Field className="p-4">
                <Label className="my-label">Destination URL</Label>
                <Input
                    defaultValue={shortedData?.original_url}
                    disabled={true}
                    className="my-input"/>
            </Field>
            <Field className="px-4 py-2">
                <Label className="my-label">Shortened link</Label>
                <div className="flex relative">
                    <span
                        className="flex items-center px-3 text-sm text-blue-500 bg-blue-50 border border-r-0 rounded-r-none border-blue-300 rounded-l-lg">
                        no.link</span>
                    <input
                        ref={editing}
                        disabled={editModeToggle}
                        value={defaultShortUrl}
                        onChange={(e) => setDefaultShortUrl(e.target.value)}
                        className={cn(
                            'rounded-r-lg bg-white border text-gray-900',
                            'block w-full text-sm border-gray-300 p-2.5 disabled:bg-gray-50',
                            'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
                            'dark:text-white pr-24 focus:ring-0 focus:border-gray-400',
                        )}
                    />
                    <div
                        className={'absolute flex items-center right-1 top-1/2 -translate-y-1/2 -tracking-[0.2px]'}>

                        {
                            !editModeToggle
                            && (<button
                                onClick={cancelEditMode}
                                className={'mr-3'}>
                                <svg
                                    className="size-4 fill-gray-400 dark:fill-gray-200"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path
                                        d="M7.5 105c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l151 151 151-151c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-151 151 151 151c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-151-151-151 151c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l151-151-151-151z"/>
                                </svg>
                            </button>)
                        }

                        {
                            editModeToggle
                                ? (<button
                                    onClick={editMode}
                                    className={cn('rounded-lg border min-w-16 bg-white shadow-xs px-3 py-1')}>
                                    edit
                                </button>)
                                : (<button
                                    className={'rounded-lg bg-blue-600 border min-w-16 border-blue-600 text-white shadow-xs px-3 py-1'}>
                                    save
                                </button>)
                        }
                    </div>
                </div>
            </Field>
        </>
    )
}