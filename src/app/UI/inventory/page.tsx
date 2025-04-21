"use client"
import { Button } from '@/components/common/baseButton/BaseButton'
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import clsx from 'clsx'
import React, { useState } from 'react'
import { Checkbox, useDisclosure } from "@heroui/react";
import clock from "@/assets/temp-images/clock.png"
import Image from 'next/image'
import AddInventoryModal from '@/components/inventory'
import { TransparentButton } from '@/components/common/baseButton/TransparentButton'
import Pagination from '@/components/common/Pagination'

const Page = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [currentPage, setCurrentPage] = useState(1)
    return (
        <div className="xl:pe-8 lg:pe-6 !ps-3 pt-5 ">
            <RoundedBox as='section' className="shadow px-4 py-5 gap-3 mb-0.5">
                <Heading as="h1" className="col-span-12 pb-4">Overall Inventory</Heading>
                <div className='flex justify-between'>
                    <div className="grid grid-cols-1 gap-3 border-r border-gray-200 lg:pe-14 md:pe-8 pe-3">
                        <Heading>Categories</Heading>
                        <div className=' font-semibold text-base text-gray-600'>7</div>
                        <div className=' font-semibold text-base text-gray-500'>Last 7 days</div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 border-r border-gray-200  xl:px-12 lg:px-6 md:px-4 px-3">
                        <Heading className=' text-orange-800'>Total Products</Heading>
                        <div className='grid grid-cols-2 font-semibold text-base text-gray-600'>
                            <span>868</span>
                            <span className="text-center">$2500</span>
                        </div>
                        <div className='grid grid-cols-2 gap-10 font-semibold text-base text-gray-500'>
                            <span>Last 7 days</span>
                            <span className="text-center">Revenue</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 border-r border-gray-200  xl:px-12 lg:px-6 md:px-4 px-3">
                        <Heading className=' text-pink-500'>Top Selling</Heading>
                        <div className='grid grid-cols-2 gap-10 font-semibold text-base text-gray-600'>
                            <span>5</span>
                            <span className="text-center">$2500</span>
                        </div>
                        <div className='grid grid-cols-2 gap-10 font-semibold text-base text-gray-500'>
                            <span>Last 7 days</span>
                            <span className="text-center">Cost</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 xl:ps-12 lg:ps-6 md:ps-4 ps-3">
                        <Heading className=' text-red-700'>Low Stocks</Heading>
                        <div className='grid grid-cols-2 gap-10 font-semibold text-base text-gray-600'>
                            <span>12</span>
                            <span className="text-end">2</span>
                        </div>
                        <div className='grid grid-cols-2 gap-10 font-semibold text-base text-gray-500'>
                            <span>Last 7 days</span>
                            <span className="text-end">Cost</span>
                        </div>
                    </div>
                </div>
            </RoundedBox>

            {/* table section */}
            <RoundedBox as='section' className="shadow px-4 py-5 gap-3 mt-5">
                <div className='flex items-center justify-between'>
                    <Heading>Products</Heading>
                    <ul className='flex items-center gap-3'>
                        <li><Button title='Add Product' className='h-10' onPress={onOpen} /></li>
                        <li><TransparentButton title='Filters' className='h-10' icon='filter' /></li>
                        <li><TransparentButton title='Upload' className='h-10' icon='upload' /></li>
                        <li><TransparentButton title='Edit' className='h-10' icon='edit' /></li>
                        <li><Button title='Generate Invoice' className='h-10' icon='download' /></li>
                    </ul>
                </div>
                <div className='pt-3'>
                    <div className=" overflow-x-auto">
                        <table className="border-collapse min-w-[1200px] w-full">
                            <thead className="bg-blue-gradient text-white">
                                <tr>
                                    <th className="rounded-tl-lg rounded-bl-lg w-7"></th>
                                    {Array.from({ length: 20 }).map((_, index) => (
                                        <th
                                            key={index}
                                            className={clsx(
                                                "text-sm font-medium py-3",
                                                index === 19 && "rounded-tr-lg rounded-br-lg"
                                            )}
                                        >
                                            {index}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 20 }).map((_, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className="border-b border-gray-200 last:border-b-0 text-sm font-medium text-dark-700"
                                    >
                                        <td>
                                            <div>
                                                <Checkbox />
                                            </div>
                                        </td>
                                        {Array.from({ length: 20 }).map((_, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className={clsx("py-5", colIndex === 0 && "w-14")}
                                            >
                                                {colIndex === 0 ? (
                                                    <RoundedBox className="relative bg-gray-80 p-2">
                                                        <Image src={clock} width={48} alt="image" />
                                                    </RoundedBox>
                                                ) : (
                                                    <div className="whitespace-nowrap">This is bilal</div>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        totalPages={10}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </RoundedBox>
            <AddInventoryModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </div >
    )
}

export default Page
