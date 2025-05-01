import ProductDetail from '@/components/inventory/ProductDetail'
import React, { Suspense } from 'react'

const page = () => {
    return (
        <Suspense>
            <ProductDetail/>
        </Suspense>
    )
}

export default page
