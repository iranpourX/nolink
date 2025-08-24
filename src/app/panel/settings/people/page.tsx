import Card from "@/components/ui/card/card";
import CardHeader from "@/components/ui/card/card-header";
import React from "react";
import Btn from "@/components/ui/button/Btn";

export default function People() {
    return (
        <Card>
            <CardHeader title={'People'}/>

            <div className="px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                    <img className="w-9 h-9 rounded-[40px]" alt={'avatar'} src="https://placehold.co/36x36"/>
                    <div className="flex flex-col justify-center items-start gap-2">
                        <span className="justify-start text-gray-900 text-sm font-medium leading-none">
                            Tyler Hero
                        </span>
                        <span
                            className="justify-start text-gray-600 text-sm font-normal">
                            tyler.hero@gmail.com
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <select
                        className={'rounded-lg outline-none focus:outline-none focus:ring-0 border-gray-300 py-1.5'}>
                        <option>owner</option>
                        <option>owner 2</option>
                        <option>owner 3</option>
                    </select>
                </div>

            </div>

            <div className="px-8">
                <div className="w-full border-t border-gray-200"/>
            </div>

            <div className="px-8 py-4 flex flex-col justify-start items-start gap-5">
                <div className="flex w-full items-center gap-2.5">
                    <div className="w-28 flex justify-start items-center gap-2.5">
                        <div className="justify-start text-gray-800 text-sm font-normal">Link</div>
                    </div>
                    <div className={'relative w-full'}>
                        <input disabled={true}
                               className={'grow rounded-lg border border-gray-200 bg-gray-100 ring-0 outline-none w-full'}
                               defaultValue={'https://nobitex.ir/panel/exchange/not-irt/'}
                               type={'text'}/>
                        <button
                            className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center rounded-lg border-none px-1.5 py-1.5 -tracking-[0.2px]">
                            <svg
                                className={'size-5 fill-gray-400 rotate-180'}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512">
                                <path
                                    d="M64 480l224 0c17.7 0 32-14.3 32-32l0-64 32 0 0 64c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64l64 0 0 32-64 0c-17.7 0-32 14.3-32 32l0 224c0 17.7 14.3 32 32 32zM224 320l224 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32L224 32c-17.7 0-32 14.3-32 32l0 224c0 17.7 14.3 32 32 32zm-64-32l0-224c0-35.3 28.7-64 64-64L448 0c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64l-224 0c-35.3 0-64-28.7-64-64z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex justify-start items-center gap-2.5">
                    <div className="w-28 flex justify-start items-center gap-2.5"/>
                    <div className="flex items-center">
                        <button
                            className="px-3 py-2 bg-white rounded-lg shadow-xs border border-gray-300 flex gap-2 justify-center items-center">
                            <svg className="size-4 fill-gray-400"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z"/>
                            </svg>

                            <div className="text-gray-700 text-sm item-center font-medium">Reset Link</div>
                        </button>
                    </div>
                </div>
                <div
                    className="justify-start text-gray-800 text-sm font-normal">Click
                    below to RSVP for our exclusive event. Limited spaces available, so don't miss out. Reserve your
                    spot now with this special invitation link!
                </div>
            </div>
            <div
                className="px-8 py-4 border-t border-gray-200 flex items-center justify-end gap-2.5">
                <Btn className="text-xs font-medium">
                    Invite People
                </Btn>

            </div>
        </Card>
    )
}