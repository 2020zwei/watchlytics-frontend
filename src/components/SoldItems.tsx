"use client"

import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import LoaderWidget from '@/components/common/LoaderWidget'
import Notfound from '@/components/common/Notfound'
import Pagination from '@/components/common/Pagination'
import { useSoldItems } from '@/hooks/useDashboard'
import { formatCurrency } from '@/utils/formatCurrency'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const SoldItems = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const initialPage = parseInt(searchParams.get('page_number') || '1', 10)
    const [currentPage, setCurrentPage] = useState(initialPage)

    useEffect(() => {
        if (currentPage !== initialPage) {
            router.push(`/transaction/?page_number=${currentPage}`)
        }
    }, [currentPage])

    const { data, isLoading, isError } = useSoldItems(`?page=${currentPage}/`)

    if (isLoading) return <LoaderWidget />
    if (isError) return <Notfound label='Failed to fetch sold items' />

    const tradings = data
    return (
        <RoundedBox>
            <div className='flex items-center justify-between px-5 pt-7 pb-3'>
                <Heading>Sold Items</Heading>
            </div>
            <div className=' overflow-x-auto'>
                {!tradings?.data?.sold_transaction_items?.length ? <Notfound /> :
                    <table className='w-full'>
                        <thead className='h-12'>
                            <tr className='text-white text-sm font-medium bg-blue-gradient'>
                                <th className='text-start whitespace-nowrap ps-4 overflow-hidden'>
                                    Model
                                </th>
                                <th className='text-start whitespace-nowrap ps-4 overflow-hidden'>
                                    Brand
                                </th>
                                <th className='text-start whitespace-nowrap ps-4 overflow-hidden'>
                                    Quantity
                                </th>
                                <th className='text-start whitespace-nowrap ps-4 overflow-hidden'>
                                    Sale price
                                </th>
                                <th className='text-start whitespace-nowrap ps-4 overflow-hidden'>
                                    Purchase price
                                </th>
                                <th className='text-start whitespace-nowrap ps-4 overflow-hidden'>
                                    Transaction date
                                </th>
                                <th className='text-start whitespace-nowrap ps-4 overflow-hidden'>
                                    Transaction name
                                </th>
                                <th className='text-start whitespace-nowrap ps-4 overflow-hidden'>
                                    Customer name
                                </th>
                                <th className='text-start whitespace-nowrap ps-4 overflow-hidden'>
                                    Profit
                                </th>
                                <th className='text-end pe-4 whitespace-nowrap last:rounded-e-lg overflow-hidden'>
                                    Reference number
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {tradings?.data?.sold_transaction_items?.map((item: any, index: number) => (
                                <tr key={index} className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                                    <td className='text-start whitespace-nowrap py-3 px-4'>{item?.Model|| "No Data"}</td>
                                    <td className='text-start whitespace-nowrap py-3 px-4'>{item?.brand || "No Data"}</td>
                                    <td className='text-start whitespace-nowrap py-3 px-4'>{item?.quantity || "No Data"}</td>

                                    <td className='text-start whitespace-nowrap py-3 px-4'>
                                        {item?.sale_price ? formatCurrency(item?.sale_price, 'en-US', 'USD') : 'No Data'}
                                    </td>
                                    <td className='text-start whitespace-nowrap py-3 px-4'>
                                        {item?.purchase_price ? formatCurrency(item?.purchase_price, 'en-US', 'USD') : 'No Data'}
                                    </td>
                                    <td className='text-start whitespace-nowrap py-3 px-4'>{item?.transaction_date || "No Data"}</td>
                                    <td className='text-start whitespace-nowrap py-3 px-4'>{item?.transaction_name || "No Data"}</td>
                                    <td className='text-start whitespace-nowrap py-3 px-4'>{item?.customer_name || "No Data"}</td>

                                    <td className='text-start whitespace-nowrap py-3 px-4'>
                                        {item?.profit ? formatCurrency(item?.profit, 'en-US', 'USD') : 'No Data'}
                                    </td>
                                    <td className='text-end whitespace-nowrap py-3 px-4'>{item?.reference_number || "No Data"}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>}
            </div>
            {tradings?.data?.sold_transaction_items_count > 20 &&
                <div className='px-4 pb-4'>
                    <Pagination
                        totalPages={Math.ceil(tradings?.data?.sold_transaction_items_count / 20)}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>}

        </RoundedBox>
    )
}

export default SoldItems
