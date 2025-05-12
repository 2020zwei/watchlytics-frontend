"use client"
import React from 'react'
import Link from 'next/link';
import RoundedBox from '@/components/common/baseButton/RoundedBox';
import Heading from '@/components/common/heading';
import Pagination from '@/components/common/Pagination';

const page = () => {
    return (
        <RoundedBox>
            <div className='flex items-center justify-between px-5 pt-7 pb-3'>
                <Heading>All Invoice Records</Heading>
                <Link href="/invoices/add"
                    className="h-10 px-3 text-sm font-medium flex items-center justify-between text-white rounded-lg bg-blue-gradient"
                >Add New Invoice</Link>
            </div>
            <div className=''>
                <table className='w-full'>
                    <thead className='h-12'>
                        <tr className='text-white text-sm font-medium bg-blue-gradient'>
                            <th className='text-start ps-4 first:rounded-s-lg  overflow-hidden'>
                                Invoice ID
                            </th>
                            <th className='text-start overflow-hidden'>
                                Invoice Date
                            </th>
                            <th className='text-start overflow-hidden'>
                                Billing Information
                            </th>
                            <th className='text-start  overflow-hidden'>
                                Total Amount
                            </th>
                            <th className='text-start overflow-hidden'>
                                Status
                            </th>
                            <th className='text-end pe-4 last:rounded-e-lg overflow-hidden'>
                                Due Date
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                            <td className=' text-start py-3 px-4'>#edf8918</td>
                            <td className=' text-start py-3'>25/03/25</td>
                            <td className=' text-start py-3'>Carter Press</td>
                            <td className=' text-start py-3'>$430</td>
                            <td className=' text-start py-3'>Delivered</td>
                            <td className='px-4 py-3 text-end'>17/04/25</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='px-5 py-4'>
                <Pagination
                    totalPages={12}
                    currentPage={12}
                    onPageChange={(page) => { }}
                />
            </div>
        </RoundedBox>
    )
}

export default page
