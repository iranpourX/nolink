import React from 'react'

export default function HeaderInfoSkeleton() {

    return (
        <>
            <div className="animate-pulse">
                <div className="relative">
                    <span className={'size-40 flex bg-gray-100 rounded-lg'}/>
                </div>
            </div>
            <div className="grow flex flex-col justify-between animate-pulse">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-2 w-40 py-3.5 bg-gray-100 rounded-lg"/>
                        <div className="flex items-center justify-start flex-wrap pe-2">
                            <span
                                className="flex items-baseline text-sm font-medium text-gray-400 me-5 mb-2">
                                <span className={'me-1 py-2 w-28 bg-gray-100 rounded-lg'}/>
                            </span>
                            <span className="flex items-center text-sm font-medium text-gray-400 mb-2">
                                <span className={'me-1 py-2 w-28 bg-gray-100 rounded-lg'}/>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex pe-8">
                        <div className="flex flex-wrap gap-4">
                            {[...Array(3)].map((x, i) =>
                                <div key={i}
                                     className="min-w-28 border border-gray-100 rounded-lg py-9 px-4 bg-gray-100"/>)}
                        </div>
                    </div>
                    <div className="flex items-center w-full max-w-80 py-4 flex-col bg-gray-100 rounded-lg mt-3"/>
                </div>
            </div>
        </>
    )
}