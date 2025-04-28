"use client"
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import { REPORTFILTEROPTIONS } from '@/utils/mock'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Reports = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleFilter = (value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('filter', value);
        router.push(`/reports?${currentParams.toString().replace(/ /g, '-')}`);
    };

    return (
        <div>
            <div className='flex items-center justify-between'>
                <Heading as='h3' className=' md:text-2xl text-lg'>Inventory Valuation Report</Heading>
                <div className='border rounded-lg border-gray-200 md:px-5 px-3'>
                    <select onChange={(e) => handleFilter(e.target.value)} className="bg-transparent outline-none text-sm text-gray-650 min-h-10 md:pe-6 pe-3 md:min-w-[290px] p-3">
                        {REPORTFILTEROPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-5 mt-4'>
                <RoundedBox className='!bg-white'>
                    <div className='px-3 pt-4 border-b text-gray-650 pb-5 mb-5'>
                        <Heading as='h3'>Overview</Heading>
                        <div className=' grid grid-cols-3 pt-5'>
                            <div className=' text-sm text-gray-500'>
                                <div>$17,432</div>
                                <div className=' text-sm font-medium text-dark-600 mt-3'>Total Profit</div>
                            </div>
                            <div className=' text-sm text-gray-500'>
                                <div>$17,432</div>
                                <div className=' text-sm font-medium text-orange-700 mt-3'>Revenue</div>
                            </div>
                            <div className=' text-sm text-gray-500'>
                                <div>$17,432</div>
                                <div className=' text-sm font-medium text-pink-500 mt-3'>Sales</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between px-3 pb-5 gap-3'>
                        <div className="">
                            <div className='text-gray-600 text-sm '>$17,432</div>
                            <div className=' text-sm font-medium text-dark-500 mt-3'>Total Profit</div>
                        </div>
                        <div className="">
                            <div className='text-gray-600 text-sm '>$1,10,432</div>
                            <div className=' text-sm font-medium text-dark-500 mt-3'>Net sales value</div>
                        </div>
                        <div className="md:pe-6">
                            <div className='text-gray-600 text-sm '>$1,10,432</div>
                            <div className=' text-sm font-medium text-dark-500 mt-3'>MoM Profit</div>
                        </div>
                        <div className="md:pe-6">
                            <div className='text-gray-600 text-sm '>$1,10,432</div>
                            <div className=' text-sm font-medium text-dark-500 mt-3'>YoY Profit</div>
                        </div>
                    </div>
                </RoundedBox>
                <RoundedBox className='!bg-white'>
                    <div className=''>
                        <Heading as='h3' className='px-4 pt-4'>Expense Report</Heading>
                        <div className='pt-5'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='text-sm text text-dark-500 text-start px-4 py-2'>Product</th>
                                        <th className='text-sm text text-dark-500 text-center py-2'>Repairs</th>
                                        <th className='text-sm text text-dark-500 text-center py-2'>Shipping</th>
                                        <th className='text-sm text text-dark-500 text-center px-4 py-2'>Impact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Array.from({ length: 4 }).map(() => (
                                            <tr className='border'>
                                                <td className='text-gray-650 text-sm test-start px-4 py-2'>Rolex</td>
                                                <td className='text-sm text text-dark-500 text-center py-2'>$26,000</td>
                                                <td className='text-sm text text-dark-500 text-center py-2'>$26,000</td>
                                                <td className='text-sm text text-green-500 text-center px-4 py-2'>3.2%</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </RoundedBox>
            </div>
        </div>
    )
}

export default Reports
