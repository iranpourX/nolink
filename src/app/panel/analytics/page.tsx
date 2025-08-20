import {Metadata} from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Card from "@/components/ui/card/card";
import CardHeader from "@/components/ui/card/card-header";
import StatisticsChart from "@/components/analytics/StatisticsChart";

export const metadata: Metadata = {
    title: 'Analytics'
}

export default function Settings() {

    return (
        <div className="">
            <div className="flex items-center justify-between gap-3 mb-6">
                <PageBreadcrumb pageTitle={`Analytics`} showBreadcrumbs={false}></PageBreadcrumb>

                <div className="flex items-center justify-end gap-x-2">
                    <button
                        className="flex items-center justify-between shadow-xs text-gray-700 text-sm py-1 px-3 gap-x-2 border border-gray-200 rounded-lg">
                        Filter

                        <svg
                            className="w-3 h-3 fill-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path
                                d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"/>
                        </svg>
                    </button>

                    <button
                        className="flex items-center justify-between shadow-xs text-gray-700 text-sm py-1 px-3 gap-x-2 border border-gray-200 rounded-lg">
                        Last 30 days

                        <svg
                            className="w-3 h-3 fill-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path
                                d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"/>
                        </svg>
                    </button>

                    <button
                        className="flex items-center justify-between shadow-xs text-gray-700 text-sm p-2 gap-x-2 border border-gray-200 rounded-lg">
                        <svg
                            className="w-3 h-3 fill-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 512">
                            <path
                                d="M64 368a48 48 0 1 0 0 96 48 48 0 1 0 0-96zm0-160a48 48 0 1 0 0 96 48 48 0 1 0 0-96zM112 96A48 48 0 1 0 16 96a48 48 0 1 0 96 0z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <StatisticsChart/>

            <br/>
            <br/>

            <div className="grid grid-cols-3 gap-x-4">

                <Card>
                    <CardHeader title={`Top Links`}/>
                </Card>

                <Card>
                    <CardHeader title={`Channels`}/>

                </Card>

                <Card>
                    <CardHeader title={`Social Media`}/>
                </Card>

            </div>
        </div>

    )
}