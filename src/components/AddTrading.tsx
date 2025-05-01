"use client"
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import Icon from '@/components/common/Icon';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import Select from 'react-select'

const options = [
    {
        value: 1,
        label: 'Leanne Graham'
    },
    {
        value: 2,
        label: 'Ervin Howell'
    }
];

const AddTrading = () => {
    const id = useSearchParams().get('id')
    console.log(id)
    const [date, setDate] = useState<any>()
    const dateRef = React.useRef<HTMLInputElement>(null);

    return (
        <RoundedBox>
            <div className='flex items-center justify-between px-4 pt-7 pb-3 border-b border-[#F0F1F3]'>
                <Heading>Add Trade Details</Heading>
            </div>
            <div className='pt-5 px-4 pb-8 flex flex-col gap-3'>
                <div className='flex items-center'>
                    <label htmlFor="" className='sm:min-w-[140px] min-w-[130px] text-sm font-medium text-dark-700'>Name Of Trade:</label>
                    <input type="text" placeholder='Name Of Trade' className='max-w-[320px] outline-none font-normal border text-sm placeholder:text-gray-180 placeholder:text-sm rounded-lg px-3 h-[34px] w-full border-gray-70 text-dark-800' />
                </div>
                <div className='flex items-center'>
                    <label htmlFor="" className='sm:min-w-[140px] min-w-[130px] text-sm font-medium text-dark-700'>Add Watches:</label>
                    <div className='flex items-center relative flex-1'>
                        <span className='start-2 z-10 absolute'><Icon name='search' size='1.3rem' /></span>
                        <Select
                            options={options}
                            onChange={() => { }}
                            placeholder="Add Watches"
                            classNamePrefix="searchbale-select"
                            isSearchable
                            styles={{
                                container: (base, props) => ({
                                    ...base,
                                    width: '100%',
                                    maxWidth: "320px"
                                }),
                            }}
                        />
                    </div>
                </div>
                <div className='flex'>
                    <div className='sm:min-w-[140px] min-w-[130px] text-sm font-medium text-dark-700'>Quantity:</div>
                    <div className='w-full flex flex-col gap-3'>
                        {
                            Array.from({ length: 4 }).map(() => (
                                <div className=' flex items-center justify-between w-full max-w-[320px]'>
                                    <div className='flex items-center gap-3 text-dark-800 font-normal text-sm'>
                                        <div className='w-8 h-8 rounded py-1 bg-[#f9f9f9]'>
                                            <img src="/images/clock.png" alt="" className='w-full h-full object-contain' />
                                        </div>
                                        <span>Panerai</span>
                                    </div>
                                    <div className='w-[77px] flex items-center justify-between px-2 h-7 rounded-3xl border border-[#F0F1F3]'>
                                        <button className='text-[#ACACAC] text-lg'>+</button>
                                        <span className=' font-poppins'>1</span>
                                        <button className='text-[#ACACAC] text-lg'>-</button>
                                    </div>
                                    <div className=' font-medium'>
                                        <span>$</span>97
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className='flex items-center'>
                    <label htmlFor="" className='sm:min-w-[140px] min-w-[130px] text-sm font-medium text-dark-700'>Transaction Date:</label>
                    <div className="flex-1 max-w-[320px] flex items-center justify-between relative" onClick={() => dateRef.current?.showPicker()}>
                        <input
                            ref={dateRef}
                            type="date"
                            className={clsx("max-w-[320px] outline-none font-normal border text-sm placeholder:text-gray-180 placeholder:text-sm rounded-lg px-3 h-[34px] w-full border-gray-70 text-dark-800", date ? "" : "text-gray-180")}
                            placeholder='Name Of Trade'
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <span className="absolute right-3 bg-white"><Icon name="calender" /></span>
                    </div>
                </div>
                <div className='flex items-center'>
                    <label htmlFor="" className='sm:min-w-[140px] min-w-[130px] text-sm font-medium text-dark-700'>Purchase Price:</label>
                    <input type="text" placeholder='Name Of Trade' className='max-w-[320px] outline-none font-normal border text-sm placeholder:text-gray-180 placeholder:text-sm rounded-lg px-3 h-[34px] w-full border-gray-70 text-dark-800' />
                </div>
                <div className='flex items-center'>
                    <label htmlFor="" className='sm:min-w-[140px] min-w-[130px] text-sm font-medium text-dark-700'>Sale Price:</label>
                    <input type="text" placeholder='Name Of Trade' className='max-w-[320px] outline-none font-normal border text-sm placeholder:text-gray-180 placeholder:text-sm rounded-lg px-3 h-[34px] w-full border-gray-70 text-dark-800' />
                </div>
                <div className='border-t border-[#F0F1F3] mt-1'>
                    <h4 className='font-semibold text-dark-800 my-4'>Buyer Details</h4>
                    <div className='flex items-center'>
                        <label htmlFor="" className='sm:min-w-[140px] min-w-[130px] text-sm font-medium text-dark-700'>Name:</label>
                        <div className='flex items-center relative flex-1'>
                            <span className='start-2 z-10 absolute'><Icon name='search' size='1.3rem' /></span>
                            <Select
                                options={options}
                                onChange={() => { }}
                                placeholder="Buyer Name"
                                classNamePrefix="searchbale-select"
                                isSearchable
                                styles={{
                                    container: (base, props) => ({
                                        ...base,
                                        width: '100%',
                                        maxWidth: "320px"
                                    }),
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </RoundedBox>
    )
}

export default AddTrading
