import React from 'react'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import client from "@/app/lib/client";
import HeaderInfo from "@/components/profile/header-info"

interface IUser {
    id: string
    phone_number: string
    user_name: string
    display_name: string
    role: {
        display_name: string
        name: string
    }
}

interface IData {
    data: {
        data: IUser,
        status: object
    }
}

export default async function Profile() {

    const {data: {data: user}}: IData = await client.get('account/profile')

    // function InfoUpdate() {
    //     const [loading, setLoading] = useState<boolean>(false)
    //
    //
    //     const {
    //         handleSubmit,
    //         register,
    //         formState: {errors}
    //     } = useForm<IFormInputs>()
    //
    //     const onSubmitInfo: SubmitHandler<IFormInputs> = async () => {
    //         setLoading(true)
    //
    //         toast.success('کیر تو جواد')
    //
    //         setLoading(false)
    //     }
    //
    //     return (
    //         <Card>
    //             <CardHeader title={`Personal Info`}/>
    //
    //             <form id="info-form" autoComplete={'off'} onSubmit={handleSubmit(onSubmitInfo)}>
    //                 <div className="p-9">
    //                     <div className="flex items-center flex-wrap mb-6">
    //
    //                         <label htmlFor={'full-name'} className="lg:w-4/12 text-gray-700 w-full mb-2">full
    //                             name</label>
    //                         <div className="lg:w-8/12 w-full">
    //                             <input
    //                                 id={'full-name'}
    //                                 autoComplete={'off'}
    //                                 {...register('display_name', {
    //                                     min: {
    //                                         value: 3,
    //                                         message: 'sadsdadsadasdadssdgijgsdi'
    //                                     },
    //                                     max: {
    //                                         value: 50,
    //                                         message: 'weweqeqweqeqeqweqeerwerwr'
    //                                     },
    //                                     required: 'llllklkllkllklllklklklklk'
    //                                 })}
    //                                 defaultValue={user?.display_name}
    //                                 className={cn('info-input',
    //                                     [
    //                                         errors.display_name &&
    //                                         'ring-red-500 border-red-500 focus:border-red-500 focus:ring-red-500'
    //                                     ]
    //                                 )}
    //                             />
    //                             <ErrorMessage
    //                                 errors={errors}
    //                                 name="display_name"
    //                                 render={({message}) => <small
    //                                     className="px-1 text-red-500 text-xs">{message}</small>}
    //                             />
    //
    //                             {!errors.display_name && (<small className="h-6 block"></small>)}
    //
    //                         </div>
    //                     </div>
    //                 </div>
    //             </form>
    //
    //             <CardFooter>
    //                 <Btn inType={'submit'} loading={loading} form={'info-form'} size="sm">
    //                     Save Changes
    //                 </Btn>
    //             </CardFooter>
    //
    //         </Card>
    //     )
    // }

    return (
        <div className="">
            <PageBreadcrumb pageTitle="Profile"/>

            <HeaderInfo user={user}/>


            {/*<InfoUpdate/>*/}

        </div>
    )
}