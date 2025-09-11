import {clsx} from 'clsx'
import type {ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const urlValid: RegExp = new RegExp('^(https?:\\/\\/)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(:\\d+)?(\\/\\S*)?$')

export const getPathName = (url?: string): string | undefined => {
    if (url) {
        let pathname = new URL(url)
        return pathname.pathname.slice(1)
    }
}

export const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
    let timer: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(...args), delay)
    };
}