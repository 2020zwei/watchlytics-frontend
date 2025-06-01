"use client"
import dynamic from 'next/dynamic';
import React from 'react'
const ProfitLossReport = dynamic(() => import('@/components/ProfitLossReport'), {
    ssr: false,
});
const page = () => {
    return (
        <ProfitLossReport />
    )
}

export default page