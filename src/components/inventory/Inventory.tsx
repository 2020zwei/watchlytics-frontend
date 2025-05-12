"use client"
import { Button } from '@/components/common/baseButton/BaseButton'
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, useDisclosure } from "@heroui/react";
import { TransparentButton } from '@/components/common/baseButton/TransparentButton'
import Pagination from '@/components/common/Pagination'
import { METHODS, URLS } from '@/utils/constants'
import { sendRequest } from '@/utils/apis'
import { CATEGORES, DROPDWONOPTION, RequestTypes, STATETYPES } from '@/types'
import InventoryFilterModal from '@/components/common/InventoryFilters'
import AddInventoryModal from "@/components/inventory/AddInventoryModal"
import Icon from '../common/Icon'
import { toast } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import Notfound from '../common/Notfound'
import Link from 'next/link'
import UploadFileModal from '../common/UploadFileModal'

const holdTimeColors = {
    "94": "#DA3E33", // hold time greter then 94 then use this color
    "70": "#EDED25", // hold time greter then then 50 and less then 94 use this color
    "50": "#FFA500",// hold time greter then then 50 or equal and less then 70 use this color
    "49": "#10A760",// hold time greter less then 50 use this color
}
const STOCKCOLORS: any = { "in_stock": "text-green-600","sold":"text-red-500" }


