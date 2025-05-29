"use client"
import { Button } from '@/components/common/baseButton/BaseButton'
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Icon from '@/components/common/Icon'
import { Spinner } from '@heroui/react'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useCreateSubcription, usePlans } from '@/hooks/useSubscription'

const planIcons = {
    "FREE": "freePlan",
    "BASIC": "basicPlan",
    "ADVANCED": "advancePlan",
    "PRO": "proPlan",
}

const page = () => {
    const [isOnline, setIsOnline] = useState(true)
    const navigate = useRouter()

    const { data, isLoading: planLoading, isError, error } = usePlans()
    const { mutateAsync: createSubscription, isPending } = useCreateSubcription();

    const handleCheckout = async (item: any) => {
        if (item?.name?.toLowerCase() === "free") {
            try {
                const response = await createSubscription({ plan_name: "free" });
                console.log(response)

                if (response?.status === 400) {
                    toast.info(response?.response?.data?.message || "Already subscribed.");
                } else if (response?.status === 200 || response?.status === 201) {
                    toast.success(response?.message || "Subscribed.");
                    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedin") || "false");
                    if (isLoggedIn) {
                        navigate.push("/dashboard");
                    } else {
                        await fetch('/api/logout');
                        navigate.push("/login");
                    }
                } else {
                    toast.error(response?.response?.data?.message || "Something went wrong.");
                }
            } catch (error: any) {
                toast.error(error?.response?.data?.message || "Subscription failed.");
            }
        } else {
            if (!data?.data?.has_card) {
                navigate.push(`/payments/?id=${item.id}`);
            } else {
                navigate.push(`/checkout/${item.id}`);
            }
        }
    };

    useEffect(() => {
        navigate.push("/subscription");
        const updateOnlineStatus = () => setIsOnline(navigator.onLine);
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    if (planLoading) {
        return <div className="text-center mt-5"><Spinner /></div>
    }

    if (isError || error) {
        console.log(isError, error)
        toast.error("Error")
    }

    if (!isOnline) {
        return <div className='flex items-center justify-center h-screen'><Icon name='offline' /></div>
    }

    const plansData = data?.data

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
            <RoundedBox className='!bg-blue-100'>
                <div className='grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 md:gap-4 gap-8 sm:p-10 p-4 mt-10'>
                    {
                        plansData?.plans?.map((item: any, index: any) => (
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
                                        {item?.name === plansData?.current_plan ?
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
        </main>
    )

}

export default page
