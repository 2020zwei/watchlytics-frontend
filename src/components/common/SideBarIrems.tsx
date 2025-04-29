'use client'

import { SidebarItems } from '@/utils/mock'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'
import Icon from './Icon'


const SideBarItems = () => {
    const router = useRouter()
    const pathname = usePathname()
    const handleLogout = async () => {
        localStorage.removeItem("isLoggedin")
        await fetch('/api/logout')
        router.push('/login')
    }


    return (
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
                                <Icon name={item.icon} />
                                {item.label}
                            </button>
                        ) : (
                            <Link href={item.href} className='flex-1 flex items-center gap-4'>
                                <Icon name={item.icon} />
                                {item.label}
                            </Link>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}

export default SideBarItems
