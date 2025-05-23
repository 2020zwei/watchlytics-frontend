"use client"
import { Button } from '@/components/common/baseButton/BaseButton'
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Icon from '@/components/common/Icon'
import { Plans } from '@/types'
import { sendRequest } from '@/utils/apis'
import { Spinner } from '@heroui/react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
const planIcons = {
    "FREE": "freePlan",
    "BASIC": "basicPlan",
    "ADVANCED": "advancePlan",
    "PRO": "proPlan",
}
const page = () => {
    const [plansTypes, setPlansTypes] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [isOnline, setIsOnline] = useState(true)
    const navigate = useRouter()
    const [error, setError] = useState<any>()
    const getSubscriptions = () => {
        setLoading(true)
        sendRequest({ url: "/plans/", method: "GET" }).then(res => {
            if (res?.status === 200) {
                setPlansTypes(res?.data)
            }
            else {
                setError(res)
            }
        }).finally(() => {
            setLoading(false)
        })
    }
    const handleCheckout = async (item: any) => {
        if (item?.name?.toLowerCase() === "free") {
            sendRequest({ url: "/subscribe/", method: "POST", payload: { plan_name: "free" } })
                .then(async (res) => {
                    if (res?.status === 400) {
                        toast.info(res?.response?.data?.message);
                    }
                    if (res?.status === 200 || res?.status === 201) {
                        toast.success(res?.message);
                        const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedin") || "false");
                        if (isLoggedIn) {
                            navigate.push("/profile");
                        }
                        else {
                            await fetch('/api/logout')
                            navigate.push("/login")
                        }
                    } else {
                        if (res?.data?.response) {
                            toast.error(res?.data?.response?.errors?.error || res?.data?.response?.message);
                        }
                    }
                })
        }
        else {
            if (plansTypes?.has_card) {
                navigate.push(`/payments/?id=${item.id}`)
            }
            else {
                navigate.push(`/checkout/${item.id}`)
            }
        }
    }

    useEffect(() => {
        navigate.push("/subscription")
        getSubscriptions()

        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine)
        }

        // Set initial online status
        setIsOnline(navigator.onLine)

        // Listen for online/offline events
        window.addEventListener('online', updateOnlineStatus)
        window.addEventListener('offline', updateOnlineStatus)

        // Cleanup listeners on unmount
        return () => {
            window.removeEventListener('online', updateOnlineStatus)
            window.removeEventListener('offline', updateOnlineStatus)
        }
    }, [])
    if (!isOnline && !loading) {
        return <div className='flex items-center justify-center h-screen'><Icon name='offline' /></div>
    }
    return (
        <main className='container max-w-screen-lg pb-10'>
            <header className='flex items-center text-blue-850 pt-7 gap-2'>
                <Image src="/images/blue-logo.png" alt='logo' width={40} height={40} />
                <span className='text-2xl font-medium'>Watchlytics</span>
            </header>
            <div className=' max-w-[500px] mx-auto text-center px-2 pt-16'>
                <h1 className=' font-bold lg:text-3xl md:text-2xl text-xl text-blue-850'>Subscription Plan</h1>
                <p className='text-gray-180'>Explore our subscription plans tailored to boost your experience.</p>
            </div>
            {error?.code === "ERR_NETWORK" && <div className='text-center pt-5'>{error?.message}</div>}
            {
                loading ? <div className="h-[calc(100vh-200px)] flex justify-center items-center"><Spinner /></div>
                    : plansTypes?.plans?.length && <RoundedBox className='!bg-blue-100'>
                        <div className='grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 md:gap-4 gap-8 sm:p-10 p-4 mt-10'>
                            {
                                plansTypes?.plans?.map((item: any, index: any) => (
                                    <div key={item.name} className={clsx(" min-h-[700px] plan-card relative !bg-transparent flex flex-col justify-between", index === 1 || index === 3 ? "sm:mt-24" : "", item.name?.toLowerCase())}>
                                        <div className={clsx("border border-blue-150 rounded-lg px-4 py-7", [1, 3].includes(index) ? "h-full" : " h-[calc(100%-100px)]")}>
                                            <div className='h-[calc(100%-170px)]'>
                                                <div className='flex items-center justify-between'>
                                                    {/* @ts-ignore */}
                                                    <Icon name={planIcons[item.name]} />
                                                    {item.is_popular ? <Button title='Popular' className='h-10 pointer-events-none cursor-default'></Button> : null}
                                                </div>
                                                <div className='pt-10 flex flex-col justify-between'>
                                                    <div>
                                                        <h2 className=' font-bold text-3xl text-blue-850'>{item.name}</h2>
                                                        <h4 className='text-blue-850 font-bold'>What`s Included :</h4>
                                                        <ul className='pt-3 flex flex-col gap-3'>
                                                            {item.description?.split(",")?.map((feature: any) => (
                                                                <li className='gap-2 font-medium text-dark-700 flex' key={feature}>
                                                                    <span><Icon name='checkmark' className="text-blue-850 text-xl" /></span>
                                                                    {feature}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='text-blue-850 pt-5 pb-10'>
                                                    <span className='md:text-4xl text-xl font-bold'>${item.price}</span>
                                                    <span className=' font-medium ps-1'>/ Month</span>
                                                </div>
                                                {item?.name === plansTypes?.current_plan ?
                                                    <div className="w-full bg-blue-gradient rounded-[10px]  text-white/80 text-xl font-semibold h-14 flex justify-center items-center
                                                    ">
                                                        Get Started
                                                    </div>
                                                    :

                                                    <div className="relative p-[2px] w-full bg-blue-gradient rounded-[10px] overflow-hidden transition-all duration-300">
                                                        <button type='button' onClick={() => handleCheckout(item)}
                                                            className="relative w-full rounded-[8px] bg-[#E4E8F4] hover:bg-transparent hover:text-white transition-all duration-300 text-blue-850 text-xl font-semibold h-14 flex justify-center items-center"
                                                        >
                                                            Get Started
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </RoundedBox>
            }
        </main>
    )
}

export default page
