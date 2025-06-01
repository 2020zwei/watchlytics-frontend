"use client"
import dynamic from 'next/dynamic';
import React from 'react'
const Transactions = dynamic(() => import('@/components/Transactions'), {
    ssr: false,
});
const page = () => {
    return (
        <Transactions />
    )
}

export default page