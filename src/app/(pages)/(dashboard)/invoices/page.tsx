"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import RoundedBox from '@/components/common/baseButton/RoundedBox';
import Heading from '@/components/common/heading';
import Pagination from '@/components/common/Pagination';
import { RequestTypes } from '@/types';
import { METHODS, URLS } from '@/utils/constants';
import { sendRequest } from '@/utils/apis';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Notfound from '@/components/common/Notfound';
import { Spinner } from '@heroui/react';

const page = () => {
    const navigate = useRouter()
    const [loading, setLoading] = useState(false)
    const [invoices, setInvoices] = useState<any>([])
    const getInvoices = () => {
        setLoading(true)
        const PAYLOAD: RequestTypes = {
            url: URLS.INVOICE,
            method: METHODS.GET,
        };

        delete PAYLOAD?.payload?.product
        sendRequest(PAYLOAD).then((res) => {
            if (res.status === 200) {
                setInvoices(res?.data)
            }
        }).finally(() => setLoading(false));
    }
    useEffect(() => { getInvoices() }, [])
    if (loading) {
        return <div className=' text-center mt-5'><Spinner /></div>
    }
    return (
        <RoundedBox>
            <div className='flex items-center justify-between px-5 pt-7 pb-3'>
                <Heading>All Invoice Records</Heading>
                <Link href="/invoices/add"
                    className="h-10 px-3 text-sm font-medium flex items-center justify-between text-white rounded-lg bg-blue-gradient"
                >Add New Invoice</Link>
            </div>
            <div className=''>
                {!invoices?.results?.length ? <Notfound label='Invoices not found' /> :
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
                }
            </div>
            {invoices?.count > 20 && <div className='px-5 py-4'>
                <Pagination
                    totalPages={12}
                    currentPage={12}
                    onPageChange={(page) => { }}
                />
            </div>}
        </RoundedBox>
    )
}

export default page
