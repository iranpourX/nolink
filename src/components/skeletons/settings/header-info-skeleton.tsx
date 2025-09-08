import React from 'react'

export default function HeaderInfoSkeleton() {

    return (
        <>
            <div className="flex justify-start gap-4 animate-pulse">
                <div className="relative rounded-lg overflow-hidden">
                    <span className={'size-32 md:size-40 flex bg-gray-100 dark:bg-gray-600'}/>
                </div>
                <div className="flex md:hidden justify-between items-start">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-2 w-40 py-3.5 bg-gray-100 dark:bg-gray-600 rounded-lg"/>
                        <div className="flex items-center justify-start gap-2 flex-wrap pe-2">
                            <span
                                className="flex items-baseline text-sm font-medium text-gray-400">
                                <span className={'me-1 py-2.5 w-32 bg-gray-100 dark:bg-gray-600 rounded-lg'}/>
                            </span>
                            <span className="flex items-center text-sm font-medium text-gray-400">
                                <span className={'me-1 py-2.5 w-32 bg-gray-100 dark:bg-gray-600 rounded-lg'}/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grow flex flex-col gap-y-3 justify-between animate-pulse">
                <div className="hidden md:flex justify-between items-start">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-2 w-40 py-3.5 bg-gray-100 dark:bg-gray-600 rounded-lg"/>
                        <div className="flex items-center justify-start flex-wrap pe-2">
                            <span
                                className="flex items-baseline text-sm font-medium text-gray-400">
                                <span className={'me-1 py-2.5 w-28 bg-gray-100 dark:bg-gray-600 rounded-lg'}/>
                            </span>
                            <span className="flex items-center text-sm font-medium text-gray-400">
                                <span className={'me-1 py-2.5 w-28 bg-gray-100 dark:bg-gray-600 rounded-lg'}/>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex pe-8">
                        <div className="flex flex-wrap gap-4">
                            {[...Array(2)].map((x, i) =>
                                <div key={i}
                                     className="min-w-28 border border-gray-100 dark:border-gray-600 rounded-lg py-9 px-4 bg-gray-100 dark:bg-gray-600"/>)}
                        </div>
                    </div>
                    <div className="flex items-center w-full max-w-80 py-4 flex-col bg-gray-100 dark:bg-gray-600 rounded-lg mt-3"/>
                </div>
            </div>
        </>
    )
}