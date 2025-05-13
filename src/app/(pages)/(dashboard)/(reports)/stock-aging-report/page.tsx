"use client"
import RoundedBox from '@/components/common/baseButton/RoundedBox';
import Heading from '@/components/common/heading';
import ReportFilters from '@/components/common/ReportFilters';
import SelectWidget from '@/components/common/SelectWidget';
import { RequestTypes } from '@/types';
import { sendRequest } from '@/utils/apis';
import { METHODS, URLS } from '@/utils/constants';
import { Spinner } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'STK1', '<30': 20, '30-60': 15, '60-90': 20, '90+': 15 },
  { name: 'STK2', '<30': 10, '30-60': 10, '60-90': 10, '90+': 15 },
  { name: 'STK3', '<30': 25, '30-60': 25, '60-90': 25, '90+': 25 },
  { name: 'STK4', '<30': 20, '30-60': 18, '60-90': 20, '90+': 20 },
  { name: 'STK5', '<30': 15, '30-60': 10, '60-90': 15, '90+': 18 },
  { name: 'STK6', '<30': 10, '30-60': 10, '60-90': 10, '90+': 8 },
  { name: 'STK7', '<30': 18, '30-60': 15, '60-90': 15, '90+': 15 },
  { name: 'STK8', '<30': 20, '30-60': 20, '60-90': 22, '90+': 23 },
  { name: 'STK9', '<30': 15, '30-60': 15, '60-90': 15, '90+': 13 },
];

const COLORS = {
  '<30': '#FFAF00',     // Orange
  '30-60': '#F46920',   // Tomato
  '60-90': '#F53255',   // Deep Pink
  '90+': '#F857C1'      // Hot Pink
};

const page = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [modelNames, setModelNames] = useState<any[]>([]);

  const transformChartData = (data: any[]) =>
    data.map((item) => ({
      name: item.id,
      '<30': item.less_than_30,
      '30-60': item['30_to_60'],
      '60-90': item['60_to_90'],
      '90+': item['91_plus'],
    }));


  // const fetchCategories = async () => {
  //   const PAYLOAD: RequestTypes = {
  //     url: `${URLS.PRODUCTS}/`,
  //     method: METHODS.GET,
  //   };
  //   sendRequest(PAYLOAD).then((res) => {
  //     if (res.status === 200) {
  //       const options = res?.data?.results?.map((item: any) => item.product_name);
  //       setCategories(options);
  //     }
  //   });
  // };

  const fetchChartDate = async () => {
    setLoading(true);
    const PAYLOAD: RequestTypes = {
      url: URLS.STOCK_AGING,
      method: METHODS.GET,
    };
    sendRequest(PAYLOAD).then((res) => {
      if (res.status === 200) {
        console.log(res)
        const transformed = transformChartData(res?.data?.chart_data);
        setChartData(transformed);
        setCategories(res?.data?.available_brands)
        setModelNames(res?.data?.available_models)
      }
    }).finally(() => { setLoading(false) });
  };

  const handleFilter = (filter: any) => {
    console.log(filter)
  }

  useEffect(() => {
    // fetchCategories();
    fetchChartDate()
  }, [])
  if (loading) {
    return <div className='text-center'><Spinner /></div>;
  }


  return (
    <>
      <div className='mb-4 flex sm:flex-row flex-col items-center sm:justify-between'>
        <Heading as='h3' className=' md:text-2xl text-lg w-full'>Stock Aging Report</Heading>
        <ReportFilters selectedReport='Stock Aging' />
      </div>
      <div className='flex items-center gap-3 mb-6'>
        <div className='min-w-[140px]'>
          <SelectWidget
            onValueChange={(value) => handleFilter({ "brand": value })}
            placeholder="Brand"
            options={categories}
            classNames={{
              trigger: "!rounded-lg bg-transparent border !border-gray-70 text-dark-700 font-normal text-sm",
              base: "rounded-none",
              popoverContent: "rounded-none",

            }}
          />
        </div>
        <div className='min-w-[140px]'>
          <SelectWidget
            onValueChange={(value) => handleFilter({ "model": value })}
            placeholder="Model Name"
            options={modelNames}
            classNames={{
              trigger: "!rounded-lg bg-transparent border !border-gray-70 text-dark-700 font-normal text-sm",
              base: "rounded-none",
              popoverContent: "rounded-none",

            }}
          />
        </div>
      </div>
      <RoundedBox className='!p-4 !ps-0 flex gap-2'>
        <div className='flex-1'>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} barGap={0}>
              <CartesianGrid vertical={false} stroke='#3333331A' />
              <XAxis dataKey="name" axisLine={{ stroke: '#3333331A' }} fontSize={14} tickLine={false} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
              <Tooltip cursor={false} />
              <Bar dataKey="<30" stackId="a" fill={COLORS['<30']} barSize={44} />
              <Bar dataKey="30-60" stackId="a" fill={COLORS['30-60']} barSize={44} />
              <Bar dataKey="60-90" stackId="a" fill={COLORS['60-90']} barSize={44} />
              <Bar dataKey="90+" stackId="a" fill={COLORS['90+']} barSize={44} />

            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='min-w-[215px] h-full bg-[#F9F9F9] rounded-lg p-4'>
          <h3 className=' font-medium text-dark-800 pb-4'>Days in Inventory</h3>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-3'>
              <span className='w-5 h-5 rounded bg-[#FFAF00]'></span>
              <span className='text-[#808080] text-sm'>&lt;30 Days</span>
            </div>
            <div className='flex items-center gap-3'>
              <span className='w-5 h-5 rounded bg-[#F46920]'></span>
              <span className='text-[#808080] text-sm'>&gt;30 -&lt; 60 Days</span>
            </div>
            <div className='flex items-center gap-3'>
              <span className='w-5 h-5 rounded bg-[#F53255]'></span>
              <span className='text-[#808080] text-sm'>&gt;60 -&lt; 90 Days</span>
            </div>
            <div className='flex items-center gap-3'>
              <span className='w-5 h-5 rounded bg-[#F857C1]'></span>
              <span className='text-[#808080] text-sm'>91+ Days</span>
            </div>
          </div>
        </div>
      </RoundedBox>
    </>
  )
}

export default page