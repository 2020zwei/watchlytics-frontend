"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import RoundedBox from '@/components/common/baseButton/RoundedBox';
import Heading from '@/components/common/heading';
import Pagination from '@/components/common/Pagination';
import Notfound from '@/components/common/Notfound';
import { Spinner } from '@heroui/react';
import { useInvoices } from '@/hooks/useInvoice';

const Invoices = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const pageFromURL = Number(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromURL);

    const query = `?page=${currentPage}`;
    const { data: invoices, isLoading, error } = useInvoices(query);

    useEffect(() => {
        router.push(`/invoices?page=${currentPage}`);
    }, [currentPage, router]);

    if (isLoading) {
        return <div className="text-center mt-5"><Spinner /></div>;
    }
    if (error) {
        console.log(error)
    }

    return (
        <RoundedBox>
            <div className="flex items-center justify-between px-5 pt-7 pb-3">
                <Heading>All Invoice Records</Heading>
                <Link
                    href="/invoices/add"
                    className="h-10 px-3 text-sm font-medium flex items-center justify-between text-white rounded-lg bg-blue-gradient"
                >
                    Add New Invoice
                </Link>
            </div>

            {!invoices?.data?.results?.length ? (
                <Notfound label="Invoices not found" />
            ) : (
                <table className="w-full">
                    <thead className="h-12">
                        <tr className="text-white text-sm font-medium bg-blue-gradient">
                            <th className="text-start ps-4 first:rounded-s-lg">Invoice ID</th>
                            <th className="text-start">Invoice Date</th>
                            <th className="text-start">Billing Information</th>
                            <th className="text-start">Total Amount</th>
                            <th className="text-start">Status</th>
                            <th className="text-end pe-4 last:rounded-e-lg">Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices?.data?.results.map((invoice: any) => (
                            <tr
                                key={invoice.id}
                                className="border-b border-[#F0F1F3] text-sm font-medium text-[#808080]"
                            >
                                <td className="text-start py-3 px-4">#{invoice.id}</td>
                                <td className="text-start py-3">{invoice.invoiceDate}</td>
                                <td className="text-start py-3">{invoice.billingName}</td>
                                <td className="text-start py-3">${invoice.totalAmount}</td>
                                <td className="text-start py-3">{invoice.status}</td>
                                <td className="text-end py-3 px-4">{invoice.dueDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {invoices?.data?.count > 20 && (
                <div className="px-5 py-4">
                    <Pagination
                        totalPages={Math.ceil(invoices?.data?.count / 20)}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </RoundedBox>
    );
};

export default Invoices;
