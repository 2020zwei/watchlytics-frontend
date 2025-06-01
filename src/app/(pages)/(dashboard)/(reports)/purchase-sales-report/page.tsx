"use client"
import dynamic from 'next/dynamic';
import React from 'react';
const SalePurchase = dynamic(() => import('@/components/SalePurchase'), {
    ssr: false,
});

const Page = () => {
    return (
        <div>
            <SalePurchase />
        </div>
    );
};

export default Page;