const Inventory = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [currentPage, setCurrentPage] = useState(1)
    const [apiLoading, setApiLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<DROPDWONOPTION[]>([]);
    const [products, setProducts] = useState<any>([])
    const [columns, setColumns] = useState<string[]>([])
    const [product, setProduct] = useState<any>()
    const [stats, setStats] = useState<STATETYPES>()
    const searchParams = useSearchParams();
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const params = searchParams?.toString()

    const fetchCategories = async () => {
        const PAYLOAD: RequestTypes = {
            url: URLS.CATEGORES,
            method: METHODS.GET,
        }
        sendRequest(PAYLOAD).then((res) => {
            if (res?.data?.results?.length) {
                const options = res?.data?.results?.map((item: CATEGORES) => ({ value: item.id, label: item.name }))
                setCategories(options)
            }
        })
    }
    const fetchStats = async () => {
        sendRequest({ url: URLS.STATS }).then((res) => {
            setStats(res?.data)
        })
    }
    const fetchData = async (payload: any = null, page_number = 1) => {
        setApiLoading(true)
        // @ts-ignore

        const PAYLOAD: RequestTypes = {
            url: `${URLS.PRODUCTS}/?page_number=${currentPage}&${params?.replace(/\+/g, "%20")}&page_size=20/`,
            method: METHODS.GET,
        }
        sendRequest(PAYLOAD).then((res) => {
            if (res?.data?.results?.length) {
                setColumns(Object.keys(res?.data?.results[0]))
                setProducts(res?.data)
            }
            else {
                setProducts([])

            }
        }).finally(() => {
            setApiLoading(false)
        })
    }
    const handleDelete = (row: any) => {
        const PAYLOAD: RequestTypes = {
            url: `${URLS.DELETE_PRODUCT}/${row?.id}/`,
            method: METHODS.DELETE,
        }
        sendRequest(PAYLOAD).then((res) => {
            if (res?.data?.stats) {
                toast.success("fsfsdfs")
                fetchData()
            }
        })
    }
    const handleUploadClick = () => {
        setIsUploadModalOpen(true);
    };
    const closeUploadModal = () => {
        setIsUploadModalOpen(false);
        setApiLoading(false)
    };
    const handleUploadFile = async (file: File) => {
        setApiLoading(true)
        const formData = new FormData();
        formData.append("excel_file", file);
        const PAYLOAD: RequestTypes = {
            url: URLS.UPLOAD_PORODUCTS,
            method: METHODS.POST,
            payload: formData,
        }
        sendRequest(PAYLOAD).then((res) => {
            if (res?.status === 201) {
                setIsUploadModalOpen(false);
                toast.success("File uploaded successfully")
                fetchData()
            }
        }).finally(() => {
            setApiLoading(false)
        })
    }

    useEffect(() => {
        fetchCategories()
        fetchStats()
    }, [])

    useEffect(() => {
        if (!isOpen) {
            setProduct(null)
        }
    }, [isOpen])

    useEffect(() => {
        fetchCategories();
        fetchStats();
    }, []);

    useEffect(() => {
        fetchData();
    }, [searchParams, currentPage]);


    return (

        <div>
            {apiLoading && <div className=' fixed z-40 top-0 left-0 right-0 bottom-0 m-auto flex justify-center items-center bg-black/40'>
                <Spinner className="" size="lg" color="white" /></div>}

            <RoundedBox as='section' className="lg:px-4 lg:py-5 gap-3 mb-0.5 lg:!bg-white !bg-transparent">
                <Heading as="h1" className="col-span-12 pb-4">Overall Inventory</Heading>
                <div className='flex justify-between lg:flex-nowrap flex-wrap lg:gap-0 gap-y-3'>
                    <div className="lg:w-auto sm:w-[49%] w-full lg:p-0 p-4 rounded-lg grid grid-cols-1 gap-3 border-r border-gray-200 bg-white lg:pe-14 md:pe-8 pe-3">
                        <Heading>Categories</Heading>
                        <div className=' font-semibold text-base text-gray-600'>{stats?.categories?.count}</div>
                        <div className=' font-semibold text-base text-gray-500'>{stats?.categories.label}</div>
                    </div>
                    <div className="lg:w-auto sm:w-[49%] w-full lg:p-0 p-4 rounded-lg grid grid-cols-1 gap-3 border-r border-gray-200 bg-white  xl:px-12 lg:px-6 md:px-4 px-3">
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
                    <div className="lg:w-auto sm:w-[49%] w-full lg:p-0 p-4 rounded-lg grid grid-cols-1 gap-3 border-r border-gray-200 bg-white  xl:px-12 lg:px-6 md:px-4 px-3">
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
                    <div className="lg:w-auto sm:w-[49%] w-full lg:p-0 p-4 rounded-lg grid grid-cols-1 bg-white gap-3 xl:ps-12 lg:ps-6 md:ps-4 ps-3">
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

            <RoundedBox as='section' className="px-4 py-5 gap-3 mt-5">
                <div className='flex items-center justify-between md:flex-row flex-col'>
                    <Heading className='text-start md:w-auto w-full md:-order-1 order-1'>Products</Heading>
                    <ul className='flex items-center gap-3 md:mb-0 mb-5 md:flex-nowrap flex-wrap md:w-auto w-full inventory-btns'>
                        <li className='xs:w-auto w-[48%]'><Button title='Add Product' className='h-10 ' onPress={onOpen} /></li>
                        <li className='xs:w-auto w-[48%]'><InventoryFilterModal brands={categories} /></li>
                        <li className='xs:w-auto w-[48%]'>
                            <Dropdown className='!rounded-lg'>
                                <DropdownTrigger>
                                    <TransparentButton title='Upload' className='h-10' icon='upload' />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
                                    <DropdownItem
                                        key="new"
                                        className='text-gray-180 text-sm font-medium ps-1 hover:!bg-transparent hover:!border-transparent'
                                        startContent={<Icon name='upload' stroke='#acacac' />}
                                        onPress={handleUploadClick}                                   >
                                        Upload
                                    </DropdownItem>
                                    <DropdownItem
                                        key="new"
                                        className='text-gray-180 text-sm font-medium ps-1 hover:!bg-transparent hover:!border-transparent'
                                        startContent={<Icon name='upload' stroke='#acacac' className=' rotate-180' />}>
                                        <Link href="/files/download-template.xlsx" passHref legacyBehavior>
                                            <a download="sample.pdf">Download</a>
                                        </Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                        <li className='xs:w-auto w-[48%]'><Button title='Generate Invoice' className='h-10 lg:px-5 !px-3' icon='download' /></li>
                    </ul>
                </div>
                {
                    !products?.results?.length && !apiLoading ? <Notfound label='No Products Found' /> :
                        <div className='pt-3'>
                            <div className=" overflow-x-auto">
                                <table className="border-collapse min-w-[1200px] w-full text-start">
                                    <thead className="bg-blue-gradient text-white">
                                        <tr>
                                            <th className="px-4 rounded-tl-lg rounded-bl-lg text-sm font-medium py-3">Actions</th>
                                            <th className="w-7"></th>
                                            <th className="w-7">Image</th>
                                            {columns?.map((col, index) => (
                                                col !== 'id' && col !== "image" && col !== "category" && col !== "availability" && col !== "owner" ?
                                                    <th
                                                        key={index}
                                                        className={clsx(
                                                            "text-sm font-medium py-3 px-4"
                                                        )}

                                                    >
                                                        <div className={clsx("first-letter:uppercase whitespace-nowrap px-4")}>{col === "product_id" ? "Reference number" : col?.replaceAll("_", " ")}</div>
                                                    </th> : null
                                            ))}
                                            <th className="px-4 text-sm font-medium py-3">Availability</th>

                                        </tr>
                                    </thead>
                                    <tbody>{
                                        products?.results?.map((row: any, rowIndex: number) => (
                                            <tr
                                                key={rowIndex}
                                                className="border-b border-gray-200 last:border-b-0 text-sm font-medium text-dark-700"
                                            >
                                                <td className='text-center'>
                                                    <Dropdown className='!rounded-lg'>
                                                        <DropdownTrigger>
                                                            <button className='p-3'><Icon name='more' /></button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
                                                            <DropdownItem
                                                                onPress={() => { onOpen(); setProduct(row) }}
                                                                key="new"
                                                                className='text-gray-180 text-sm font-medium ps-1 hover:!bg-transparent hover:!border-transparent'
                                                                startContent={<Icon name='edit' stroke='#acacac' />}>
                                                                Edit
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onPress={() => handleDelete(row)}
                                                                key="new"
                                                                className='text-gray-180 text-sm font-medium hover:!bg-transparent hover:!border-transparent'
                                                                startContent={<Icon name='trash' stroke='#acacac' />}>
                                                                Delete
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </td>
                                                <td>
                                                    <div>
                                                        <Checkbox value={row?.id}
                                                            checked={product?.id === row?.id}
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <RoundedBox className="relative items-center justify-center flex  my-2 !bg-gray-80 p-2 h-14 w-14">
                                                        {row?.image ? <img src={row?.image} width={48} alt="image" className='w-full h-full rounded-md' /> : "N/A"}
                                                    </RoundedBox>
                                                </td>

                                                {columns.map((col, colIndex) => (
                                                    col !== 'id' && col !== "image" && col !== "category" && col !== "availability" && col !== "owner" ?
                                                        <td
                                                            key={colIndex}
                                                            className={clsx("py-5", colIndex === 0 && "w-14")}
                                                            style={
                                                                col === "hold_time"
                                                                    ? {
                                                                        color:
                                                                            row.hold_time > 94
                                                                                ? holdTimeColors["94"]
                                                                                : row.hold_time > 70
                                                                                    ? holdTimeColors["70"]
                                                                                    : row.hold_time >= 50
                                                                                        ? holdTimeColors["50"]
                                                                                        : holdTimeColors["49"],
                                                                    }
                                                                    : {}
                                                            }
                                                        >
                                                            <div className={clsx("whitespace-nowrap px-4 text-center")}>{col == "profit_margin" ? `${row?.[col]}%` :col == "hold_time"? `~${row?.[col]}`: row?.[col] || "-"}</div>
                                                        </td> : null
                                                ))}

                                                <td className={clsx("first-letter:capitalize text-center", STOCKCOLORS[row.availability])}>{row?.availability?.replaceAll("_", " ")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {
                                products?.count > 20 ?
                                    <Pagination
                                        totalPages={Math.ceil(products?.count / 20)}
                                        currentPage={currentPage}
                                        onPageChange={(page) => setCurrentPage(page)}
                                    /> : null}
                        </div>}
            </RoundedBox>
            <AddInventoryModal
                options={categories}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                callBack={() => {
                    fetchData()
                }}
                defaultData={product}
                formTitle={product ? "Update Product" : "New Product"}
            />
            <UploadFileModal isOpen={isUploadModalOpen} onOpen={closeUploadModal} callBack={handleUploadFile} isLoading={apiLoading} />
        </div >
    )
}

export default Inventory
