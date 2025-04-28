"use client"
import { Button } from '@/components/common/baseButton/BaseButton'
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Checkbox, Spinner, useDisclosure } from "@heroui/react";
import AddInventoryModal from '@/components/inventory/index'
import { TransparentButton } from '@/components/common/baseButton/TransparentButton'
import Pagination from '@/components/common/Pagination'
import InventoryFilters from '@/components/common/InventoryFilters'
import { METHODS, URLS } from '@/utils/constants'
import { sendRequest } from '@/utils/apis'
import { CATEGORES, DROPDWONOPTION, RequestTypes, STATETYPES } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import InventoryFilterModal from '@/components/common/InventoryFilters'


const Inventory = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [currentPage, setCurrentPage] = useState(1)
    const [apiLoading, setApiLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<DROPDWONOPTION[]>([]);
    const [products, setProducts] = useState<any>([])
    const [columns, setColumns] = useState<string[]>([])
    const [product, setProduct] = useState<RequestTypes | null>()
    const [stats, setStats] = useState<STATETYPES>()
    const STOCKCOLORS: any = { "in_stock": "text-green-600" }
    const fetchCategories = async () => {
        const PAYLOAD: RequestTypes = {
            url: URLS.CATEGORES,
            method: METHODS.GET,
        }
        sendRequest(PAYLOAD).then((res) => {
            if (res?.results?.length) {
                const options = res?.results?.map((item: CATEGORES) => ({ value: +item.id, label: item.name }))
                setCategories(options)
            }
        })
    }
    const fetchStats = async () => {
        sendRequest({ url: URLS.STATS }).then((res) => {
            console.log(res, "stats")
            setStats(res)
        })
    }
    const fetchData = async () => {
        setApiLoading(true)
        // @ts-ignore
        const PAYLOAD: RequestTypes = {
            url: URLS.PRODUCTS,
            method: METHODS.GET,
        }
        sendRequest(PAYLOAD).then((res) => {
            if (res?.results?.length) {
                console.log(res?.results)
                setColumns(Object.keys(res?.results[0]))
                setProducts(res)
            }
        }).finally(() => {
            setApiLoading(false)
        })
    }


    // const handleFilter = (value: string) => {
    //     const currentParams = new URLSearchParams(searchParams.toString());
    //     currentParams.set('filter', value);
    //     router.push(`/inventory?${currentParams.toString()}`);
    // };

    useEffect(() => {
        fetchCategories()
        fetchStats()
    }, [])

    useEffect(() => {
        if (!isOpen) {
            setProduct(null)
            fetchData()
        }
    }, [isOpen])


    return (

        <div className="!ps-3 pt-5">
            <RoundedBox as='section' className="shadow px-4 py-5 gap-3 mb-0.5">
                <Heading as="h1" className="col-span-12 pb-4">Overall Inventory</Heading>
                <div className='flex justify-between'>
                    <div className="grid grid-cols-1 gap-3 border-r border-gray-200 lg:pe-14 md:pe-8 pe-3">
                        <Heading>Categories</Heading>
                        <div className=' font-semibold text-base text-gray-600'>{stats?.categories?.count}</div>
                        <div className=' font-semibold text-base text-gray-500'>{stats?.categories.label}</div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 border-r border-gray-200  xl:px-12 lg:px-6 md:px-4 px-3">
                        <Heading className=' text-orange-800'>Total Products</Heading>
                        <div className='grid grid-cols-2 font-semibold text-base text-gray-600'>
                            <span>{stats?.total_products?.count}</span>
                            <span className="text-center">{stats?.total_products?.revenue}</span>
                        </div>
                        <div className='grid grid-cols-2 gap-10 font-semibold text-base text-gray-500'>
                            <span>{stats?.total_products?.label}</span>
                            <span className="text-center">Revenue</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 border-r border-gray-200  xl:px-12 lg:px-6 md:px-4 px-3">
                        <Heading className=' text-pink-500'>Top Selling</Heading>
                        <div className='grid grid-cols-2 gap-10 font-semibold text-base text-gray-600'>
                            <span>{stats?.top_selling.count}</span>
                            <span className="text-center">{stats?.top_selling?.cost}</span>
                        </div>
                        <div className='grid grid-cols-2 gap-10 font-semibold text-base text-gray-500'>
                            <span>{stats?.top_selling?.label}</span>
                            <span className="text-center">Cost</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 xl:ps-12 lg:ps-6 md:ps-4 ps-3">
                        <Heading className=' text-red-700'>Low Stocks</Heading>
                        <div className='grid grid-cols-2 gap-10 font-semibold text-base text-gray-600'>
                            <span>{stats?.low_stocks?.ordered}</span>
                            <span className="text-end">{stats?.low_stocks?.not_in_stock}</span>
                        </div>
                        <div className='grid grid-cols-2 gap-10 font-semibold text-base text-gray-500'>
                            <span>Ordered</span>
                            <span className="text-end">Not in stock</span>
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
                        <li><InventoryFilterModal brands={categories}/></li>
                        <li><TransparentButton title='Upload' className='h-10' icon='upload' /></li>
                        <li><TransparentButton isDisabled={!product} onPress={onOpen} title='Edit' className='h-10' icon='edit' /></li>
                        <li><Button title='Generate Invoice' className='h-10' icon='download' /></li>
                    </ul>
                </div>
                <div className='pt-3'>
                    <div className=" overflow-x-auto">
                        <table className="border-collapse min-w-[1200px] w-full text-start">
                            <thead className="bg-blue-gradient text-white">
                                <tr>
                                    <th className="rounded-tl-lg rounded-bl-lg w-7"></th>
                                    <th className="w-7">Image</th>
                                    {columns?.map((col, index) => (
                                        col !== 'id' && col !== "image" && col !== "category" && col !== "availability" ?
                                            <th
                                                key={index}
                                                className={clsx(
                                                    "text-sm font-medium py-3 px-4"
                                                )}
                                            >
                                                <div className={clsx("first-letter:uppercase whitespace-nowrap px-4")}>{col?.replaceAll("_", " ")}</div>
                                            </th> : null
                                    ))}
                                    <th className="px-4 rounded-tr-lg rounded-br-lg text-sm font-medium py-3 px-4 ">Availability</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !products?.results?.length ?
                                        <tr><td colSpan={12} className='text-center py-5'>Data not found</td></tr>
                                        :
                                        products?.results?.map((row: any, rowIndex: number) => (
                                            <tr
                                                key={rowIndex}
                                                className="border-b border-gray-200 last:border-b-0 text-sm font-medium text-dark-700"
                                            >
                                                <td>
                                                    <div>
                                                        <Checkbox value={row?.id} onChange={(e) => setProduct(row)}
                                                            checked={product?.id === row?.id}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <RoundedBox className="relative  my-2 !bg-gray-80 p-2 h-14 w-14">
                                                        <img src={row?.image} width={48} alt="image" className='w-full h-full rounded-md' />
                                                    </RoundedBox>
                                                </td>
                                                {columns.map((col, colIndex) => (
                                                    col !== 'id' && col !== "image" && col !== "category" && col !== "availability" ?
                                                        <td
                                                            key={colIndex}
                                                            className={clsx("py-5", colIndex === 0 && "w-14")}
                                                        >
                                                            <div className={clsx("whitespace-nowrap px-4 text-center")}>{row?.[col] || "-"}</div>
                                                        </td> : null
                                                ))}

                                                <td className={clsx("first-letter:capitalize text-center", STOCKCOLORS[row.availability])}>{row?.availability?.replaceAll("_", " ")}</td>
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
                options={categories}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                defaultData={product}
                formTitle={product ? "Update Product" : "New Product"}
            />
        </div >
    )
}

export default Inventory
