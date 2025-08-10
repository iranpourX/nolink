"use client";
import React, {useCallback, useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {usePathname} from 'next/navigation'
import {useSidebar} from '@/context/SidebarContext'
import {cn} from '@/utils/helper'
import {
    FoldersIcon,
    AnalyticsIcon,
    LinkIcon,
    TagsIcon,
    GearIcon,
} from '@/icons'
import SidebarWidget from "./SidebarWidget"

type NavItem = {
    name: string
    icon: React.ReactNode
    path?: string
    subItems?: {
        name: string
        path: string
        pro?: boolean
        new?: boolean
    }[]
}

const navItems: NavItem[] = [
    {
        icon: <LinkIcon/>,
        name: "Links",
        path: '/panel/links',
    },
    {
        icon: <TagsIcon/>,
        name: "Tags",
        path: "/panel/tags",
    },
    {
        icon: <FoldersIcon/>,
        name: "Categories",
        path: "/panel/profile",
    },
    {
        icon: <AnalyticsIcon/>,
        name: "Analytics",
        path: "/panel/analytics",
    },
    {
        icon: <GearIcon/>,
        name: "Settings",
        subItems: [
            {name: "Profile", path: "/panel/settings/profile"},
            {name: "People", path: "/error-404"},
            {name: "API", path: "/error-404"},
            {name: "Notifications", path: "/error-404"},
            {name: "Billings", path: "/error-404"},
            {name: "System", path: "/error-404"},
        ],
    }
];

const AppSidebar: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const {isExpanded, isMobileOpen, isHovered, setIsHovered} = useSidebar()
    const pathname = usePathname()

    const renderMenuItems = (
        navItems: NavItem[]
    ) => (
        <ul className="flex flex-col gap-y-2 mt-4">
            {navItems.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index)}
                            className={`menu-item group ${
                                openSubmenu?.index === index
                                    ? "menu-item-active"
                                    : "menu-item-inactive"
                            } cursor-pointer ${
                                !isExpanded && !isHovered
                                    ? "lg:justify-center"
                                    : "lg:justify-start"
                            }`}
                        >
                            <span
                                className={`${
                                    openSubmenu?.index === index
                                        ? "menu-item-icon-active"
                                        : "menu-item-icon-inactive"
                                }`}
                            >
                                    {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <span className={`menu-item-text`}>{nav.name}</span>
                            )}
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <svg
                                    className={`ml-auto w-3 h-3 fill-gray-500 transition-transform duration-200 ${
                                        openSubmenu?.index === index
                                            ? "rotate-180 text-blue-500" : ""
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M267.3 395.3c-6.2 6.2-16.4 6.2-22.6 0l-192-192c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L256 361.4 436.7 180.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-192 192z"/>
                                </svg>
                            )}
                        </button>
                    ) : (nav.path && (
                        <Link
                            href={nav.path}
                            className={`menu-item group ${
                                isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                            }`}
                        >
                            <span
                                className={`${
                                    isActive(nav.path)
                                        ? "menu-item-icon-active"
                                        : "menu-item-icon-inactive"
                                }`}
                            >
                                {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <span className={`menu-item-text`}>{nav.name}</span>
                            )}
                        </Link>
                    ))
                    }
                    {
                        nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                            <div
                                ref={(el) => {
                                    subMenuRefs.current[`${index}`] = el
                                }}
                                className="overflow-hidden relative transition-all duration-300"
                                style={{
                                    height: openSubmenu?.index === index
                                        ? `${subMenuHeight[`${index}`]}px`
                                        : "0",
                                }}
                            >
                                <ul
                                    className={cn(
                                        'mt-2 space-y-1 ml-8 relative',
                                        'before:absolute before:-start-2.5 before:top-0',
                                        'before:bottom-0 before:border-l before:border-gray-200',
                                        'dark:before:border-gray-700'
                                    )}
                                >
                                    {nav.subItems.map((subItem) => (
                                        <li key={subItem.name}>
                                            <Link
                                                href={subItem.path}
                                                className={`menu-dropdown-item ${
                                                    isActive(subItem.path)
                                                        ? "menu-dropdown-item-active"
                                                        : "menu-dropdown-item-inactive"
                                                }`}
                                            >
                                                {subItem.name}
                                                <span className="flex items-center gap-1 ml-auto">
                                                    {subItem.new && (
                                                        <span
                                                            className={`ml-auto ${
                                                                isActive(subItem.path)
                                                                    ? "menu-dropdown-badge-active"
                                                                    : "menu-dropdown-badge-inactive"
                                                            } menu-dropdown-badge `}
                                                        >
                                                                new
                                                            </span>
                                                    )}
                                                    {subItem.pro && (
                                                        <span
                                                            className={`ml-auto ${
                                                                isActive(subItem.path)
                                                                    ? "menu-dropdown-badge-active"
                                                                    : "menu-dropdown-badge-inactive"
                                                            } menu-dropdown-badge `}
                                                        >
                                                                pro
                                                            </span>
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
    );

    const [openSubmenu, setOpenSubmenu] = useState<{ index: number } | null>(null)
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({})
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({})

    // const isActive = (path: string) => path === pathname
    const isActive = useCallback((path: string) => path === pathname, [pathname])

    useEffect(() => {
        // Check if the current path matches any submenu item
        let submenuMatched = false
        navItems.forEach((nav, index) => {
            if (nav.subItems) {
                nav.subItems.forEach((subItem) => {
                    if (isActive(subItem.path)) {
                        setOpenSubmenu({index})
                        submenuMatched = true
                    }
                })
            }
        })

        // If no submenu item matches, close the open submenu
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
    };

    return (
        <aside
            className={cn(
                'fixed mt-16 flex flex-col lg:mt-0 h-screen',
                'top-0 px-5 left-0 z-9 bg-white dark:bg-gray-900',
                'dark:border-gray-800 text-gray-900 border-gray-200',
                'transition-all duration-300 ease-in-out border-r lg:translate-x-0',
                [isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'],
                [isMobileOpen ? "translate-x-0" : "-translate-x-full"]
            )}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`py-8 flex  ${
                    !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                }`}
            >
                <Link href="/panel">
                    {isExpanded || isHovered || isMobileOpen ? (
                        <>
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
                        </>
                    ) : (
                        <Image
                            src="/images/logo/logo-icon.svg"
                            alt="Logo"
                            width={32}
                            height={32}
                        />
                    )}
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
                                        viewBox="0 0 512 512"
                                    >
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
                                        )}
                                    />

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
