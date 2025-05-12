
'use client'
import dynamic from 'next/dynamic';
import React from 'react'
const CardListingWidget = dynamic(() => import('@/components/CardListingWidget'), {
    ssr: false
});
const page = () => {
    return (
        <CardListingWidget />
    )
}

export default page
