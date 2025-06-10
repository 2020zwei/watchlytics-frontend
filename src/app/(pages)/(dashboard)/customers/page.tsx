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
import { formatCurrency } from '@/utils/formatCurrency'
import { exportToPDF } from '@/utils/exportToPDF'

const buttons: any = {
    "status": ["active", "inactive"],
    "Spending": ["0-100", "101-500", '501-1000', '1000+'],
    "No. of Orders": ["1-5", "6-10", "11-20", "21+"],
    "Newsletter": ["subscribed", "unsubscribed"],
    "Follow Up": ["yes", "no"],
}

type SortDirection = 'asc' | 'desc';

type SortConfig<T> = {
    key: keyof T;
    direction: SortDirection;
} | null;

const page = () => {
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [filters, setFilters] = useState<{ [key: string]: string }>({})
    const [followUps, setFollowUps] = useState<Record<string, string>>({});
    const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);
    const [sortedData, setSortedData] = useState<T[]>([]);

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

    const handleSort = (key: keyof T) => {
        setSortConfig(prev => {
            if (prev && prev.key === key) {
                // Toggle direction
                return {
                    key,
                    direction: prev.direction === 'asc' ? 'desc' : 'asc',
                };
            }
            return { key, direction: 'asc' };
        });
    };

    useEffect(() => {
        if (!sortConfig || !customers?.data?.results) {
            setSortedData(customers?.data?.results ?? []);
            return;
        }

        const sorted = [...customers?.data?.results].sort((a, b) => {
            let aVal = a[sortConfig.key];
            let bVal = b[sortConfig.key];
            if (sortConfig.key === 'last_purchase_date') {
                aVal = new Date(aVal).getTime();
                bVal = new Date(bVal).getTime();
            }
            if (typeof aVal === 'string') aVal = aVal.toLowerCase();
            if (typeof bVal === 'string') bVal = bVal.toLowerCase();

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
        setSortedData(sorted);
    }, [sortConfig, customers?.data?.results]);


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


    return (
        <div>
            <div className=" grid md:grid-cols-4 xs:grid-cols-2 grid-cols-1 mt-6 gap-3">
                <Link href="/inventory" className=" rounded-lg bg-white shadow-lg p-4 border-blue-700 border-t-2">
                    <div className="text-lg font-medium pb-3 text-blue-700">Total Customers</div>
                    <div className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none">
                        23
                    </div>
                </Link>

                <Link href="/inventory" className=" rounded-lg bg-white shadow-lg p-4 border-blue-700 border-t-2">
                    <div className="text-lg font-medium pb-3 text-blue-700">Avg Spending
                    </div>
                    <div className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none">
                        23%
                    </div>
                </Link>

                <Link href="/inventory" className=" rounded-lg bg-white shadow-lg p-4 border-blue-700 border-t-2">
                    <div className="text-lg font-medium pb-3 text-blue-700">Follow-ups Due
                    </div>
                    <div className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none">
                        23
                    </div>
                </Link>

                <Link href="/inventory" className=" rounded-lg bg-white shadow-lg p-4 border-blue-700 border-t-2">
                    <div className="text-lg font-medium pb-3 text-blue-700">New Leads This Month
                    </div>
                    <div className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none">
                        23
                    </div>
                </Link>
            </div>
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
                        <button onClick={() => exportToPDF(sortedData, 'Customer Report')}>Export PDF</button>

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
                                            <th className={clsx("text-sm font-bold py-3 rounded-tl-lg rounded-bl-lg  first-letter:uppercase whitespace-nowrap px-4")}
                                            >Name </th>
                                            <th className={clsx("text-sm font-bold py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >email</th>
                                            <th className={clsx("text-sm font-bold py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >address</th>
                                            <th className={clsx("text-sm font-bold py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >phone</th>
                                            <th onClick={() => handleSort('orders_count')} className={clsx("text-sm font-bold py-3 cursor-default first-letter:uppercase whitespace-nowrap px-4")}
                                            ><span className='pe-1'>No. of Orders</span>
                                                {sortConfig?.key === 'orders_count' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                                            </th>
                                            <th onClick={() => handleSort('last_purchase_date')} className={clsx("text-sm font-bold py-3 first-letter:uppercase whitespace-nowrap px-4 cursor-default")}
                                            ><span className='pe-1'>last purchase date</span>
                                                {sortConfig?.key === 'last_purchase_date' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                                            </th>
                                            <th onClick={() => handleSort('total_spending')} className={clsx(" cursor-default text-sm font-bold py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            ><span className='pe-1'>Spending</span>

                                                {sortConfig?.key === 'total_spending' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                                            </th>
                                            <th className={clsx("text-sm font-bold py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >Follow Up </th>
                                            <th className={clsx("text-sm font-bold py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >Status</th>
                                            <th className="px-4 rounded-tr-lg rounded-br-lg text-sm font-bold py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedData?.map((item: any, index: number) => (
                                            <tr key={item?.id} className={clsx("border-b border-gray-200 last:border-b-0 text-sm font-medium text-dark-700", (index + 1) / 2 !== 0 ? " hover:bg-gray-10" : "")}                                    >
                                                <td>
                                                    <div className='flex items-center gap-2 ms-3'>
                                                        <RoundedBox className="relative items-center justify-center flex  my-2 !bg-gray-80 p-2 h-7 w-7 !rounded-full">
                                                            {item?.profile_picture ? <img src={item?.profile_picture} width={48} alt="image" className='w-full h-full rounded-md' /> : null}
                                                        </RoundedBox>
                                                        <span className='whitespace-nowrap'>{item?.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 whitespace-nowrap px-4 text-center">
                                                    <Link href={`mailto:${item?.email}`}>{item?.email || "No Data"}</Link>
                                                </td>
                                                <td className="py-3 whitespace-nowrap px-4 text-center">{item?.address || "No Data"}</td>
                                                <td className="py-3 whitespace-nowrap px-4 text-center">
                                                    <Link href={`tel:${item?.phone}`}>{item?.phone || "-"}</Link>
                                                </td>
                                                <td className="py-3 whitespace-nowrap px-4 text-center">
                                                    {
                                                        item?.orders_count ? <Link className='block' href={`order-detail/${item.id}`}>{item?.orders_count}</Link> : "No Data"
                                                    }</td>
                                                <td className="py-3 whitespace-nowrap px-4 text-center">{item?.last_purchase_date || "No Data"}</td>
                                                <td className="py-3 whitespace-nowrap px-4 text-center">{formatCurrency(item?.total_spending, 'en-US', 'USD') || "No Data"}</td>

                                                <td className="py-3 whitespace-nowrap px-4 text-center">
                                                    <SelectWidget
                                                        selected={followUps[item.id] || ""}
                                                        onValueChange={(value) =>
                                                            setFollowUps((prev) => ({ ...prev, [item.id]: value }))
                                                        }
                                                        placeholder={item?.follow_up_display}
                                                        options={["Yes", "No", "Upcoming"]}
                                                        classNames={{
                                                            trigger:
                                                                "!rounded-lg bg-transparent capitalize border !border-gray-70 !text-read-500 font-normal text-sm w-[120px] follow-up",
                                                            base: "rounded-none",
                                                            popoverContent: "rounded-none",
                                                        }}
                                                    />
                                                </td>

                                                <td className="py-3 whitespace-nowrap px-4 text-center">
                                                    <div className="relative w-10">
                                                        <input
                                                            type="radio"
                                                            id={`id_${item?.id}`}
                                                            name="card"
                                                            checked={item?.status_display === "Active" ? true : false}
                                                            className="sr-only peer"
                                                        />
                                                        <label
                                                            htmlFor={`id_${item?.id}`}
                                                            className={clsx("block w-full h-5 rounded-full cursor-pointer transition-colors", item?.status ? "peer-checked:bg-[#10A760]" : "bg-[#DA3E33]")}
                                                        ></label>
                                                        <span
                                                            className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 transform peer-checked:translate-x-5"
                                                        />
                                                    </div>
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


