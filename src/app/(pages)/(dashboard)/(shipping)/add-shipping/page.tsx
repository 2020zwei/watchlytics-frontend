import LoaderWidget from '@/components/common/LoaderWidget'
import ShippingFormWidget from '@/components/shipping/ShippingFormWidget'
import ShippingTableWidget from '@/components/shipping/ShippingTableWidget'
import React, { Suspense } from 'react'


const page = () => {
    return (
        <Suspense fallback={<LoaderWidget />}>
            <ShippingFormWidget>

            </ShippingFormWidget>
        </Suspense>
    )
}

export default page
