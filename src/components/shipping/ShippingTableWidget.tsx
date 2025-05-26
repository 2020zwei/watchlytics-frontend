"use client"
import React from 'react'
import Pagination from '../common/Pagination';
import clsx from 'clsx';
import RoundedBox from '../common/baseButton/RoundedBox';
import Heading from '../common/heading';
import Link from 'next/link';

const ShippingTableWidget = () => {
    return (
        <RoundedBox>
            <div className='flex items-center justify-between px-5 pt-7 pb-3'>
                <Heading>Shipping Activities</Heading>
                <Link href="/add-shipping"
                    className="h-10 px-3 text-sm font-medium flex items-center justify-between text-white rounded-lg bg-blue-gradient"
                >Add New Shipping</Link>
            </div>
            <div className=''>
                <table className='w-full'>
                    <thead className='h-12'>
                        <tr className='text-white text-sm font-medium bg-blue-gradient'>
                            <th className='text-start ps-4 first:rounded-s-lg  overflow-hidden'>
                                Shipping ID
                            </th>
                            <th className='text-start ps-4  overflow-hidden'>
                                Customer Name
                            </th>
                            <th className='text-start ps-4  overflow-hidden'>
                                Customer ID
                            </th>
                            <th className='text-start ps-4  overflow-hidden'>
                                Date
                            </th>
                            <th className='text-start ps-4  overflow-hidden'>
                                Buying Price
                            </th>
                            <th className='text-end pe-4 last:rounded-e-lg overflow-hidden'>
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                            <td className=' text-start py-3 px-4'>#edf8918</td>
                            <td className=' text-start py-3 px-4'>Carter Press</td>
                            <td className=' text-start py-3 px-4'>CID-12345</td>
                            <td className=' text-start py-3 px-4'>25/03/25</td>
                            <td className=' text-start py-3 px-4'>$430</td>
                            <td className=' text-start py-3 px-4'>Delivered</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* <div className='px-5 py-4'>
                <Pagination
                    totalPages={12}
                    currentPage={12}
                    onPageChange={(page) => { }}
                />
            </div> */}
        </RoundedBox>
    )
}

export default ShippingTableWidget
