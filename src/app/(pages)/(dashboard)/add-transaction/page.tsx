
import AddTransaction from '@/components/AddTransaction'
import LoaderWidget from '@/components/common/LoaderWidget'
import React, { Suspense } from 'react'

const page = () => {
    return (
        <Suspense fallback={<LoaderWidget />}>
            <AddTransaction />
        </Suspense>
    )
}

export default page
