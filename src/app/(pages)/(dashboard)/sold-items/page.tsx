"use client"
import dynamic from 'next/dynamic';
import React from 'react'
const SoldItems = dynamic(() => import('@/components/SoldItems'), {
    ssr: false,
});
const page = () => {
    return (
        <SoldItems />
    )
}

export default page