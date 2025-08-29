import React from "react"
import Link from "next/link"
import {cn} from '@/utils/helper'

const DropdownItem: React.FC<DropdownItemProps> = (
    {
        tag = "button",
        href,
        onClick,
        onItemClick,
        className,
        children,
    }) => {

    const handleClick = (e: React.MouseEvent) => {
        if (tag === "button") {
            e.preventDefault()
        }
        if (onClick) {
            onClick()
        }
        if (onItemClick) {
            onItemClick()
        }
    }

    if (tag === "a" && href) {
        return (
            <Link href={href}
                  className={cn(
                      'flex items-center w-full gap-3 rounded-lg p-2 text-sm',
                      'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                      'dark:text-gray-400 dark:hover:bg-gray-800', className
                  )} onClick={handleClick}>
                {children}
            </Link>
        )
    }

    return (
        <button onClick={handleClick} className={cn(
            'flex items-center w-full gap-3 rounded-lg p-2 text-sm',
            'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            'dark:text-gray-400 dark:hover:bg-gray-800', className
        )}>
            {children}
        </button>
    )
}

export default DropdownItem