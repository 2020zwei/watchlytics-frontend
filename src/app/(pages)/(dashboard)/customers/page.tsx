"use client"
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from "@heroui/react";
import Pagination from '@/components/common/Pagination'
import Link from 'next/link'
import { sendRequest } from '@/utils/apis'
import { URLS } from '@/utils/constants'
import SelectWidget from '@/components/common/SelectWidget'
import Icon from '@/components/common/Icon'
import AddNoteModalWidget from '@/components/common/AddNoteModalWidget'
import Notfound from '@/components/common/Notfound'

const buttons: any = {
    "status": ["Active", "Inactive"],
    "Spending": ["Spending", "Spending"],
    "No. of Orders": ["1-5", "6-10", "11-20", "21+"],
    "Newsletter": ["Subscribed", "Unsubscribed"],
    "Follow Up": ["Yes", "No"],
}


const page = () => {
    const [status, setStatus] = useState("Active");
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const closeUploadModal = () => {
        setIsUploadModalOpen(false);
    };
    const [customers, setCustomers] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const getCustomers = () => {
        setLoading(true)
        sendRequest({ url: URLS.CUSTOMERS }).then((res) => {
            console.log(res)
            setCustomers(res?.data)
        }).finally(() => {
            setLoading(false)
        });
    }
    useEffect(() => { getCustomers() }, [])
    if (loading) {
        return <div className='text-center mt-5'><Spinner /></div>
    }
    return (
        <div>
            <RoundedBox as='section' className="px-4 py-5 gap-3 mt-5">
                <div className='flex items-center justify-between md:flex-row flex-col'>
                    <Heading className='text-start md:w-auto w-full md:-order-1 order-1'>Customers Property</Heading>
                    <ul className='flex items-center gap-2 md:mb-0 mb-5 md:flex-nowrap flex-wrap md:w-auto w-full inventory-btns'>

                        {Object.keys(buttons).map((key: string, index: number) => {
                            return (
                                <li key={index} className={`min-w-[103px] filter-option${index}`}>
                                    <SelectWidget
                                        onChange={(value) => { }}
                                        placeholder={key}
                                        options={buttons[key]}
                                        classNames={{
                                            trigger: "!rounded-lg bg-transparent border !border-gray-70 text-dark-700 font-normal text-sm",
                                            base: "rounded-none",
                                            popoverContent: "rounded-none",

                                        }}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                    <Link href="/customers/add" className='bg-blue-gradient text-white rounded-lg text-sm h-10 w-[128px] ms-1 flex items-center justify-center'>Add Customer</Link>
                </div>
                {/* <Notfound label='No Products Found' />  */}
                <div className='pt-3'>
                    {!customers?.results?.length ? <Notfound /> :
                        <>
                            <div className=" overflow-x-auto">
                                <table className="border-collapse min-w-[1200px] w-full text-start">
                                    <thead className="bg-blue-gradient text-white">
                                        <tr>
                                            <th className={clsx("text-sm font-medium py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >Name </th>
                                            <th className={clsx("text-sm font-medium py-3 first-letter:uppercase whitespace-nowrap px-4")}
                                            >No. of Orders </th>
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
                                        <tr className="border-b border-gray-200 last:border-b-0 text-sm font-medium text-dark-700"                                    >
                                            <td>
                                                <div className='flex items-center gap-2'>
                                                    <RoundedBox className="relative items-center justify-center flex  my-2 !bg-gray-80 p-2 h-7 w-7 !rounded-full">
                                                        {/* <img src="" width={48} alt="image" className='w-full h-full rounded-md' /> */}
                                                    </RoundedBox>
                                                    <span>Carter Press</span>
                                                </div>
                                            </td>
                                            <td className="py-5 whitespace-nowrap px-4 text-center">7</td>
                                            <td className="py-5 whitespace-nowrap px-4 text-center">$97</td>
                                            <td className="py-5 whitespace-nowrap px-4 text-center">Yes</td>
                                            <td className="py-5 whitespace-nowrap px-4 text-center">
                                                <button className={clsx("border border-[#10A760] text-[#10A760] rounded-lg h-8 w-[72px] hover:opacity-50")}>Active</button>
                                            </td>
                                            <td className='text-center'>
                                                <Dropdown className='!rounded-lg'>
                                                    <DropdownTrigger>
                                                        <button className='p-3'><Icon name='more' /></button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
                                                        <DropdownItem
                                                            onPress={() => { setIsUploadModalOpen(true) }}
                                                            key="Add Notes"
                                                            className='text-gray-180 text-sm font-medium ps-1 hover:!bg-transparent hover:!border-transparent'
                                                            startContent={<Icon name='notes' stroke='#acacac' />}>
                                                            Add Notes
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            onPress={() => { }}
                                                            key="new"
                                                            className='text-gray-180 text-sm font-medium ps-1 hover:!bg-transparent hover:!border-transparent'
                                                            startContent={<Icon name='edit' stroke='#acacac' />}>
                                                            Edit
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            onPress={() => { }}
                                                            key="new"
                                                            className='text-gray-180 text-sm font-medium hover:!bg-transparent hover:!border-transparent'
                                                            startContent={<Icon name='trash' stroke='#acacac' />}>
                                                            Delete
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200 last:border-b-0 text-sm font-medium text-dark-700"                                    >
                                            <td>
                                                <div className='flex items-center gap-2'>
                                                    <RoundedBox className="relative items-center justify-center flex  my-2 !bg-gray-80 p-2 h-7 w-7 !rounded-full">
                                                        {/* <img src="" width={48} alt="image" className='w-full h-full rounded-md' /> */}
                                                    </RoundedBox>
                                                    <span>Carter Press</span>
                                                </div>
                                            </td>
                                            <td className="py-5 whitespace-nowrap px-4 text-center">7</td>
                                            <td className="py-5 whitespace-nowrap px-4 text-center">$97</td>
                                            <td className="py-5 whitespace-nowrap px-4 text-center">Yes</td>
                                            <td className="py-5 whitespace-nowrap px-4 text-center">
                                                <button className={clsx("border border-[#E22C69] text-[#E22C69] rounded-lg h-8 w-[72px] hover:opacity-50")}>Inactive</button>
                                            </td>
                                            <td className='text-center'>
                                                <Dropdown className='!rounded-lg'>
                                                    <DropdownTrigger>
                                                        <button className='p-3'><Icon name='more' /></button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
                                                        <DropdownItem
                                                            onPress={() => { }}
                                                            key="new"
                                                            className='text-gray-180 text-sm font-medium ps-1 hover:!bg-transparent hover:!border-transparent'
                                                            startContent={<Icon name='edit' stroke='#acacac' />}>
                                                            Edit
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            onPress={() => { }}
                                                            key="new"
                                                            className='text-gray-180 text-sm font-medium hover:!bg-transparent hover:!border-transparent'
                                                            startContent={<Icon name='trash' stroke='#acacac' />}>
                                                            Delete
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                totalPages={34}
                                currentPage={1}
                                onPageChange={(page) => { }}
                            />
                        </>
                    }
                </div>
            </RoundedBox>
            <AddNoteModalWidget isOpen={isUploadModalOpen} onOpen={closeUploadModal} />
        </div >
    )
}


export default page


