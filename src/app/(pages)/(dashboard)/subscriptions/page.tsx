"use client"
import { Button } from '@/components/common/baseButton/BaseButton'
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import { TransparentButton } from '@/components/common/baseButton/TransparentButton'
import Heading from '@/components/common/heading'
import Icon from '@/components/common/Icon'
import { useCancelSubscription, useSubcriptionDetail } from '@/hooks/useSubscription'
import { Spinner } from '@heroui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useRouter()
  const [isDisabled, setIsDisabled] = useState(false)
  const { mutateAsync: cacelSubscription, isPending } = useCancelSubscription();
  const { data, isLoading } = useSubcriptionDetail()

  const handleCancleSubscription = () => {
    cacelSubscription({ is_cancelled_subscription: "true" }, {
      onSuccess(data) {
        toast.success(data?.data?.message)
        setIsDisabled(true)
      },
      onError(error) {
        // @ts-ignore
        toast.error(error?.response?.data?.message || "Something went wrong")
      },
    })
  }

  if (isLoading) {
    return <div className="h-[calc(100vh-200px)] flex justify-center items-center"><Spinner /></div>
  }
  const subscription = data?.data?.plan
  console.log(subscription)

  return (
    <div>
      <Heading className='!text-2xl pb-6'>Subscription</Heading>
      <RoundedBox className='p-4 pb-6'>
        <div className='flex justify-between items-end sm:flex-row flex-col gap-5'>
          <div className='max-w-[730px] pe-7'>
            {subscription?.current_subscription ? <p className=' text-gray-190'>Current Plan</p> :
              <div className=' text-gray-190 max-w-[600px]'>
                You currently don't have an active subscription. Choose a plan to unlock premium features and get started!
              </div>
            }

            <div>
              <div className='flex items-center gap-3'>
                <Heading className='!text-2xl !font-semibold'>{subscription?.current_subscription}</Heading>
                <span className='text-sm pt-1 text-gray-180'>{subscription?.end_date}</span>
              </div>
              <ul className='pt-3 flex flex-col gap-3'>
                {subscription?.features?.length ? subscription?.features?.split(",")?.map((feature: string) => (
                  <li className='gap-2 font-medium text-dark-700 flex' key={feature}>
                    <span><Icon name='checkmark' className="text-blue-850 text-xl" /></span>
                    {feature}
                  </li>
                )) : null}
              </ul>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            {subscription?.current_subscription && subscription?.current_subscription?.toLowerCase() !== "pro" ?
              <Button title='Upgrade Plan' className='h-10 !min-w-[166px] max-w-[166px]' onPress={() => navigate.push(`/subscription`)}></Button> : null}
            {subscription?.current_subscription && subscription?.current_subscription?.toLowerCase() !== "basic" && subscription?.current_subscription?.toLowerCase() !== "free" ?
              <Button title='Downgrade Plan' className='h-10 !min-w-[166px] max-w-[166px]' onPress={() => navigate.push(`/subscription`)}></Button> : null}
            {
              subscription?.current_subscription && subscription?.current_subscription?.toLowerCase() !== "free" ?
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