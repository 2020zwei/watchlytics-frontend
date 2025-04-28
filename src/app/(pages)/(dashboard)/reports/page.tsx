
import Reports from '@/components/Reports'
import { Spinner } from '@heroui/react'
import React from 'react'
import { Suspense } from 'react';

const page = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Reports />
        </Suspense>
    )
}

export default page
