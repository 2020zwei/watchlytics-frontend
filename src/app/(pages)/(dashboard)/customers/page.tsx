"use client"
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from "@heroui/react";
import Pagination from '@/components/common/Pagination'
import Link from 'next/link'
import SelectWidget from '@/components/common/SelectWidget'
import Icon from '@/components/common/Icon'
import AddNoteModalWidget from '@/components/common/AddNoteModalWidget'
import Notfound from '@/components/common/Notfound'
import AlertModal from '@/components/common/AlertModal'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useCustomers, useRemoveCustomer } from '@/hooks/useCustomerHooks' 

const buttons: any = {
    "status": ["active", "inactive"],
    "Spending": ["0-100", "101-500", '501-1000', '1000+'],
    "No. of Orders": ["1-5", "6-10", "11-20", "21+"],
    "Newsletter": ["subscribed", "unsubscribed"],
    "Follow Up": ["yes", "no"],
}

const page = () => {
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [filters, setFilters] = useState<{ [key: string]: string }>({})
    const [deleteAlert, setDeleteAlert] = useState(false)
    const [note, setNote] = useState<any>()
    const navigate = useRouter()
    const pageRef = useRef(1)

    const buildQuery = () => {
        const queryParams = new URLSearchParams(filters)
        queryParams.set('page', String(pageRef.current))
        queryParams.set('page_size', '20')
        return `?${queryParams.toString()}`
    }

    const { data: customers, isLoading, refetch } = useCustomers(buildQuery())

    const { mutate: deleteCustomer } = useRemoveCustomer()

    const handleDelete = (id: number) => {
        setDeleteId(id)
        setDeleteAlert(true)
    }

    const comfirmDelete = () => {
        if (!deleteId) return
        deleteCustomer(deleteId, {
            onSuccess: () => {
                toast.success("Customer successfully deleted")
                refetch()
            },
            onError: () => {
                toast.error("An error occurred while deleting customer.")
            },
            onSettled: () => {
                setDeleteAlert(false)
                setDeleteId(null)
            }
        })
    }

    const updateFilter = (key: string, value: string) => {
        navigate.push(`/customers`)
        setTimeout(() => {
            const newFilters = { ...filters, [key]: value }
            delete newFilters.page_number
            setFilters(newFilters)
            pageRef.current = 1
            setCurrentPage(1)
        }, 2000)
    }

    const handlePagination = (page: number) => {
        pageRef.current = page
        setCurrentPage(page)
    }

    const closeUploadModal = () => {
        setIsUploadModalOpen(false);
        setDeleteAlert(false);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const page = parseInt(params.get("page_number") || "1")
        const initialFilters: { [key: string]: string } = {}
        for (const [key, value] of params.entries()) {
            if (key !== "page_number") {
                initialFilters[key] = value
            }
        }
        pageRef.current = page
        setCurrentPage(page)
        setFilters(initialFilters)
    }, [])

    if (isLoading) {
        return <div className='text-center mt-5'><Spinner /></div>
    }

    console.log({ customers })

    return (
        <div>
            <RoundedBox as='section' className="px-4 py-5 gap-3 mt-5">

                <div className='lg-xl:flex items-center lg-xl:justify-between lg-xl:flex-row flex-col'>
                    <Heading className='text-start md:w-auto w-full md:-order-1 order-1 lg-xl:w-auto'>Customers Property</Heading>
                    <ul className='lg-xl:my-0 capitalize my-4 flex items-center gap-2 md:mb-0 mb-5 md:flex-nowrap flex-wrap md:w-auto w-full inventory-btns'>

                        {Object.keys(buttons).map((key: string, index: number) => {
                            return (
                                <li key={index} className={`min-w-[103px] filter-option${index}`}>
                                    <SelectWidget
                                        selected={filters[key]}
                                        onValueChange={(value) => { updateFilter(key, value); }}
                                        placeholder={key}
                                        options={buttons[key]}

                                        classNames={{
                                            trigger: "!rounded-lg bg-transparent capitalize border !border-gray-70 text-dark-700 font-normal text-sm",
                                            base: "rounded-none",
                                            popoverContent: "rounded-none",

                                        }}
                                    />
                                </li>
                            )
                        })}
                        {Object.keys(filters)?.length ? <li className='rounded-md border !border-gray-70 h-10 px-4 flex items-center justify-center cursor-pointer' onClick={() => { setFilters({}); navigate.push("/customers") }}>Clear</li> : null}
                    </ul>
                    <div className='lg-xl:w-auto w-full text-end'>
                        <Link href="/customers/add" className='bg-blue-gradient ms-auto text-white rounded-lg text-sm h-10 w-[128px] flex items-center justify-center'>Add Customer</Link>
                    </div>
                </div>

                <div className='pt-3'>
                    {!customers?.data?.results?.length ? <Notfound /> :
                        <>
                            <div className=" overflow-x-auto">
                                <table className="border-collapse min-w-[1200px] w-full text-start">
                                    <thead className="bg-blue-gradient text-white">
                                        <tr>
                                            <th className={clsx("text-sm font-medium py-3 rounded-tl-lg rounded-bl-lg  first-letter:uppercase whitespace-nowrap px-4")}
                                            >Name </th>
                                            <th className={clsx("text-sm font-medium py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >email</th>
                                            <th className={clsx("text-sm font-medium py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >address</th>
                                            <th className={clsx("text-sm font-medium py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >phone</th>
                                            <th className={clsx("text-sm font-medium py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >No. of Orders </th>
                                            <th className={clsx("text-sm font-medium py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >last purchase date </th>
                                            <th className={clsx("text-sm font-medium py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >Spending </th>
                                            <th className={clsx("text-sm font-medium py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >Follow Up </th>
                                            <th className={clsx("text-sm font-medium py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >Status</th>
                                            <th className="px-4 rounded-tr-lg rounded-br-lg text-sm font-medium py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers?.data?.results?.map((item: any) => (
                                            <tr key={item?.id} className="border-b border-gray-200 last:border-b-0 text-sm font-medium text-dark-700"                                    >
                                                <td>
                                                    <div className='flex items-center gap-2'>
                                                        <RoundedBox className="relative items-center justify-center flex  my-2 !bg-gray-80 p-2 h-7 w-7 !rounded-full">
                                                            {item?.profile_picture ? <img src={item?.profile_picture} width={48} alt="image" className='w-full h-full rounded-md' /> : null}
                                                        </RoundedBox>
                                                        <span className='whitespace-nowrap'>{item?.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-5 whitespace-nowrap px-4 text-center">{item?.email || "-"}</td>
                                                <td className="py-5 whitespace-nowrap px-4 text-center">{item?.address || "-"}</td>
                                                <td className="py-5 whitespace-nowrap px-4 text-center">{item?.phone || "-"}</td>
                                                <td className="py-5 whitespace-nowrap px-4 text-center">{item?.orders_count || "-"}</td>
                                                <td className="py-5 whitespace-nowrap px-4 text-center">{item?.last_purchase_date || "-"}</td>
                                                <td className="py-5 whitespace-nowrap px-4 text-center">{item?.total_spending || "-"}</td>
                                                <td className="py-5 whitespace-nowrap px-4 text-center">{item?.follow_up_display || "-"}</td>
                                                <td className="py-5 whitespace-nowrap px-4 text-center">
                                                    <button className={clsx("border rounded-lg h-8 w-[72px] cursor-default", item?.status_display === "Active" ? "border-[#10A760] text-[#10A760]" : "border-[#DA3E33] text-[#DA3E33]")}>{item?.status_display}</button>
                                                </td>
                                                <td className='text-center'>
                                                    <Dropdown className='!rounded-lg'>
                                                        <DropdownTrigger>
                                                            <button className='p-3'><Icon name='more' /></button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
                                                            <DropdownItem
                                                                onPress={() => { setIsUploadModalOpen(true); setNote(item) }}
                                                                key="Add Notes"
                                                                className='text-gray-180 text-sm font-medium ps-1 hover:!bg-transparent hover:!border-transparent'
                                                                startContent={<Icon name='notes' stroke='#acacac' />}>
                                                                Add Notes
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onPress={() => navigate.push(`/customers/add/?id=${item?.id}`)}
                                                                key="edit"
                                                                className='text-gray-180 text-sm font-medium ps-1 hover:!bg-transparent hover:!border-transparent'
                                                                startContent={<Icon name='edit' stroke='#acacac' />}>
                                                                Edit
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onPress={() => handleDelete(item.id)}
                                                                key="delete"
                                                                className='text-gray-180 text-sm font-medium hover:!bg-transparent hover:!border-transparent'
                                                                startContent={<Icon name='trash' stroke='#acacac' />}>
                                                                Delete
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {customers?.data?.count > 20 &&
                                <Pagination
                                    totalPages={Math.ceil(customers?.data?.count / 20)}
                                    currentPage={currentPage > 1 ? currentPage : pageRef.current}
                                    onPageChange={(page) => handlePagination(page)}
                                />}
                        </>
                    }
                </div>
            </RoundedBox>
            <AddNoteModalWidget isOpen={isUploadModalOpen} onOpen={closeUploadModal} note={note} callBack={() => { closeUploadModal() }} />
            <AlertModal alertText="Are you sure you want to delete this card?"
                isOpen={deleteAlert} onOpen={closeUploadModal} callBack={comfirmDelete} />
        </div >
    )
}


export default page


