'use client'

import {FieldError} from 'react-hook-form'

export default function ErrorMessage({error}: { error?: FieldError }) {

    return (<>
        {
            error
                ? (<small className="px-1 text-red-500 text-xs">{error.message}</small>)
                : (<small className="h-6 block"></small>)
        }
    </>)
}