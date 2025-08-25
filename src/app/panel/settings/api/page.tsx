import Card from "@/components/ui/card/card";
import CardHeader from "@/components/ui/card/card-header";
import React from "react";
import Btn from "@/components/ui/button/Btn";

export default function API() {
    return (
        <Card>
            <CardHeader title={'API'}/>

            <div className="px-4 sm:px-8 py-16 flex flex-col justify-start items-start gap-5">
                <div className="block sm:flex w-full items-center gap-2.5">
                    <div className="w-28 flex justify-start items-center gap-2.5">
                        <div className="justify-start text-gray-800 text-sm font-normal">API key</div>
                    </div>
                    <div className={'relative w-full'}>
                        <input disabled={true}
                               className={'rounded-lg border border-gray-200 bg-gray-100 ring-0 outline-none w-full pr-12'}
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

            </div>
            <div
                className="px-8 py-4 border-t border-gray-200 flex items-center justify-end gap-2.5">
                <Btn className={'bg-transparent shadow-none text-gray-800'}>
                    Docs
                </Btn>
                <Btn className="text-xs font-medium">
                    Renew Plan
                </Btn>

            </div>
        </Card>
    )
}