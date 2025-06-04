"use client"
import dynamic from 'next/dynamic';
import React from 'react';
const IncomeReport = dynamic(() => import('@/components/reports/IncomeReport'), {
    ssr: false,
});

const Page = () => {
    return <IncomeReport />;
};

export default Page;
