"use client"
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import Icon from '@/components/common/Icon';
import Notfound from '@/components/common/Notfound';
import Pagination from '@/components/common/Pagination';
import ReportFilters from '@/components/common/ReportFilters';
import { RequestTypes } from '@/types';
import { sendRequest } from '@/utils/apis';
import { METHODS, URLS } from '@/utils/constants';
import { Spinner } from '@heroui/react'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true);
    const fetchReports = async () => {
        setLoading(true);
        const PAYLOAD: RequestTypes = {
            url: URLS.BEST_SELLING,
            method: METHODS.GET,
        };
        sendRequest(PAYLOAD).then((res) => {
            if (res.status === 200) {
                setReports(res?.data);
            }
        }).finally(() => { setLoading(false) });
    };

    useEffect(() => {
        fetchReports()
    }, [])
    if (loading) {
        return <Spinner />;
    }
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex sm:flex-row flex-col items-center sm:justify-between'>
                <Heading as='h3' className=' md:text-2xl text-lg w-full'>Inventory Valuation Report</Heading>
                <ReportFilters selectedReport='Inventory Valuation Report'/>
            </div>
            <div className='grid md:grid-cols-2 gap-5 mt-4 report-cards'>
                {/* cards */}
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
                {/* table */}
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
            <div>
                <div>
                    <RoundedBox className='pb-4'>
                        <Heading className='p-3'>Best selling product</Heading>
                        <div className=" overflow-x-auto">
                            {
                                reports.length ?
                                    <table className='w-full min-w-[1200px]'>
                                        <thead className='h-12'>
                                            <tr className='text-white text-sm font-medium bg-blue-gradient'>
                                                <th className='text-start ps-4 first:rounded-s-lg  overflow-hidden'>
                                                    Product
                                                </th>
                                                <th className='text-start'>Reference number</th>
                                                <th className='text-start'>Brand</th>
                                                <th className='text-start'>Remaining Quantity</th>
                                                <th className='text-start'>Turn Over</th>
                                                <th className='text-start pe-4 last:rounded-e-lg overflow-hidden'>
                                                    Increase By
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {reports.map((report: any) => (
                                                <tr key={report?.product_id} className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                                                    <td className=' text-start py-3 px-4 first-letter:uppercase'>{report?.product}</td>
                                                    <td>{report?.reference_number}</td>
                                                    <td className='first-letter:uppercase'>{report?.brand}</td>
                                                    <td>{report?.remaining_quantity} Watches</td>
                                                    <td>{report?.turn_over}</td>
                                                    <td className={report?.increase_by < 0 ? "text-red-500" : "text-green-500"}>
                                                        <div className='flex items-center'>
                                                            <span className={report?.increase_by < 0 ? " rotate-180" : ""}><Icon name='arrow' stroke={report?.increase_by < 0 ? "#da3e33" : "#10a760"} /></span>
                                                            {report?.increase_by}%
                                                        </div>
                                                    </td>
                                                </tr>))}
                                        </tbody>
                                    </table>
                                    : <Notfound label='Reports not found' />
                            }
                        </div>
                    </RoundedBox>
                </div>
                <div>
                    <Pagination
                        totalPages={10}
                        currentPage={12}
                        onPageChange={(page) => { }}
                    />
                </div>
            </div>
        </div>
    )
}

export default page
