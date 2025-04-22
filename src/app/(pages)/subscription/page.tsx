"use client"
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Icon from '@/components/common/Icon'
import { Plans } from '@/types'
import { sendRequest } from '@/utils/apis'
import { Spinner } from '@heroui/react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
const planIcons = {
    "FREE": "freePlan",
    "BASIC": "basicPlan",
    "ADVANCED": "advancePlan",
    "PRO": "proPlan",
}
const page = () => {
    const [plansTypes, setPlansTypes] = useState<Plans[]>([])
    const [loading, setLoading] = useState(false)
    const getSubscriptions = () => {
        setLoading(true)
        sendRequest({ url: "/plans/", method: "GET" }).then(res => {
            setPlansTypes(res.data.plans)
            setLoading(false)
        })
    }
    useEffect(() => {
        getSubscriptions()
    }, [])

    return (
        <main className='container max-w-screen-lg pb-10'>
            <header className='flex items-center text-blue-850 pt-7 gap-2'>
                <Image src="/blue-logo.png" alt='logo' width={40} height={40} />
                <span className='text-2xl font-medium'>Watchlytics</span>
            </header>
            <div className=' max-w-[500px] mx-auto text-center px-2 pt-16'>
                <h1 className=' font-bold lg:text-3xl md:text-2xl text-xl text-blue-850'>Subscription Plan</h1>
                <p className='text-gray-180'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacus facilisi donece gestas egestas pellentesque magna.</p>
            </div>
            {
                loading ? <div className="h-[calc(100vh-200px)] flex justify-center items-center"><Spinner /></div>
                    : <RoundedBox className='!bg-blue-100'>
                        <div className='grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 md:gap-4 gap-8 sm:p-10 p-4 mt-10'>
                            {
                                plansTypes.map((item, index) => (
                                    <RoundedBox key={item.name} className={clsx("max-h-[600px] min-h-[600px] relative !bg-transparent border border-blue-150 px-4 py-7 flex flex-col justify-between", index === 1 || index === 3 ? "sm:mt-24" : "")}>
                                        <div className='h-[calc(100%-130px)]'>
                                            {/* @ts-ignore */}
                                            <div><Icon name={planIcons[item.name]} /></div>
                                            <div className='pt-10 flex flex-col h-full justify-between'>
                                                <div>
                                                    <h2 className=' font-bold text-3xl text-blue-850'>{item.name}</h2>
                                                    <h4 className='text-blue-850 font-bold'>Whats Included :</h4>
                                                    <ul className='pt-3 flex flex-col gap-3'>
                                                        {item.description?.split(",")?.map((feature) => (
                                                            <li className='gap-2 font-medium text-dark-700 flex' key={feature}>
                                                                <span><Icon name='checkmark' className="text-blue-850 text-xl" /></span>
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className='text-blue-850'>
                                                    <span className='md:text-4xl text-xl font-bold'>{item.price}</span>
                                                    <span className=' font-medium ps-1'>/Month</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative p-[2px] w-full bg-blue-gradient rounded-[10px] overflow-hidden hover:opacity-70 transition-all duration-300">
                                            <Link href={`/subscription/${item.id}`} className=" relative w-full rounded-[8px] bg-[#F2F5FF] text-blue-850 text-xl font-semibold h-14 flex justify-center items-center">
                                                Get Started
                                            </Link>
                                        </div>
                                    </RoundedBox>
                                ))}
                        </div>
                    </RoundedBox>
            }
        </main>
    )
}

export default page
