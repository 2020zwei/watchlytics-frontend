"use client";

import RoundedBox from '@/components/common/baseButton/RoundedBox';
import Heading from '@/components/common/heading';
import Icon from '@/components/common/Icon';
import Notfound from '@/components/common/Notfound';
import Pagination from '@/components/common/Pagination';
import ReportFilters from '@/components/common/ReportFilters';
import { useExpenseReport } from '@/hooks/useReportHooks';
import { formatCurrency } from '@/utils/formatCurrency';
import { Spinner } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useEffect, useState } from 'react';
import CsvDownloader from 'react-csv-downloader';

const ExpenseReport = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pageQuery = parseInt(searchParams.get("page_number") || "1", 10);
    const [currentPage, setCurrentPage] = useState(pageQuery);
    const pageRef = useRef(currentPage);
    const downloadRef = useRef<any>(null);


    const {
        data: reports,
        isLoading,
    } = useExpenseReport(currentPage);

    const handleExport = () => {
        if (reports?.data?.results?.length > 0 && downloadRef.current) {
            downloadRef.current.handleClick();
        }
    }

    useEffect(() => {
        if (currentPage > 1) {
            router.push(`/expense-report/?page_number=${currentPage}`);
        }
        pageRef.current = currentPage;
    }, [currentPage, router]);

    if (isLoading) {
        return <div className='text-center'><Spinner /></div>;
    }

    const columns = reports?.data?.results?.length ? Object.keys(reports?.data?.results[0]) : [];

    return (
        <>
            <div className='mb-5 flex sm:flex-row flex-col items-center sm:justify-between'>
                <Heading as='h3' className='md:text-2xl text-lg w-full'>Expense Report</Heading>
                <div className='flex items-center gap-3'>
                    {reports?.data?.results?.length ? <button onClick={handleExport} className='border rounded-lg p-0 bg-transparent h-[38px] px-3 border-gray-180'>
                        Export
                    </button> : null}
                    <ReportFilters selectedReport='Expense Report' />
                </div>
            </div>

            {!reports?.data?.results?.length ? <Notfound /> :
                <RoundedBox>
                    <div className=''>
                        <table className='w-full'>
                            <thead className='h-12'>
                                <tr className='text-white text-sm font-medium bg-blue-gradient'>
                                    <th className='text-start ps-4 first:rounded-s-lg'>Product</th>
                                    <th className='text-start'>Brand</th>
                                    <th className='text-start'>Reference number</th>
                                    <th className='text-start'>Purchase Price</th>
                                    <th className='text-start'>Repairs</th>
                                    <th className='text-start'>Shipping</th>
                                    <th className='text-start'>Impact</th>
                                    <th className='text-end pe-4 last:rounded-e-lg w-[85px]'>Total Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports?.data?.results?.map((report: any, index: number) => (
                                    <tr key={index} className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                                        <td className='text-start py-3 px-4 first-letter:uppercase'>{report?.model}</td>
                                        <td>{report?.brand}</td>
                                        <td>{report?.reference_number}</td>
                                        <td>{report?.purchase_price ? formatCurrency(report?.purchase_price, 'en-US', 'USD') : "-"}</td>
                                        <td>{report?.repairs ? formatCurrency(report?.repairs, 'en-US', 'USD') : "-"}</td>
                                        <td>{report?.shipping ? formatCurrency(report?.shipping, 'en-US', 'USD') : "-"}</td>
                                        <td className={report?.impact < 0 ? "text-red-500" : "text-green-500"}>
                                            <div className='flex items-center'>
                                                <span className={report?.impact < 0 ? "rotate-180" : ""}>
                                                    <Icon name='arrow' stroke={report?.impact < 0 ? "#da3e33" : "#10a760"} />
                                                </span>
                                                {report?.impact}%
                                            </div>
                                        </td>
                                        <td>
                                            {report?.total_cost ? formatCurrency(report?.total_cost, 'en-US', 'USD') : "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {reports?.data?.count! > 20 &&
                        <div className="px-4 pb-5">
                            <Pagination
                                totalPages={Math.ceil(reports?.data?.count! / 20)}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                            />
                        </div>}
                </RoundedBox>
            }

            <CsvDownloader
                ref={downloadRef}
                className="hidden"
                datas={reports?.data?.results}
                filename="expense-report"
                extension=".csv"
                columns={columns.map(col => ({
                    id: col,
                    displayName: col
                }))}
            />
        </>
    );
};

export default ExpenseReport;
