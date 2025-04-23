"use client"
import { Button } from '@/components/common/baseButton/BaseButton'
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import { TransparentButton } from '@/components/common/baseButton/TransparentButton'
import Heading from '@/components/common/heading'
import Icon from '@/components/common/Icon'
import { sendRequest } from '@/utils/apis'
import { Spinner } from '@heroui/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const [subscription, setSubscription] = useState<any>()
  const [loading, setLoading] = useState(false)
  const navigate = useRouter()
  const [isDisabled, setIsDisabled] = useState(false)

  const getSubscriptionDetail = () => {
    setLoading(true)
    sendRequest({ url: "/subscription/details/", method: "GET" }).then(res => {
      setLoading(false)
      setSubscription(res.data.plan)
    })
  }

  const handleCancleSubscription = () => {
    sendRequest({ url: "/subscribe/", method: "POST", payload: { is_cancelled_subscription: "true" } }).then(res => {
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        setIsDisabled(true)
      }
      else {
        toast.error("Something went wrong")
      }
    })
  }

  useEffect(() => {
    getSubscriptionDetail()
  }, [])



  if (loading) {
    return <div className="h-[calc(100vh-200px)] flex justify-center items-center"><Spinner /></div>
  }

  return (
    <div>
      <Heading className='!text-2xl pb-6'>Subscription</Heading>
      <RoundedBox className='p-4 pb-6'>
        <div className='flex justify-between items-end sm:flex-row flex-col gap-5'>
          <div className='max-w-[730px] pe-7'>
            <p className=' text-gray-190'>Current Plan</p>
            <div>
              <div className='flex items-center gap-3'>
                <Heading className='!text-2xl !font-semibold'>{subscription?.current_subscription}</Heading>
                <span className='text-sm pt-1 text-gray-180'>{subscription?.end_date}</span>
              </div>
              <ul className='pt-3 flex flex-col gap-3'>
                {subscription?.features?.split(",")?.map((feature: string) => (
                  <li className='gap-2 font-medium text-dark-700 flex' key={feature}>
                    <span><Icon name='checkmark' className="text-blue-850 text-xl" /></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Button title='Upgrade Plan' className='h-10 !min-w-[166px] max-w-[166px]' onPress={() => navigate.push(`/subscription`)}></Button>
            {
              subscription?.current_subscription.toLowerCase() !== "free" ?
                <TransparentButton isDisabled={subscription?.is_cancel_subscription || isDisabled} title='Cancel Subscription' className='h-10 !min-w-[166px] max-w-[166px]'
                  onPress={() => subscription?.is_cancel_subscription || isDisabled ? undefined : handleCancleSubscription()}></TransparentButton>
                : null
            }

          </div>
        </div>
      </RoundedBox >
    </div >
  )
}

export default page