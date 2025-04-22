"use client"
import { SidebarItems } from '@/utils/mock'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const SideBarIrems = () => {
    const navigate = useRouter()
    const onLogout = async (e: any, href: string) => {
        e.preventDefault()
        if (href == "#") {
            await fetch("/api/logout");
            navigate.push("/login")
        }
    }
    return (
        <aside className=' start-0 scrollable top-0 bg-blue-gradient fixed px-4 xl:min-w-[280px] w-[220px] h-screen overflow-y-auto pb-8 z-50'>
            <ul className='flex flex-col gap-5'>
                <li className='gap-3 flex items-center xl:text-2xl text-xl font-medium text-white py-8 relative'>
                    <Image src="/logo.png" alt='logo' width={40} height={40} />
                    <span>Watchlytics</span>
                </li>
                {SidebarItems.map((item, index) => (<li className={clsx(' hover:bg-white/10 duration-300 flex items-center px-4 xl:py-4 py-3 rounded-lg font-medium gap-4 relative', index ? "text-gray-25" : "bg-white/10 text-white")} key={item.label}>
                    <Image src={item.icon} alt='image' width={22} height={22} />
                    <Link onClick={(e) => onLogout(e, item.href)} href={item.href}>{item.label}</Link>
                </li>))}
            </ul>
        </aside>
    )
}

export default SideBarIrems
