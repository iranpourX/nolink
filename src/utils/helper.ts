import {clsx} from 'clsx'
import type {ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export function copyToClipboard() {

}

export const getPathName = (url?: string): string | undefined => {
    if (url) {
        let pathname = new URL(url)
        return pathname.pathname.slice(1)
    }
}