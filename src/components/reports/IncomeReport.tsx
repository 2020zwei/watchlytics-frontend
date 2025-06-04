"use client"

import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import LoaderWidget from '@/components/common/LoaderWidget'
import Notfound from '@/components/common/Notfound'
// import Pagination from '@/components/common/Pagination'
import { usePieReports } from '@/hooks/useDashboard'
import { formatCurrency } from '@/utils/formatCurrency'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export interface BaseTypes {
  id: number;
  date: string; // ISO date string (e.g., "2025-06-18")
  sale_price: number;
  name_of_trade: string;
  customer_name: string;
}

interface Products {
  transactions: BaseTypes[],
  remaining_amount: number,
  target: number,
}


const IncomeReport = () => {
  // const router = useRouter()
  const searchParams = useSearchParams()
  const initialPage = parseInt(searchParams.get('page_number') || '1', 10)
  // const [currentPage, setCurrentPage] = useState(initialPage)

  // useEffect(() => {
  //   if (currentPage !== initialPage) {
  //     router.push(`/transaction/?page_number=${currentPage}`)
  //   }
  // }, [currentPage])

  const { data, isLoading, isError } = usePieReports({ segment: "actual" });
  if (isLoading) return <LoaderWidget />
  if (isError) return <Notfound label='Failed to fetch income report' />


  const reportsData: Products = data?.data
  return (
    <RoundedBox>
      <div className='flex items-center justify-between px-5 pt-7 pb-3'>
        <Heading>Income Report</Heading>
      </div>
      <div className=' overflow-x-auto'>
        {!reportsData?.transactions?.length ? <Notfound /> :
          <table className='w-full'>
            <thead className='h-12'>
              <tr className='text-white text-sm font-medium bg-blue-gradient'>
                <th className='text-start whitespace-nowrap ps-4 overflow-hidden rounded-tl-lg rounded-bl-lg'>
                  Name Of Trade
                </th>
                <th className='text-start whitespace-nowrap ps-4 overflow-hidden'>
                  Customer Name
                </th>
                <th className='text-start whitespace-nowrap ps-4 overflow-hidden'>
                  Sale Price
                </th>
                <th className='text-start whitespace-nowrap ps-4 overflow-hidden rounded-tr-lg rounded-br-lg'>
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {reportsData?.transactions?.map((item: BaseTypes, index: number) => (
                <tr key={index} className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                  <td className='text-start whitespace-nowrap py-3 px-4'>{item?.name_of_trade || "No Data"}</td>
                  <td className='text-start whitespace-nowrap py-3 px-4'>{item?.customer_name || "No Data"}</td>
                  <td className='text-start whitespace-nowrap py-3 px-4'> {item?.sale_price ? formatCurrency(item?.sale_price, 'en-US', 'USD') : 'No Data'}</td>

                  <td className='text-start whitespace-nowrap py-3 px-4'>
                    {item?.date ? item?.date : 'No Data'}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>}
      </div>
      {/* {tradings?.data?.sold_transaction_items_count > 20 &&
        <div className='px-4 pb-4'>
          <Pagination
            totalPages={Math.ceil(tradings?.data?.sold_transaction_items_count / 20)}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>} */}

    </RoundedBox>
  )
}

export default IncomeReport
