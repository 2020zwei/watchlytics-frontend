'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const ProductDetail = dynamic(() => import('@/components/inventory/ProductDetail'), {
    ssr: false
});

const Page = () => {
    return <ProductDetail />;
};

export default Page;
