import Card from "@/components/ui/card/card";
import CardHeader from "@/components/ui/card/card-header";

export default function SessionsSkeleton() {
    return (
        <Card>
            <CardHeader title={'Sessions'}/>

            <div className="px-8 py-4">
                {[...Array(3)].map((x, i) =>
                    <div key={i}
                         className="py-4 flex animate-pulse items-center border-b last:border-none border-gray-100 dark:border-gray-700">
                        <div className={'size-9 rounded-lg bg-gray-200 dark:bg-gray-600'}></div>
                        <div className="ms-3 flex flex-col gap-1.5">
                            <div className="bg-gray-200 dark:bg-gray-600 rounded-lg p-2.5 w-48"></div>
                            <div className="bg-gray-200 dark:bg-gray-600 rounded-lg p-2 w-56"></div>
                        </div>
                        <div className={'flex grow justify-end'}>
                            <span className={'bg-gray-200 dark:bg-gray-600 p-2.5 rounded-lg'}></span>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}