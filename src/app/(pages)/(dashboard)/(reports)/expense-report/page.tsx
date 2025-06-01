"use client"
import dynamic from 'next/dynamic';
import React from 'react'
const ExpenseReport = dynamic(() => import('@/components/ExpenseReport'), {
    ssr: false,
});
const page = () => {
    return (
        <ExpenseReport />
    )
}

export default page