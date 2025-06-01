"use client"

import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import Icon from '@/components/common/Icon'
import LoaderWidget from '@/components/common/LoaderWidget'
import Notfound from '@/components/common/Notfound'
import Pagination from '@/components/common/Pagination'
import TransactionModal from '@/components/common/TransactionModal'
import { useTransactions } from '@/hooks/useTransaction'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const Transactions = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const initialPage = parseInt(searchParams.get('page_number') || '1', 10)
    const [currentPage, setCurrentPage] = useState(initialPage)

    useEffect(() => {
        if (currentPage !== initialPage) {
            router.push(`/transaction/?page_number=${currentPage}`)
        }
    }, [currentPage])

    const { data, isLoading, isError } = useTransactions(`?page=${currentPage}`)

    if (isLoading) return <LoaderWidget />
    if (isError) return <Notfound label='Failed to fetch transactions' />

    const tradings = data
    return (
        <RoundedBox>
            <div className='flex items-center justify-between px-5 pt-7 pb-3'>
                <Heading>All Transactions</Heading>
                <Link href="/add-transaction"
                    className="h-10 px-3 text-sm font-medium flex items-center justify-between text-white rounded-lg bg-blue-gradient"
                >Add Transaction Details</Link>
            </div>
            <div className=''>
                {!tradings?.data?.results?.length ? <Notfound label='Transactions not found' /> :
                    <table className='w-full'>
                        <thead className='h-12'>
                            <tr className='text-white text-sm font-medium bg-blue-gradient'>
                                <th className='text-start ps-4 first:rounded-s-lg  overflow-hidden'>
                                    Name Of Transaction
                                </th>
                                <th className='text-end pe-4 last:rounded-e-lg overflow-hidden'>
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                tradings?.data?.results?.map((trade: any, index: number) => (
                                    <tr key={index} className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                                        <td className=' text-start py-3 px-4'>{trade?.name_of_trade}</td>
                                        <td className='text-end py-3 px-4'>
                                            <div className='flex items-center justify-end gap-3 text-[#808080]'>
                                                <Link href={`/add-transaction/?id=${trade?.id}`}><Icon name='edit' size='1.7rem' /></Link>
                                                <TransactionModal modalTile={trade?.name_of_trade} data={trade?.items} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>}
            </div>
            {tradings?.data?.count > 20 &&
                <div className='px-4 pb-4'>
                    <Pagination
                        totalPages={Math.ceil(tradings?.data?.count / 20)}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>}

        </RoundedBox>
    )
}

export default Transactions
