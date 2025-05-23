"use client"

import RoundedBox from '@/components/common/baseButton/RoundedBox';
import Heading from '@/components/common/heading';
import Icon from '@/components/common/Icon';
import Pagination from '@/components/common/Pagination';
import ReportFilters from '@/components/common/ReportFilters';
import { RequestTypes } from '@/types';
import { sendRequest } from '@/utils/apis';
import { METHODS, URLS } from '@/utils/constants';
import { Spinner } from '@heroui/react';
import React, {useEffect, useState } from 'react'

const page = () => {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const fetchReports = async () => {
        setLoading(true);
        const PAYLOAD: RequestTypes = {
            url: URLS.REPORTS_EXPENSES,
            method: METHODS.GET,
        };
        sendRequest(PAYLOAD).then((res) => {
            if (res.status === 200) {
                setReports(res?.data);
            }
        }).finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchReports()
    }, [])
    if (loading) {
        return <div className='text-center'><Spinner /></div>;
    }
    return (
        <>
            <div className='mb-5 flex sm:flex-row flex-col items-center sm:justify-between'>
                <Heading as='h3' className=' md:text-2xl text-lg w-full'>Expense Report</Heading>
                <ReportFilters selectedReport='Expense Report' />
            </div>
            <RoundedBox>
                <div className=''>
                    <table className='w-full'>
                        <thead className='h-12'>
                            <tr className='text-white text-sm font-medium bg-blue-gradient'>
                                <th className='text-start ps-4 first:rounded-s-lg  overflow-hidden'>
                                    Product
                                </th>
                                <th className='text-start  overflow-hidden'>
                                    Reference number
                                </th>
                                <th className='text-start  overflow-hidden'>
                                    Purchase Price
                                </th>
                                <th className='text-start  overflow-hidden'>
                                    Repairs
                                </th>
                                <th className='text-start  overflow-hidden'>
                                    Shipping
                                </th>
                                <th className='text-start  overflow-hidden'>
                                    Impact
                                </th>
                                <th className='text-end pe-4 last:rounded-e-lg overflow-hidden w-[85px]'>
                                    Total Cost
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {reports.map((report: any,index) => (
                                <tr key={index} className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                                    <td className=' text-start py-3 px-4 first-letter:uppercase'>{report?.product}</td>
                                    <td>{report?.reference_number}</td>
                                    <td className='first-letter:uppercase'>{report?.purchase_price}</td>
                                    <td>{report?.repairs}</td>
                                    <td>{report?.shipping}</td>
                                    <td className={report?.impact < 0 ? "text-red-500" : "text-green-500"}>
                                        <div className='flex items-center'>
                                            <span className={report?.impact < 0 ? " rotate-180" : ""}><Icon name='arrow' stroke={report?.impact < 0 ? "#da3e33" : "#10a760"} /></span>
                                            {report?.impact}%
                                        </div>
                                    </td>
                                    <td>{report?.total_cost}</td>
                                </tr>))}
                        </tbody>
                    </table>
                </div>
                {reports?.count > 20 &&
                    <div className="px-4 pb-5">
                        <Pagination
                            totalPages={reports?.count}
                            currentPage={currentPage}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>}
            </RoundedBox>
        </>
    )
}

export default page
