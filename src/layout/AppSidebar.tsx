"use client"

import React, {useCallback, useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {usePathname} from 'next/navigation'
import {useSidebar} from '@/context/SidebarContext'
import {cn} from '@/utils/helper'
import SidebarWidget from "./SidebarWidget"

const navItems: NavItem[] = [
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
                d="M0 256C0 167.6 71.6 96 160 96h80c8.8 0 16 7.2 16 16s-7.2 16-16 16h-80c-70.7 0-128 57.3-128 128s57.3 128 128 128h80c8.8 0 16 7.2 16 16s-7.2 16-16 16h-80C71.6 416 0 344.4 0 256m576 0c0 88.4-71.6 160-160 160h-80c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c70.7 0 128-57.3 128-128s-57.3-128-128-128h-80c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c88.4 0 160 71.6 160 160m-424-16h272c8.8 0 16 7.2 16 16s-7.2 16-16 16H152c-8.8 0-16-7.2-16-16s7.2-16 16-16"></path>
        </svg>),
        name: "Links",
        path: '/panel/links',
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M204.1 32c12.7 0 24.9 5.1 33.9 14.1l172.7 172.6c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0L14.1 270.1c-9-9-14.1-21.2-14.1-33.9V80c0-26.5 21.5-48 48-48zM36.7 247.4l172.7 172.7c12.5 12.5 32.8 12.5 45.3 0l133.4-133.5c12.5-12.5 12.5-32.8 0-45.3L215.4 68.7c-3-3-7.1-4.7-11.3-4.7H48c-8.8 0-16 7.2-16 16v156.1c0 4.2 1.7 8.3 4.7 11.3M308.4 36.9c6.1-6.4 16.2-6.6 22.6-.5l141.3 135c52.8 50.4 52.8 134.7 0 185.1l-124.6 119c-6.4 6.1-16.5 5.9-22.6-.5s-5.9-16.5.5-22.6l124.6-119c39.6-37.8 39.6-101 0-138.8l-141.3-135c-6.4-6.1-6.6-16.2-.5-22.6zM104 112a24 24 0 1 1 0 48 24 24 0 1 1 0-48"></path>
        </svg>),
        name: "Tags",
        path: "/panel/tags",
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
                d="M512 352H160c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h117.5c8.5 0 16.6 3.4 22.6 9.4l26.5 26.5c18 18 42.4 28.1 67.9 28.1H512c17.7 0 32 14.3 32 32v160c0 17.7-14.3 32-32 32M349.3 77.3l-26.6-26.6c-12-12-28.3-18.7-45.3-18.7H160c-35.3 0-64 28.7-64 64v224c0 35.3 28.7 64 64 64h352c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H394.5c-17 0-33.3-6.7-45.3-18.7zM32 112c0-8.8-7.2-16-16-16s-16 7.2-16 16v240c0 70.7 57.3 128 128 128h336c8.8 0 16-7.2 16-16s-7.2-16-16-16H128c-53 0-96-43-96-96z"></path>
        </svg>),
        name: "Categories",
        path: "/panel/profile",
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
                d="M240 64c8.8 0 16 7.2 16 16v352c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16zm-32-32c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM80 256c8.8 0 16 7.2 16 16v160c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16zm-32-32c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm320-96h32c8.8 0 16 7.2 16 16v288c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16m-48 16v288c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48 48"></path>
        </svg>),
        name: "Analytics",
        path: "/panel/analytics",
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M223.3 37.8c.4-1.5 1.3-2.8 2.4-3.8 9.9-1.3 20-2 30.3-2s20.4.7 30.3 2c1.1 1 1.9 2.3 2.4 3.8l13.7 47.7c3.5 12.1 12.2 21.1 22.5 26.1 7.6 3.6 14.8 7.8 21.7 12.5 9.4 6.5 21.7 9.5 33.9 6.5l48.2-12c1.5-.4 3-.3 4.4.2 5.4 6.9 10.4 14.2 14.9 21.8l4.3 7.4c4.2 7.5 7.9 15.3 11.2 23.3-.3 1.5-1 2.9-2.1 4L426.8 211c-8.7 9-12.2 21.1-11.3 32.5.3 4.1.5 8.3.5 12.5s-.2 8.4-.5 12.5c-.9 11.4 2.6 23.5 11.3 32.5l34.5 35.7c1.1 1.1 1.8 2.5 2.1 4-3.3 8-7 15.8-11.2 23.4l-4.2 7.3c-4.6 7.6-9.6 14.8-14.9 21.8-1.4.5-2.9.5-4.4.2l-48.2-12c-12.2-3-24.4 0-33.9 6.5-6.9 4.7-14.1 8.9-21.7 12.5-10.3 4.9-19.1 14-22.5 26.1l-13.7 47.7c-.4 1.5-1.3 2.8-2.4 3.8-9.9 1.3-20 2-30.3 2s-20.4-.7-30.3-2c-1.1-1-1.9-2.3-2.4-3.8l-13.7-47.7c-3.5-12.1-12.2-21.1-22.5-26.1-7.6-3.6-14.8-7.8-21.7-12.5-9.4-6.5-21.7-9.5-33.9-6.5l-48.2 12c-1.5.4-3 .3-4.4-.2-5.4-7-10.4-14.2-15-21.8l-4.2-7.3c-4.2-7.5-7.9-15.3-11.2-23.4.3-1.5 1-2.9 2.1-4L85.2 301c8.7-9 12.2-21.1 11.3-32.5-.3-4.1-.5-8.3-.5-12.5s.2-8.4.5-12.5c.9-11.4-2.6-23.5-11.3-32.5l-34.5-35.8c-1.1-1.1-1.8-2.5-2.1-4 3.3-8 7-15.8 11.2-23.4l4.2-7.3c4.6-7.6 9.6-14.8 15-21.8 1.4-.5 2.9-.5 4.4-.2l48.2 12c12.2 3 24.4 0 33.9-6.5 6.9-4.7 14.1-8.9 21.7-12.5 10.3-4.9 19.1-14 22.5-26.1l13.7-47.7zM256 0c-13 0-25.9 1-38.4 2.9-1.7.3-3.4.8-5 1.6-9.5 4.9-16.9 13.6-20 24.5l-13.7 47.7c-.6 2.2-2.5 4.5-5.6 6-9.1 4.3-17.8 9.4-26 15-2.8 1.9-5.8 2.4-8 1.8l-48.2-12C80.2 84.8 69 86.9 60 92.6c-1.5.9-2.8 2.1-3.9 3.5-7.1 8.9-13.7 18.2-19.6 28l-.1.3L32 132l-.1.3c-5.4 9.8-10.2 19.9-14.3 30.4-.6 1.6-1 3.3-1.1 5-.5 10.8 3.3 21.6 11.2 29.8l34.5 35.7c1.6 1.7 2.7 4.4 2.4 7.8q-.6 7.5-.6 15s.2 10.1.6 15c.3 3.4-.8 6.2-2.4 7.8l-34.5 35.8c-7.9 8.2-11.7 19-11.2 29.8.1 1.7.5 3.4 1.1 5 4.1 10.5 8.9 20.6 14.3 30.4l.1.3 4.4 7.6.1.3c5.9 9.8 12.4 19.2 19.6 28.1 1.1 1.4 2.4 2.6 3.9 3.5 9 5.7 20.2 7.8 31.1 5.1l48.2-12c2.2-.6 5.2-.1 8 1.8 8.2 5.7 16.9 10.7 26 15 3.1 1.5 4.9 3.8 5.6 6l13.7 47.5c3.1 10.8 10.5 19.5 20 24.5 1.6.8 3.2 1.4 5 1.6C230.1 511 243 512 256 512s25.9-1 38.4-2.9c1.7-.3 3.4-.8 5-1.6 9.5-4.9 16.9-13.6 20-24.5l13.7-47.7c.6-2.2 2.5-4.5 5.6-6 9.1-4.3 17.8-9.4 26-15 2.8-1.9 5.8-2.4 8-1.8l48.2 12c10.9 2.7 22.1.7 31.1-5.1 1.5-.9 2.8-2.1 3.9-3.5 7.1-8.9 13.6-18.2 19.5-28l.2-.3 4.4-7.6.1-.3c5.4-9.7 10.2-19.9 14.3-30.4.6-1.6 1-3.3 1.1-5 .5-10.8-3.3-21.6-11.2-29.8l-34.5-35.7c-1.6-1.7-2.7-4.4-2.4-7.8a188 188 0 0 0 0-30c-.3-3.4.8-6.2 2.4-7.8l34.5-35.7c7.9-8.2 11.7-19 11.2-29.8-.1-1.7-.5-3.4-1.1-5-4.1-10.5-8.9-20.6-14.3-30.4l-.1-.3-4.4-7.6-.2-.3c-5.9-9.8-12.4-19.2-19.5-28-1.1-1.4-2.4-2.6-3.9-3.5-9-5.7-20.2-7.8-31.1-5.1l-48.2 12c-2.2.6-5.2.1-8-1.8-8.2-5.7-16.9-10.7-26-15-3.1-1.5-4.9-3.8-5.6-6L319.4 29c-3.1-10.8-10.5-19.5-20-24.5-1.6-.8-3.2-1.4-5-1.6C281.9 1 269 0 256 0m-56 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m144 0a88 88 0 1 0-176 0 88 88 0 1 0 176 0"></path>
        </svg>),
        name: "Settings",
        subItems: [
            {name: "profile", path: "/panel/settings/profile"},
            {name: "security", path: "/panel/settings/security"},
            {name: "api", path: "/panel/settings/api"},
            {name: "Notifications", path: "/error-404"},
            {name: "Billings", path: "/error-404"},
            {name: "System", path: "/error-404"},
        ]
    }
]

