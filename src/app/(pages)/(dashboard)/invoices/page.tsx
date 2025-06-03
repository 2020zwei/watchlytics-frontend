"use client"
import dynamic from 'next/dynamic';
import React from 'react'
const InvoiceTable = dynamic(() => import('@/components/invoices'), {
    ssr: false,
});

const page = () => {
    return (
        <InvoiceTable />
    )
}

export default page