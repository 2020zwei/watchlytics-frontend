import Inventory from '@/components/Inventory'
import { Spinner } from '@heroui/react';
import React from 'react'
import { Suspense } from 'react';
const page = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Inventory />
        </Suspense>
    )
}

export default page
