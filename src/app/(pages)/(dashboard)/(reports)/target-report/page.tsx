"use client"
import dynamic from 'next/dynamic';
import React from 'react';
const TargetReport = dynamic(() => import('@/components/reports/targetReport'), {
    ssr: false,
});

const Page = () => {
    return <TargetReport />;
};

export default Page;
