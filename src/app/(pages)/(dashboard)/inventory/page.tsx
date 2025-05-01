'use client'

import dynamic from 'next/dynamic';
import React from 'react';
const Inventory = dynamic(() => import('@/components/inventory/Inventory'), {
    ssr: false
});

const Page = () => {
    return (
        <Inventory />
    );
};

export default Page;
