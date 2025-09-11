'use client'

import {
    IconPalette,
    IconBolt,
    IconCloudUpload,
    IconDownload
} from '@tabler/icons-react'
import {useEffect, useRef, useState} from "react"
import Btn from "@/components/ui/button/Btn"
import QRCodeStyling, {FileExtension} from "qr-code-styling"
import {useLink} from "@/context/LinkContext"
import {debounce, getPathName} from "@/utils/helper"

export const QRCode = () => {
    const {QROptions, shortedData} = useLink()
    const [extension, setExtension] = useState<FileExtension>('png')
    const ref = useRef<HTMLDivElement>(null)
    const qrRef = useRef<QRCodeStyling>(null)

    useEffect(() => {
        const doIT = async () => {
            const QRCodeStyling = (await import('qr-code-styling')).default
            if (!qrRef.current) {
                qrRef.current = new QRCodeStyling(QROptions)
            }
            // @ts-ignore
            qrRef.current.append(ref.current)
        }

        void doIT()
    }, [QROptions])

    const download = () => {
        qrRef.current?.download({name: getPathName(shortedData?.short_url), extension})
    }

    const shapeColor = debounce((e: string) => {
        qrRef.current?.update({
            dotsOptions: {
                color: `${e}`
            }
        })
    }, 1000)

    const shape = debounce((e) => {
        qrRef.current?.update({
            dotsOptions: {
                type: e
            }
        })
    }, 500)

    const corner = debounce((e) => {
        qrRef.current?.update({
            cornersSquareOptions: {
                type: e
            }
        })
    }, 500)

    const cornerColor = debounce((e) => {
        qrRef.current?.update({
            cornersSquareOptions: {
                color: `${e}`
            }
        })
    }, 1000)

    return (
        <div className={'p-4'}>
            <div className="flex justify-center items-center gap-6">
                <div className="flex-1 flex flex-col gap-6 justify-between items-center">
                    <div className="flex w-full justify-between items-center gap-6">
                        <div className="flex-1 flex flex-col justify-start items-start gap-1">
                            <label htmlFor={'shape'}
                                   className="text-slate-900 text-xs font-medium">Shape</label>
                            <select
                                id={'shape'}
                                onChange={(e) => shape(e.target.value)}
                                className="px-3 py-2 text-sm w-full bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-gray-300">
                                <option value={'square'}>square</option>
                                <option value={'dots'}>dots</option>
                                <option value={'rounded'}>rounded</option>
                                <option value={'extra-rounded'}>extra rounded</option>
                                <option value={'classy'}>classy</option>
                                <option value={'classy-rounded'}>classy rounded</option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col justify-start items-start gap-1">
                            <span className="text-slate-900 text-xs font-medium">Color</span>
                            <label htmlFor={'color'}
                                   className="border border-gray-300 w-full px-3 py-1 bg-white rounded-lg flex justify-between items-center">
                                <input
                                    type="color"
                                    onChange={(e) => shapeColor(e.target.value)}
                                    id={'color'}
                                    className={'rounded-lg'}
                                />
                                <IconPalette size={18} className={'text-gray-500'}/>
                            </label>
                        </div>
                    </div>
                    <div className="flex w-full justify-between items-center gap-6">
                        <div className="flex-1 flex flex-col justify-start items-start gap-1">
                            <label htmlFor={'corner'}
                                   className="text-slate-900 text-xs font-medium">Corner</label>
                            <select
                                id={'corner'}
                                onChange={(e) => corner(e.target.value)}
                                className="px-3 py-2 text-sm w-full bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-gray-300">
                                <option value={''}>none</option>
                                <option value={'square'}>square</option>
                                <option value={'dot'}>dot</option>
                                <option value={'extra-rounded'}>extra rounded</option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col justify-start items-start gap-1">
                            <span className="text-slate-900 text-xs font-medium">Color</span>
                            <label htmlFor={'color'}
                                   className="border border-gray-300 w-full px-3 py-1 bg-white rounded-lg flex justify-between items-center">
                                <input
                                    type="color"
                                    onChange={(e) => cornerColor(e.target.value)}
                                    id={'color'}
                                    className={'rounded-lg'}
                                />
                                <IconPalette size={18} className={'text-gray-500'}/>
                            </label>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-start items-start gap-2.5">
                        <div className="flex justify-start items-center gap-0.5">
                            <span
                                className="justify-start text-slate-900 text-xs font-medium">Logo</span>
                            <span
                                className="px-2 py-0.5 text-xs bg-violet-50 rounded-lg flex justify-start items-center gap-1">
                                <IconBolt size={16} className={'text-violet-500'}/>
                                pro
                            </span>
                        </div>
                        <div className="flex-1 flex flex-col justify-start items-start gap-4">
                            <div
                                className="flex-1 border px-6 py-4 bg-white rounded-lg flex flex-col justify-center items-center gap-1">
                                <div className="flex flex-col justify-start items-center gap-3">
                                    <div
                                        className="relative p-2 bg-gray-100 rounded-full">
                                        <IconCloudUpload className={'text-gray-500'}/>
                                    </div>
                                    <div className="flex flex-col justify-start items-center gap-1">
                                        <div className="flex justify-center items-start gap-1">
                                            <span className="text-sm font-semibold text-blue-600">
                                                Click to upload
                                            </span>
                                            <span className="text-slate-600 text-sm font-normal">
                                                or drag and drop
                                            </span>
                                        </div>
                                        <div
                                            className="text-center justify-start text-slate-600 text-xs font-normal">
                                            SVG, PNG, JPG (max. 100x100 px)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-start items-center gap-6">
                    <div className="size-60 relative overflow-hidden">
                        <div ref={ref}/>
                    </div>
                    <div className={`flex w-full items-center justify-between gap-4`}>
                        <select
                            onChange={(e) => setExtension(e.target.value as FileExtension)}
                            className="w-full text-gray-700 rounded-lg font-semibold text-sm bg-white border border-gray-300 gap-2">
                            <option value={'png'}>PNG</option>
                            <option value={'svg'}>SVG</option>
                            <option value={'jpg'}>JPG</option>
                        </select>

                        <Btn
                            onClick={download}
                            size={'sm'}
                            className="w-full text-gray-700 font-semibold text-sm bg-white border gap-2">
                            <IconDownload size={20} className={'text-gray-600'}/>
                            Download
                        </Btn>
                    </div>
                </div>
            </div>
        </div>
    )
}