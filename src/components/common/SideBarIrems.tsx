'use client'

import { SidebarItems } from '@/utils/mock'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

const SideBarItems = () => {
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = async () => {
        localStorage.removeItem("isLoggedin")
        await fetch('/api/logout')
        router.push('/login')
    }

    return (
        <aside className="start-0 scrollable top-0 bg-blue-gradient fixed px-4 xl:min-w-[280px] w-[220px] h-screen overflow-y-auto pb-8 z-50">
            <ul className="flex flex-col gap-5">
                <li className="gap-3 flex items-center xl:text-2xl text-xl font-medium text-white py-8 relative">
                    <Image src="/images/white-logo.png" alt="logo" width={40} height={40} />
                    <span>Watchlytics</span>
                </li>

                {SidebarItems.map((item) => {
                    const isActive = pathname === item.href

                    return (
                        <li
                            key={item.label}
                            className={clsx(
                                'hover:bg-white/10 duration-300 px-4 xl:py-4 py-3 rounded-lg font-medium relative',
                                isActive ? 'bg-white/10 text-white' : 'text-gray-200'
                            )}
                        >


                            {item.href === '#' ? (
                                <button onClick={handleLogout} className='flex-1 flex items-center gap-4'>
                                    <Image src={item.icon} alt="icon" width={22} height={22} />
                                    {item.label}
                                </button>
                            ) : (
                                <Link href={item.href} className='flex-1 flex items-center gap-4'>
                                    <Image src={item.icon} alt="icon" width={22} height={22} />
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}

export default SideBarItems
