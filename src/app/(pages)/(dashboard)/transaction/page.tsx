"use client"

import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import Icon from '@/components/common/Icon'
import LoaderWidget from '@/components/common/LoaderWidget'
import Notfound from '@/components/common/Notfound'
import Pagination from '@/components/common/Pagination'
import TradingModal from '@/components/common/TradingModal'
import { RequestTypes } from '@/types'
import { sendRequest } from '@/utils/apis'
import { METHODS, URLS } from '@/utils/constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const page = () => {

    const [apiLoading, setApiLoading] = React.useState(false)
    const [tradings, setTradings] = React.useState<any>([])
    const [currentPage, setCurrentPage] = useState(1)
    const pageRef = useRef(1)
    const router = useRouter()

    const fetchTradeDetails = async (currentPage: number) => {
        const PAYLOAD: RequestTypes = {
            url: `${URLS.TRANSACTIONS}?page=${currentPage}`,
            method: METHODS.GET,
        }
        setApiLoading(true)
        try {
            const res = await sendRequest(PAYLOAD)
            if (res?.status === 200) {
                setTradings(res.data)
            }
            else {
                setTradings([])
            }
        } catch (error) {
            console.error('Error fetching trade details:', error)
        } finally {
            setApiLoading(false)
        }
    }
    useEffect(() => {
        pageRef.current = parseInt(window.location.search?.slice(13)) || currentPage
        currentPage > 1 && router.push(`/transaction/?page_number=${currentPage}`)
        fetchTradeDetails(currentPage > 1 ? currentPage : pageRef.current)
    }, [currentPage]);

    if (apiLoading) return <LoaderWidget />
    return (
        <RoundedBox>
            <div className='flex items-center justify-between px-5 pt-7 pb-3'>
                <Heading>All Transactions</Heading>
                <Link href="/add-transaction"
                    className="h-10 px-3 text-sm font-medium flex items-center justify-between text-white rounded-lg bg-blue-gradient"
                >Add Transaction Details</Link>
            </div>
            <div className=''>
                {!tradings?.results?.length ? <Notfound label='Transactions not found' /> :
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
                                tradings?.results?.map((trade: any) => (
                                    <tr key={trade?.name_of_trade} className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                                        <td className=' text-start py-3 px-4'>{trade?.name_of_trade}</td>
                                        <td className='text-end py-3 px-4'>
                                            <div className='flex items-center justify-end gap-3 text-[#808080]'>
                                                <Link href={`/add-transaction/?id=${trade?.id}`}><Icon name='edit' size='1.7rem' /></Link>
                                                <TradingModal modalTile={trade?.name_of_trade} data={trade?.items} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>}
            </div>
            {tradings?.results?.count > 20 &&
                <Pagination
                    totalPages={Math.ceil(tradings?.results?.count / 20)}
                    currentPage={currentPage > 1 ? currentPage : pageRef.current}
                    onPageChange={(page) => setCurrentPage(page)}
                />}
        </RoundedBox>
    )
}

export default page
