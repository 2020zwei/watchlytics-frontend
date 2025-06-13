"use client"
import CustomersComp from '@/components/customers/Customers'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback=""><CustomersComp/></Suspense>
  )
}

export default page
