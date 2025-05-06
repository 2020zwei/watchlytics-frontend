"use client"

import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import Icon from '@/components/common/Icon'
import LoaderWidget from '@/components/common/LoaderWidget'
import Pagination from '@/components/common/Pagination'
import TradingModal from '@/components/common/TradingModal'
import { RequestTypes } from '@/types'
import { sendRequest } from '@/utils/apis'
import { METHODS, URLS } from '@/utils/constants'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [apiLoading, setApiLoading] = React.useState(false)
    const [tradings, setTradings] = React.useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const PAYLOAD: RequestTypes = {
        url: `${URLS.TRANSACTIONS}`,
        method: METHODS.GET,
    }
    const fetchTradeDetails = async () => {
        setApiLoading(true)
        try {
            const res = await sendRequest(PAYLOAD)
            console.log('Trade Details:', res)

            if (res?.status === 200) {
                setTradings(res.data)
            }
        } catch (error) {
            console.error('Error fetching trade details:', error)
        } finally {
            setApiLoading(false)
        }
    }
    useEffect(() => {
        fetchTradeDetails();
    }, [currentPage]);

    if (apiLoading) return <LoaderWidget />
    return (
        <RoundedBox>
            <div className='flex items-center justify-between px-5 pt-7 pb-3'>
                <Heading>All Trades</Heading>
                <Link href="/add-trading"
                    className="h-10 px-3 text-sm font-medium flex items-center justify-between text-white rounded-lg bg-blue-gradient"
                >Add Trade Details</Link>
            </div>
            <div className=''>
                <table className='w-full'>
                    <thead className='h-12'>
                        <tr className='text-white text-sm font-medium bg-blue-gradient'>
                            <th className='text-start ps-4 first:rounded-s-lg  overflow-hidden'>
                                Name Of Trade
                            </th>
                            <th className='text-end pe-4 last:rounded-e-lg overflow-hidden'>
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tradings?.results?.map((trade) => (
                                <tr key={trade?.name_of_trade} className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                                    <td className=' text-start py-3 px-4'>{trade?.name_of_trade}</td>
                                    <td className='text-end py-3 px-4'>
                                        <div className='flex items-center justify-end gap-3 text-[#808080]'>
                                            <Link href={`/add-trading/?id=${trade?.id}`}><Icon name='edit' size='1.7rem' /></Link>
                                            <TradingModal modalTile={trade?.name_of_trade} data={trade?.items} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {
                tradings?.results?.count > 30 ?
                    <Pagination
                        totalPages={Math.ceil(tradings?.results?.count / 30)}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    /> : null}
        </RoundedBox>
    )
}

export default page
