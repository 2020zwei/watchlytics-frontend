"use client"

import dynamic from 'next/dynamic';

const TockAgingReportWidget = dynamic(() => import('@/components/tockAgingReportWidget/tockAgingReportWidget'), {
  ssr: false
});


const page = () => {
  return (
    <TockAgingReportWidget />
  )
}

export default page