const AppSidebar: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const {isExpanded, isMobileOpen, isHovered} = useSidebar()
    const pathname = usePathname()

    const renderMenuItems = (
        navItems: NavItem[]
    ) => (
        <ul className="flex flex-col gap-y-2 mt-4">
            {navItems.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems
                        ? (<button
                            onClick={() => handleSubmenuToggle(index)}
                            className={`menu-item group ${
                                openSubmenu?.index === index
                                    ? "menu-item-active"
                                    : "menu-item-inactive"
                            } cursor-pointer ${
                                !isExpanded && !isHovered
                                    ? "lg:justify-center"
                                    : "lg:justify-start"
                            }`}>
                            <span
                                className={`${
                                    openSubmenu?.index === index
                                        ? "menu-item-icon-active"
                                        : "menu-item-icon-inactive"
                                }`}>
                                {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen)
                                && (<span className={`menu-item-text`}>{nav.name}</span>)}
                            {(isExpanded || isHovered || isMobileOpen)
                                && (<svg
                                    className={`ml-auto w-3 h-3 fill-gray-500 transition-transform duration-200 ${
                                        openSubmenu?.index === index
                                            ? "rotate-180 text-blue-500" : ""
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M267.3 395.3c-6.2 6.2-16.4 6.2-22.6 0l-192-192c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L256 361.4 436.7 180.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-192 192z"/>
                                </svg>)}
                        </button>)
                        : (nav.path
                            && (<Link
                                href={nav.path}
                                className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`}>
                            <span
                                className={`${isActive(nav.path)
                                    ? "menu-item-icon-active"
                                    : "menu-item-icon-inactive"}`}>
                                {nav.icon}
                            </span>
                                {(isExpanded || isHovered || isMobileOpen)
                                    && (<span className={`menu-item-text`}>{nav.name}</span>)}
                            </Link>))
                    }
                    {
                        nav.subItems && (isExpanded || isHovered || isMobileOpen)
                        && (<div ref={(el) => {
                                subMenuRefs.current[`${index}`] = el
                            }}
                                 className="overflow-hidden relative transition-all duration-300"
                                 style={{
                                     height: openSubmenu?.index === index
                                         ? `${subMenuHeight[`${index}`]}px`
                                         : "0",
                                 }}>
                                <ul
                                    className={cn(
                                        'mt-2 space-y-1 ml-8 relative',
                                        'before:absolute before:-start-2.5 before:top-0',
                                        'before:bottom-0 before:border-l before:border-gray-200',
                                        'dark:before:border-gray-700'
                                    )}>
                                    {nav.subItems.map((subItem) => (
                                        <li key={subItem.name}>
                                            <Link
                                                href={subItem.path}
                                                className={`menu-dropdown-item ${
                                                    isActive(subItem.path)
                                                        ? "menu-dropdown-item-active"
                                                        : "menu-dropdown-item-inactive"
                                                }`}>
                                                {subItem.name}
                                                <span className="flex items-center gap-1 ml-auto">
                                                    {subItem.pro
                                                        && (<span
                                                                className={`ml-auto ${
                                                                    isActive(subItem.path)
                                                                        ? "menu-dropdown-badge-active"
                                                                        : "menu-dropdown-badge-inactive"
                                                                } menu-dropdown-badge`}>pro</span>
                                                        )}
                                                    </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                </li>
            ))}
        </ul>
    )

    const [openSubmenu, setOpenSubmenu] = useState<{ index: number } | null>(null)
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({})
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({})

    const isActive = useCallback((path: string) => path === pathname, [pathname])

    useEffect(() => {
        let submenuMatched = false
        navItems.forEach(({subItems}, index) => {
            if (subItems) {
                subItems.forEach((subItem) => {
                    if (isActive(subItem.path)) {
                        setOpenSubmenu({index})
                        submenuMatched = true
                    }
                })
            }
        })

        if (!submenuMatched) {
            setOpenSubmenu(null)
        }
    }, [pathname, isActive])

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.index}`
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0
                }))
            }
        }
    }, [openSubmenu])

    const handleSubmenuToggle = (index: number) => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (prevOpenSubmenu && prevOpenSubmenu.index === index) {
                return null
            }
            return {index}
        })
    }

    return (
        <aside
            className={cn(
                'fixed mt-16 flex flex-col lg:mt-0 h-screen',
                'top-0 px-5 left-0 z-50 bg-white dark:bg-gray-900',
                'dark:border-gray-800 text-gray-900 border-gray-200',
                'transition-all duration-300 ease-in-out border-r lg:translate-x-0',
                [isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'],
                [isMobileOpen ? "translate-x-0" : "-translate-x-full"]
            )}>
            <div
                className={`py-8 flex  ${
                    !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                }`}>
                <Link href="/panel">
                    {isExpanded || isHovered || isMobileOpen
                        ? (<>
                            <Image
                                className="dark:hidden"
                                src="/images/logo/logo.svg"
                                alt="Logo"
                                width={150}
                                height={40}
                            />
                            <Image
                                className="hidden dark:block"
                                src="/images/logo/logo-dark.svg"
                                alt="Logo"
                                width={150}
                                height={40}
                            />
                        </>)
                        : (<Image
                            src="/images/logo/logo-icon.svg"
                            alt="Logo"
                            width={32}
                            height={32}
                        />)
                    }
                </Link>
            </div>

            <div className="flex flex-col justify-between h-full overflow-y-auto duration-300 ease-linear no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div className="hidden lg:block">
                            <form>
                                <div className="relative">
                                <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                                    <svg
                                        className="size-5 fill-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M384 208A176 176 0 1 0 32 208a176 176 0 1 0 352 0zM343.3 366C307 397.2 259.7 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 51.7-18.8 99-50 135.3L507.3 484.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L343.3 366z"/></svg>
                                </span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="Search ..."
                                        className={cn(
                                            'dark:bg-dark-900 w-full rounded-lg border border-gray-200',
                                            'bg-transparent py-3 pl-12 pr-14 text-sm text-gray-800 shadow-xs',
                                            'placeholder:text-gray-400 focus:border-blue-300 focus:outline-0',
                                            'dark:border-gray-800 dark:bg-gray-900',
                                            'dark:text-white dark:placeholder:text-gray-200'
                                        )}/>

                                    <button
                                        className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center rounded-lg border border-gray-200 bg-gray-50 px-1.5 py-1.5 text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                                        <span> ⌘  / </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div>
                            {renderMenuItems(navItems)}
                        </div>
                    </div>
                </nav>
                {isExpanded || isHovered || isMobileOpen ? <SidebarWidget/> : null}
            </div>
        </aside>
    )
}

export default AppSidebar