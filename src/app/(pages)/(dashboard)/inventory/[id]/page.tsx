'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Spinner } from '@heroui/react';

// Disable SSR for ProductDetail
const ProductDetail = dynamic(() => import('@/components/inventory/ProductDetail'), {
    ssr: false,
    loading: () => <Spinner />
});

const Page = () => {
    return <ProductDetail />;
};

export default Page;
