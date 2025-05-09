import LoaderWidget from '@/components/common/LoaderWidget'
import ShippingTableWidget from '@/components/shipping/ShippingTableWidget'
import React, { Suspense } from 'react'


const page = () => {
    return (
        <Suspense fallback={<LoaderWidget />}>
            <ShippingTableWidget>

            </ShippingTableWidget>
        </Suspense>
    )
}

export default page
