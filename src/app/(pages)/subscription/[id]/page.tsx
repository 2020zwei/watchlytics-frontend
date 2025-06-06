"use client"
import CheckoutForm from '@/components/CheckoutForm'
import { Button } from '@/components/common/baseButton/BaseButton'
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Icon from '@/components/common/Icon'
import clsx from 'clsx'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from 'next/navigation'
import { sendRequest } from '@/utils/apis'
import { Spinner } from '@heroui/react'
const planIcons = {
    "FREE": "freePlan",
    "BASIC": "basicPlan",
    "ADVANCED": "advancePlan",
    "PRO": "proPlan",
}

const page = () => {
    const { id } = useParams()
    const [plan, setPlan] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const getSubscriptions = () => {
        setLoading(true)
        sendRequest({ url: `/plans/${id}/`, method: "GET" }).then(res => {
            setPlan(res.data)
            setLoading(false)
        })
    }
    useEffect(() => {
        id && getSubscriptions()
    }, [id])
    // @ts-ignore
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);
    const [paymentType, setPaymentType] = useState<boolean>(true)
    if (loading) {
        return <div className="h-[calc(100vh-200px)] flex justify-center items-center"><Spinner /></div>
    }

    return (
        <main className='container max-w-screen-lg pb-10'>
            <header className='flex items-center text-blue-850 pt-7 gap-2'>
                <Image src="/blue-logo.png" alt='logo' width={40} height={40} />
                <span className='text-2xl font-medium'>Watchlytics</span>
            </header>
            <RoundedBox className='!bg-blue-100 md:p-14 p-5 mt-10'>
                <div className='grid md:grid-cols-12 xl:gap-14 lg:gap-10 md:gap-7 gap-5'>
                    <RoundedBox className='lg:col-span-8 md:col-span-7 col-span-12 !bg-transparent border border-gray-180'>
                        <div className='max-w-[620px] mx-auto px-4'>
                            <div className='mx-auto text-center pt-8 px-5'>
                                <h1 className=' font-bold lg:text-3xl md:text-2xl text-xl text-blue-850 pb-1'>Subscription Plan</h1>
                                <p className='text-gray-180'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacus facilisi donece gestas egestas pellentesque magna.</p>
                            </div>
                            <h3 className=' text-blue-850 text-2xl font-medium text-center pt-3'>Select Payment Method:</h3>
                            <div className="flex items-center justify-center mt-5 gap-6">
                                <button className={clsx("p-[0.04rem] rounded-lg min-w-[83px]", paymentType ? "border-gradient" : "")} onClick={() => setPaymentType(true)}>
                                    <span className='bg-[#F2F5FF] w-full rounded-lg text-blue-850 text-xl font-semibold h-9 flex justify-center items-center'><Icon name='visacard' /></span>
                                </button>
                                <button className={clsx("p-[0.04rem] rounded-lg min-w-[83px]", paymentType ? "" : "border-gradient ")} onClick={() => setPaymentType(false)}>
                                    <span className='bg-[#F2F5FF] w-full rounded-lg text-blue-850 text-xl font-semibold h-9 flex justify-center items-center'><Icon name='paypal' /></span>
                                </button>
                            </div>

                            <div className='pb-3'>
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm planName={plan.name} priceId={plan.stripe_price_id} />
                                </Elements>
                            </div>
                        </div>
                    </RoundedBox>
                    <div className='lg:col-span-4 md:col-span-5 col-span-12 gap-4 md:order-1 -order-1 md:mb-0 mb-5'>
                        {
                            <RoundedBox className={clsx("relative h-full !bg-transparent border border-gray-180 px-4 py-7 flex flex-col justify-between")}>
                                <div className='h-full'>
                                    {/* @ts-ignore */}
                                    <div><Icon name={planIcons[plan.name]} /></div>
                                    <div className='pt-10 flex flex-col h-[calc(100%-50px)] justify-between'>
                                        <div>
                                            <h2 className=' font-bold text-3xl text-blue-850'>{plan.heading}</h2>
                                            <h4 className='text-blue-850 font-bold'>Whats Included :</h4>
                                            <ul className='pt-3 flex flex-col gap-3'>
                                                {plan.description?.split(",")?.map((feature: string) => (
                                                    <li className='gap-2 font-medium text-dark-700 flex items-center' key={feature}>
                                                        <span><Icon name='checkmark' className="text-blue-850 text-xl" /></span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className='text-blue-850'>
                                            <span className=' md:text-4xl text-xl font-bold'>${plan.price}</span>
                                            <span className=' font-medium ps-1'>/Month</span>
                                        </div>
                                    </div>
                                </div>

                            </RoundedBox>
                        }

                    </div>
                </div>
            </RoundedBox>
        </main>
    )
}

export default page
