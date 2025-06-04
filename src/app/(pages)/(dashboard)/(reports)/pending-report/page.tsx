"use client"
import dynamic from 'next/dynamic';
import React from 'react';
const PendingReport = dynamic(() => import('@/components/reports/pendingReport'), {
    ssr: false,
});

const Page = () => {
    return <PendingReport />;
};

export default Page;
