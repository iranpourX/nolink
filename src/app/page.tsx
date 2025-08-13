import type {Metadata} from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: 'Nolink'
}

export default function Home() {
    return (
        <div className={'flex flex-col'}>
            <div className="px-8 lg:px-16 py-6 lg:py-8 flex justify-between items-center">
                <Link href="/signin"
                      className="px-6 py-3 text-sm bg-white rounded-lg shadow flex justify-center items-center gap-3">
                    ورود | ثبت نام
                    <svg
                        className={'size-5 fill-gray-600 rotate-180'}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path
                            d="M347.3 267.3c6.2-6.2 6.2-16.4 0-22.6l-128-128c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L297.4 240 16 240c-8.8 0-16 7.2-16 16s7.2 16 16 16l281.4 0L196.7 372.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l128-128zM336 448c-8.8 0-16 7.2-16 16s7.2 16 16 16l96 0c44.2 0 80-35.8 80-80l0-288c0-44.2-35.8-80-80-80l-96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l96 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-96 0z"/>
                    </svg>
                </Link>
                <Link href="/" className="flex justify-end items-center">
                    <h1 className="text-center justify-start text-black text-2xl font-extrabold">نولینک</h1>
                    <div className="relative">
                        <svg className={'size-12 fill-none'} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M25.5 27.75V22.5C25.5 17.5294 21.4706 13.5 16.5 13.5V13.5C11.5294 13.5 7.5 17.5294 7.5 22.5L7.5 27.75"
                                stroke="#0094FF" strokeWidth="4.5" strokeLinecap="round"/>
                            <path
                                d="M16.3865 22.875V25.5C16.3865 32.1274 21.7591 37.5 28.3865 37.5V37.5C35.014 37.5 40.3865 32.1274 40.3865 25.5V21.375C40.3865 15.576 35.6855 10.875 29.8865 10.875V10.875"
                                stroke="#0094FF" strokeWidth="4.5" strokeLinecap="round"/>
                            <circle cx="33" cy="22.875" r="2.25" fill="#0094FF"/>
                        </svg>

                    </div>
                </Link>
            </div>

            <div className="min-h-screen">
                <div className="max-w-xl flex justify-center items-center gap-6">
                    <div className="flex flex-col justify-start items-center gap-16">
                        <div className="flex flex-col justify-start items-center gap-4">
                            <div
                                className="text-center justify-start text-4xl font-bold">کوتاه
                                کــن، بـسـنـج، پـیـشـرفـت کــن
                            </div>
                            <div
                                className="text-center justify-start text-lg font-medium">نولینک،
                                راهی سریع و هوشمند برای کوتاه‌کردن و مدیریت لینک‌های طـــــــــــولانی
                            </div>
                        </div>
                        <div
                            className="h-16 pl-4 pr-2.5 py-4 bg-white rounded-lg shadow outline-1 outline-offset-[-1px] outline-gray-300 inline-flex justify-start items-center gap-4 overflow-hidden">
                            <div className="flex-1 h-6 flex justify-start items-center gap-2">
                                <div
                                    className="flex-1 h-6 justify-start text-gray-900 text-base font-normal leading-normal">https://amazon.com/dp/B0CSLKLKS/sjikjd=jndd_jdjmLldhsnkos
                                </div>
                            </div>
                            <div className="flex justify-start items-center gap-4">
                                <div
                                    className="w-8 h-8 p-2 bg-Color-Light-Light rounded-md flex justify-center items-center gap-2.5">
                                    <div className="w-4 h-4 relative overflow-hidden"/>
                                </div>
                                <div data-destructive="False" data-hierarchy="Primary" data-icon="Default"
                                     data-size="lg"
                                     data-state="Default" className="px-4 py-2.5 bg-blue-600
                        rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-1 outline-offset-[-1px]
                        outline-blue-600 flex justify-center items-center gap-2 overflow-hidden">
                                    <div
                                        className="justify-start text-white text-base font-semibold leading-normal">Short
                                        it
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg flex flex-col justify-start items-start overflow-hidden">
                            <div
                                className="px-4 py-6 bg-white border-b border-slate-200 inline-flex justify-start items-center gap-3">
                                <div className="flex-1 flex justify-center items-center gap-3">
                                    <div className="w-8 h-8 relative overflow-hidden">
                                        <div
                                            className="w-3 h-2.5 left-[5px] top-[8.75px] absolute rounded-tl-3xl rounded-tr-3xl border-[3px] border-sky-500"/>
                                        <div
                                            className="w-4 h-4 left-[10.92px] top-[7px] absolute rounded-lg border-[3px] border-sky-500"/>
                                        <div
                                            className="w-[3px] h-[3px] left-[20.50px] top-[13.50px] absolute bg-sky-500 rounded-full"/>
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-center items-start gap-2">
                                        <div className="inline-flex justify-start items-start gap-2">
                                            <div
                                                className="justify-start text-Color-Primary-Primary text-base font-medium leading-none">amzn.id/ffYHHcGm
                                            </div>
                                        </div>
                                        <div
                                            className="self-stretch justify-start text-slate-500 text-xs font-normal leading-none">amazon.com/dp/B0CSLKLKS/sjikjd=jndd_jdjmLldhsnkos
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-start items-center gap-1">
                                    <div
                                        className="w-8 h-8 p-2 bg-Color-Light-Light rounded-md flex justify-center items-center gap-2.5">
                                        <div className="w-4 h-4 relative overflow-hidden"/>
                                    </div>
                                    <div
                                        className="w-8 h-8 p-2 bg-Color-Light-Light rounded-md flex justify-center items-center gap-2.5">
                                        <div className="w-4 h-4 relative overflow-hidden">
                                            <div
                                                className="w-3 h-3 left-[0.82px] top-[5.44px] absolute opacity-10 bg-Color-Grey-Grey-500"/>
                                            <div
                                                className="w-4 h-4 left-[0.75px] top-[0.75px] absolute bg-Color-Grey-Grey-500"/>
                                        </div>
                                    </div>
                                    <div data-size="Medium" data-state="Default" data-style="Solid"
                                         className="w-8 h-8 p-2 bg-Color-Light-Light rounded-md flex justify-center items-center gap-2.5">
                                        <div className="w-4 h-4 relative overflow-hidden"/>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="px-4 py-6 bg-b&w-white border-b border-slate-200 inline-flex justify-start items-center gap-3">
                                <div className="flex-1 flex justify-center items-center gap-3">
                                    <div className="w-8 h-8 relative overflow-hidden">
                                        <div
                                            className="w-3 h-2.5 left-[5px] top-[8.75px] absolute rounded-tl-3xl rounded-tr-3xl border-[3px] border-sky-500"/>
                                        <div
                                            className="w-4 h-4 left-[10.92px] top-[7px] absolute rounded-lg border-[3px] border-sky-500"/>
                                        <div
                                            className="w-[3px] h-[3px] left-[20.50px] top-[13.50px] absolute bg-sky-500 rounded-full"/>
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-center items-start gap-2">
                                        <div className="inline-flex justify-start items-start gap-2">
                                            <div
                                                className="justify-start text-Color-Primary-Primary text-base font-medium font-['Inter'] leading-none">amzn.id/ffYHHcGm
                                            </div>
                                        </div>
                                        <div
                                            className="self-stretch justify-start text-slate-500 text-xs font-normal font-['Inter'] leading-none">amazon.com/dp/B0CSLKLKS/sjikjd=jndd_jdjmLldhsnkos
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-start items-center gap-1">
                                    <div
                                        className="w-8 h-8 p-2 bg-Color-Light-Light rounded-md flex justify-center items-center gap-2.5">
                                        <div className="w-4 h-4 relative overflow-hidden"/>
                                    </div>
                                    <div
                                        className="w-8 h-8 p-2 bg-Color-Light-Light rounded-md flex justify-center items-center gap-2.5">
                                        <div className="w-4 h-4 relative overflow-hidden">
                                            <div
                                                className="w-3 h-3 left-[0.82px] top-[5.44px] absolute opacity-10 bg-Color-Grey-Grey-500"/>
                                            <div
                                                className="w-4 h-4 left-[0.75px] top-[0.75px] absolute bg-Color-Grey-Grey-500"/>
                                        </div>
                                    </div>
                                    <div data-size="Medium" data-state="Default" data-style="Solid"
                                         className="w-8 h-8 p-2 bg-Color-Light-Light rounded-md flex justify-center items-center gap-2.5">
                                        <div className="w-4 h-4 relative overflow-hidden"/>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="px-4 py-6 bg-b&w-white border-b inline-flex justify-start items-center gap-3 overflow-hidden">
                                <div className="flex-1 flex justify-start items-center gap-3">
                                    <div className="w-8 h-8 relative overflow-hidden">
                                        <div
                                            className="w-3 h-2.5 left-[5px] top-[8.75px] absolute rounded-tl-3xl rounded-tr-3xl border-[3px] border-sky-500"/>
                                        <div
                                            className="w-4 h-4 left-[10.92px] top-[7px] absolute rounded-lg border-[3px] border-sky-500"/>
                                        <div
                                            className="w-[3px] h-[3px] left-[20.50px] top-[13.50px] absolute bg-sky-500 rounded-full"/>
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-center items-start gap-2">
                                        <div className="inline-flex justify-start items-start gap-2">
                                            <div
                                                className="justify-start text-Color-Primary-Primary text-base font-medium font-['Inter'] leading-none">amzn.id/ffYHHcGm
                                            </div>
                                        </div>
                                        <div
                                            className="justify-start text-slate-500 text-xs font-normal font-['Inter'] leading-none">amazon.com/dp/B0CSLKLKS/sjikjd=jndd_jdjmLldhsnkos
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-start items-center gap-1">
                                    <div
                                        className="w-8 h-8 p-2 bg-Color-Light-Light rounded-md flex justify-center items-center gap-2.5">
                                        <div className="w-4 h-4 relative overflow-hidden"/>
                                    </div>
                                    <div
                                        className="w-8 h-8 p-2 bg-Color-Light-Light rounded-md flex justify-center items-center gap-2.5">
                                        <div className="w-4 h-4 relative overflow-hidden">
                                            <div
                                                className="w-3 h-3 left-[0.82px] top-[5.44px] absolute opacity-10 bg-Color-Grey-Grey-500"/>
                                            <div
                                                className="w-4 h-4 left-[0.75px] top-[0.75px] absolute bg-Color-Grey-Grey-500"/>
                                        </div>
                                    </div>
                                    <div data-size="Medium" data-state="Default" data-style="Solid"
                                         className="w-8 h-8 p-2 bg-Color-Light-Light rounded-md flex justify-center items-center gap-2.5">
                                        <div className="w-4 h-4 relative overflow-hidden"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}