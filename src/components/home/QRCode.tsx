'use client'

import {
    IconPalette,
    IconBolt,
    IconCloudUpload,
    IconDownload
} from '@tabler/icons-react'
import {useEffect, useRef} from "react"
import Btn from "@/components/ui/button/Btn"
import QRCodeStyling from "qr-code-styling"
import {useLink} from "@/context/LinkContext";

export const QRCode = () => {
    const {QROptions} = useLink()
    const ref = useRef<HTMLDivElement>(null)
    const qrRef = useRef<QRCodeStyling>(null)

    useEffect(() => {
        console.log(QROptions)
        const doIT = async () => {
            const QRCodeStyling = (await import('qr-code-styling')).default
            if (!qrRef.current) {
                qrRef.current = new QRCodeStyling(QROptions)
            }
            qrRef.current.append(ref.current)
        }

        void doIT()
    }, [])

    return (
        <div className={'p-4'}>
            <div className="flex justify-center items-center gap-6">
                <div className="flex-1 flex flex-col gap-6 h-[306px] justify-between items-center">
                    <div className="flex w-full justify-between items-center gap-6">
                        <div className="flex-1 flex flex-col justify-start items-start gap-1">
                            <label htmlFor={'shape'}
                                   className="text-slate-900 text-xs font-medium">Shape</label>
                            <select id={'shape'}
                                    className="px-3 py-2 text-sm w-full bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-gray-300">
                                <option className="flex justify-start items-center gap-1">
                                    simple
                                </option>
                                <option className="flex justify-start items-center gap-1">
                                    simple
                                </option>
                                <option className="flex justify-start items-center gap-1">
                                    simple
                                </option>
                                <option className="flex justify-start items-center gap-1">
                                    simple
                                </option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col justify-start items-start gap-1">
                            <span className="text-slate-900 text-xs font-medium">Color</span>
                            <label htmlFor={'color'}
                                   className="border border-gray-300 w-full px-3 py-1 bg-white rounded-lg flex justify-between items-center">
                                <input type="color" id={'color'} className={'rounded-lg'}/>
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
                                            SVG, PNG, JPG or GIF (max. 800x400px)
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
                    <Btn size={'sm'} className="w-full text-gray-700 font-semibold text-sm bg-white border gap-2">
                        <IconDownload size={20} className={'text-gray-600'}/>
                        Download
                    </Btn>
                </div>
            </div>
        </div>
    )
}