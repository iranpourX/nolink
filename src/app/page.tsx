import type {Metadata} from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: 'Nolink'
}

export default function Home() {
    return (
        <div className="px-16 py-8 flex justify-between items-center">
            <Link href="/signin"
                  className="px-6 py-3 text-sm bg-gray-50 rounded-lg shadow flex justify-center items-center gap-3">
                ورود | ثبت نام
                <svg
                    className={'size-5 fill-gray-600 rotate-180'}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path
                        d="M347.3 267.3c6.2-6.2 6.2-16.4 0-22.6l-128-128c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L297.4 240 16 240c-8.8 0-16 7.2-16 16s7.2 16 16 16l281.4 0L196.7 372.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l128-128zM336 448c-8.8 0-16 7.2-16 16s7.2 16 16 16l96 0c44.2 0 80-35.8 80-80l0-288c0-44.2-35.8-80-80-80l-96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l96 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-96 0z"/>
                </svg>
            </Link>
            <Link href="/" className="flex justify-end items-center">
                <h1 className="text-center justify-start text-black text-2xl font-extrabold">نولینک</h1>
                <div className="relative">
                    <svg className={'size-12 fill-none'} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M25.5 27.75V22.5C25.5 17.5294 21.4706 13.5 16.5 13.5V13.5C11.5294 13.5 7.5 17.5294 7.5 22.5L7.5 27.75"
                            stroke="#0094FF" strokeWidth="4.5" strokeLinecap="round"/>
                        <path
                            d="M16.3865 22.875V25.5C16.3865 32.1274 21.7591 37.5 28.3865 37.5V37.5C35.014 37.5 40.3865 32.1274 40.3865 25.5V21.375C40.3865 15.576 35.6855 10.875 29.8865 10.875V10.875"
                            stroke="#0094FF" strokeWidth="4.5" strokeLinecap="round"/>
                        <circle cx="33" cy="22.875" r="2.25" fill="#0094FF"/>
                    </svg>

                </div>
            </Link>
        </div>
    )
}