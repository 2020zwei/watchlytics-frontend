import AddTrading from '@/components/AddTrading'
import LoaderWidget from '@/components/common/LoaderWidget'
import React, { Suspense } from 'react'

const page = () => {
    return (
        <Suspense fallback={<LoaderWidget/>}>
            <AddTrading />
        </Suspense>
    )
}

export default page
