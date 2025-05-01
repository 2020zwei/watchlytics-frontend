'use client'

import dynamic from 'next/dynamic';
import { Spinner } from '@heroui/react';
import React from 'react';
const Inventory = dynamic(() => import('@/components/inventory/Inventory'), {
    ssr: false,
    loading: () => <Spinner />
});

const Page = () => {
    return (
        <Inventory />
    );
};

export default Page;
