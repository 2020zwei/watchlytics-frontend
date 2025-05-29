"use client"

import Dashboard from '@/components/Dashbaord'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback=""><Dashboard /></Suspense>
  )
}

export default page