import RoundedBox from '@/components/common/baseButton/RoundedBox'
import { TransparentButton } from '@/components/common/baseButton/TransparentButton'
import Heading from '@/components/common/heading'
import React from 'react'

const pages = () => {
    return (
        <RoundedBox className='py-8 '>
            <div className='px-4'>
                <div className='border-b border-[#F0F1F3] flex items-center justify-between pb-2'>
                    <Heading className='pb-4'>New Invoice</Heading>
                    <TransparentButton title='Export' className='h-10 !text-[#ACACAC] !px-4 !border-[#D9D9D9]' icon='upload' iconFill='#ACACAC' />
                </div>
                <div className='flex items-center gap-x-5 mt-6'>
                    <h4 className=' text-2xl font-normal text-dark-800'>UXERFLOW-INV001</h4>
                    <span className=' font-medium text-dark-800'>for</span>
                    <span className='text-dark-700 font-medium'>$450.62</span>
                    <span className=' w-[96px] h-[25px] rounded-md bg-[#10A7601A] text-dark-700 text-center font-medium'>Paid</span>
                </div>
                <Heading className=' border-b border-[#F0F1F3] pb-4 mt-4'>Summary</Heading>

                <div className='mt-3 flex flex-col gap-3'>
                    <div className='flex max-w-[670px] items-center justify-between gap-4'>
                        <div className='text-sm font-medium flex flex-1 items-center'>
                            <span className='text-dark-700 min-w-[110px] min-w-[110px]'>Invoice ID:</span>
                            <span className='text-dark-800'>UXERFLOW-INV001</span>
                        </div>
                        <div className='text-sm font-medium flex flex-1 items-center'>
                            <span className='text-dark-700 min-w-[110px]'>Email:</span>
                            <span className='text-dark-800'>carter.press@gmail.com</span>
                        </div>
                    </div>
                    <div className='flex max-w-[670px] items-center justify-between gap-4'>
                        <div className='text-sm font-medium flex flex-1 items-center'>
                            <span className='text-dark-700 min-w-[110px]'>Currency:</span>
                            <span className='text-dark-800'>USD</span>
                        </div>
                        <div className='text-sm font-medium flex flex-1 items-center'>
                            <span className='text-dark-700 min-w-[110px]'>Name:</span>
                            <span className='text-dark-800'>Carter Press</span>
                        </div>
                    </div>
                    <div className='flex max-w-[670px] items-center justify-between gap-4'>
                        <div className='text-sm font-medium flex flex-1 items-center'>
                            <span className='text-dark-700 min-w-[110px]'>Start Date:</span>
                            <span className='text-dark-800'>March 25, 2025</span>
                        </div>
                        <div className='text-sm font-medium flex flex-1 items-center'>
                            <span className='text-dark-700 min-w-[110px]'>Bill Details:</span>
                            <span className='text-dark-800'>March 25, 2025, 4:00 PM</span>
                        </div>
                    </div>
                    <div className='flex max-w-[670px] items-center justify-between gap-4'>
                        <div className='text-sm font-medium flex items-center'>
                            <span className='text-dark-700 min-w-[110px]'>Billing</span>
                            <span className='text-dark-800'>Send Invoice</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-7'>
                <div>
                    <table className=' w-full'>
                        <thead>
                            <tr className='text-dark-800 font-medium text-sm'>
                                <th className='text-start pb-2'><div className='flex-1 px-4'>Product ID</div></th>
                                <th className='text-start pb-2'><div className='flex-1'>QTY</div></th>
                                <th className='text-start pb-2'><div className='flex-1 pe-5'>Unit Price</div></th>
                                <th className='text-start pb-2'> <div className='flex-1'>Amount</div></th>
                            </tr>
                        </thead>
                        <thead className='mt-3 text-dark-700 font-medium text-sm bg-[#003BFF0D] h-10'>
                            <tr>
                                <th className='text-start w-1/4 rounded-s-lg'><div className='flex-1 px-4'>#edf8918</div></th>
                                <th className='text-start w-1/4'><div className='flex-1'>05</div></th>
                                <th className='text-start w-1/4'> <div className='flex-1'>$33.03</div></th>
                                <th className='text-start w-1/4 rounded-e-lg'><div className='flex-1'>$165.16</div></th>
                            </tr>
                        </thead>
                        <tbody className='font-medium text-sm'>
                            <tr>
                                <td></td>
                                <td></td>
                                <td className=''><div className='text-dark-800 pt-5'>Subtotal:</div></td>
                                <td className=''><div className='text-dark-700 pt-5'>$165.16</div></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td className=''> <div className='text-dark-800 pt-2'>Total:</div></td>
                                <td className=''><div className='text-dark-700 pt-2'>$165.16</div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </RoundedBox>
    )
}

export default pages
