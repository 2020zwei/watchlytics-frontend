import RoundedBox from '@/components/common/baseButton/RoundedBox'
import { TransparentButton } from '@/components/common/baseButton/TransparentButton'
import Icon from '@/components/common/Icon'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <main className='container max-w-screen-lg'>
            <header className='flex items-center text-blue-850 pt-7 gap-2'>
                <Image src="/blue-logo.png" alt='logo' width={40} height={40} />
                <span className='text-2xl font-medium'>Watchlytics</span>
            </header>
            <div className=' max-w-[500px] mx-auto text-center px-2 pt-16'>
                <h1 className=' font-bold lg:text-3xl md:text-2xl text-xl text-blue-850'>Subscription Plan</h1>
                <p className='text-gray-180'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacus facilisi donecegestas egestas pellentesque magna.</p>
            </div>
            <RoundedBox className='bg-blue-100 p-10 mt-10'>
                <div className='grid grid-cols-4'>
                    <RoundedBox className='!bg-transparent border border-blue-150 px-4 py-7'>
                        <div><Icon name='diamond' /></div>
                        <div className='pt-10'>
                            <div>
                                <h2 className=' font-bold text-3xl text-blue-850'>Free</h2>
                                <div>Whats Included :</div>
                                <div>Inventory Management.</div>
                            </div>
                            <div className='text-blue-850'>
                                <span className=' text-4xl font-bold'>$0</span>
                                <span className=' font-medium ps-1'>/ Month</span>
                            </div>
                            <div className="relative p-4 rounded-[10px] overflow-hidden">
                                <div className="absolute bg-blue-gradient rounded-[10px]">fdsf</div>
                                <div className="relative bg-white rounded-[8px] p-4">
                                    Yeh content hai
                                </div>
                            </div>

                        </div>
                    </RoundedBox>
                </div>
            </RoundedBox>
        </main>
    )
}

export default page
