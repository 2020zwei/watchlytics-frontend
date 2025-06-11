"use client"
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import Icon from '@/components/common/Icon';
import Notfound from '@/components/common/Notfound';
import Pagination from '@/components/common/Pagination';
import ReportFilters from '@/components/common/ReportFilters';
import { useReportStat, useBestSelling, useExpense, useExpenseReport } from '@/hooks/useReportHooks';
import { formatCurrency } from '@/utils/formatCurrency';
import { Spinner } from '@heroui/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

const page = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const pageRef = useRef(1)
    const router = useRouter()

    const { data: stats, isLoading: loadingStats } = useReportStat()
    const { data: expensesData, isLoading: loadingExpenses } = useExpenseReport()
    const { data: reports, isLoading: loadingReports } = useBestSelling(currentPage)

    useEffect(() => {
        const pageNumber = parseInt(window.location.search?.slice(13)) || currentPage
        pageRef.current = pageNumber
        if (currentPage > 1) {
            router.push(`/reports/?page_number=${currentPage}`)
        }
    }, [currentPage])

    const loading = loadingStats || loadingExpenses || loadingReports

    if (loading) {
        return <div className='text-center'><Spinner /></div>
    }
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex sm:flex-row flex-col items-center sm:justify-between'>
                <Heading as='h3' className=' md:text-2xl text-lg w-full'>Inventory Valuation Report</Heading>
                <ReportFilters selectedReport='Inventory Valuation Report' />
            </div>
            <div className='grid md:grid-cols-2 gap-5 mt-4 report-cards'>
                {/* cards */}
                <RoundedBox className='!bg-white reports-cards'>
                    <div className='px-3 pt-4 border-b text-gray-650 pb-5 mb-5'>
                        <Heading as='h3'>Overview</Heading>
                        <div className=' grid grid-cols-3 pt-5'>
                            <div className=' text-sm text-gray-500'>
                                <div className='doller-sign'>{stats?.total_profit ? formatCurrency(stats?.total_profit, 'en-US', 'USD') : "No Data"}</div>
                                <div className=' text-sm font-medium text-dark-600 mt-3'>Total Profit</div>
                            </div>
                            <div className=' text-sm text-gray-500'>
                                <div className='doller-sign'> {stats?.revenue ? formatCurrency(stats?.revenue, 'en-US', 'USD') : "No Data"}</div>
                                <div className=' text-sm font-medium text-orange-700 mt-3'>Revenue</div>
                            </div>
                            <div className=' text-sm text-gray-500'>
                                <div className='doller-sign'>{stats?.sales ? formatCurrency(stats?.sales, 'en-US', 'USD') : "No Data"}</div>
                                <div className=' text-sm font-medium text-pink-500 mt-3'>Sales</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between px-3 pb-5 gap-3'>
                        <div className="flex flex-col justify-between">
                            <div className='text-gray-600 text-sm doller-sign'>{stats?.total_profit ? formatCurrency(stats?.total_profit, 'en-US', 'USD') : "No Data"}</div>
                            <div className=' text-sm font-medium text-dark-500 mt-3'>Net purchase value</div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div className='text-gray-600 text-sm '>{stats?.net_sales_value ? formatCurrency(stats?.net_sales_value, 'en-US', 'USD') : "No Data"}</div>
                            <div className=' text-sm font-medium text-dark-500 mt-3'>Net sales value</div>
                        </div>
                        <div className="md:pe-6 flex flex-col justify-between">
                            <div className='text-gray-600 text-sm doller-sign'>{stats?.mom_profit ? formatCurrency(stats?.mom_profit, 'en-US', 'USD') : "No Data"}</div>
                            <div className=' text-sm font-medium text-dark-500 mt-3'>MoM Profit</div>
                        </div>
                        <div className="md:pe-6 flex flex-col justify-between">
                            <div className='text-gray-600 text-sm doller-sign'>{stats?.yoy_profit ? formatCurrency(stats?.yoy_profit, 'en-US', 'USD') : "No Data"}</div>
                            <div className=' text-sm font-medium text-dark-500 mt-3'>YoY Profit</div>
                        </div>
                    </div>
                </RoundedBox>
                {/* table */}
                <RoundedBox className='!bg-white'>
                    <div className=''>
                        <Heading as='h3' className='px-4 pt-4'>Expense Report</Heading>
                        <div className='pt-5 overflow-auto max-h-[200px]'>
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
                                        expensesData?.data?.results?.map((item: any) => (
                                            <tr key={item?.product} className='border'>
                                                <td className='text-gray-650 text-sm test-start px-4 py-2'>{item?.model}</td>
                                                <td className='text-sm text text-dark-500 text-center py-2 doller-sign'>{item?.repairs ? formatCurrency(item?.repairs, 'en-US', 'USD') : "No Data"}</td>
                                                <td className='text-sm text text-dark-500 text-center py-2 doller-sign'>{item?.shipping ? formatCurrency(item?.shipping, 'en-US', 'USD') : "No Data"}</td>
                                                <td className='text-sm text text-green-500 text-center px-4 py-2'>{item?.impact}%</td>
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
                                reports?.data?.results?.length ?
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
                                            {reports?.data?.results?.map((report: any) => (
                                                <tr key={report?.product_id} className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                                                    <td className=' text-start py-3 px-4 first-letter:uppercase'>{report?.product}</td>
                                                    <td>{report?.reference_number}</td>
                                                    <td className='first-letter:uppercase'>{report?.brand}</td>
                                                    <td>{report?.remaining_quantity} Watches</td>
                                                    <td>{formatCurrency(report?.turn_over, 'en-US', 'USD')}</td>
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
                {
                    reports?.data?.count! > 20 ?
                        <div>
                            <Pagination

                                totalPages={Math.ceil(reports?.data?.count! / 20)}
                                currentPage={currentPage > 1 ? currentPage : pageRef.current}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

export default page
