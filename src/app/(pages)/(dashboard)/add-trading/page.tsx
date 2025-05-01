import AddTrading from '@/components/AddTrading'
import React, { Suspense } from 'react'

const page = () => {
    return (
        <Suspense fallback={<div className='h-screen w-full flex items-center justify-center'>Loading...</div>}>
            <AddTrading />
        </Suspense>
    )
}

export default page
