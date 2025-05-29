"use client"
import CsvDownloader from 'react-csv-downloader';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import {
    Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
    Spinner, useDisclosure
} from "@heroui/react"

import { Button } from '@/components/common/baseButton/BaseButton'
import { TransparentButton } from '@/components/common/baseButton/TransparentButton'
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import Pagination from '@/components/common/Pagination'
import InventoryFilterModal from '@/components/common/InventoryFilters'
import AddInventoryModal from "@/components/inventory/AddInventoryModal"
import UploadFileModal from '../common/UploadFileModal'
import Notfound from '../common/Notfound'
import Icon from '../common/Icon'
import { formatCurrency } from '@/utils/formatCurrency'

import {
    useCategories,
    useStats,
    useProducts,
    useDeleteProduct,
    useUploadProducts,
    useMarkAsSold,
    useUpdateProduct
} from '@/hooks/useInventory'
import Checkbox from '../Checkbox'
import SelectWidget from '../common/SelectWidget'
import FileUploader from '../common/UploadWithDragDrop';
import { FileMetaTypes } from '@/types';

const holdTimeColors = {
    "90": "#DA3E33",
    "30": "#10A760"
}

const STOCKCOLORS: any = {
    "in_stock": "text-green-600",
    "sold": "text-red-500",
    "out_of_stock": "#DA3E33"
}

const Inventory = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { mutateAsync: updateProductMutation, isPending } = useUpdateProduct();
    const params = useSearchParams();
    const navigate = useRouter();
    const [fileMeta, setFileMeta] = useState<FileMetaTypes | null>();
    const initialPage = Number(params.get("page_number")) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const pageRef = useRef(initialPage);

    const queryString = useMemo(() => {
        const sp = new URLSearchParams(params.toString());
        sp.set('page_number', currentPage.toString());
        sp.set('page_size', '20');
        return `/?${sp.toString().replace(/\+/g, '%20')}`;
    }, [params, currentPage]);

    const [product, setProduct] = useState<any>();
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [apiLoading, setApiLoading] = useState<boolean>(false);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [selectedId, setSelectedId] = useState<any>(null);
    const downloadRef = useRef<any>(null);

    const { data: stats } = useStats();
    const { data: categoryData } = useCategories();

    const categories = categoryData?.data?.results?.map((item: any) => ({
        value: item.id,
        label: item.name,
    })) || [];

    const { data: products, isFetching } = useProducts(queryString);
    const columns = products?.data?.results?.length ? Object.keys(products?.data?.results[0]) : [];

    const { mutate: deleteProduct } = useDeleteProduct();
    const { mutate: uploadProductFile } = useUploadProducts();
    const { mutate: markAsSold } = useMarkAsSold();

    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const checkAllRef = useRef<HTMLInputElement>(null);
    const allIds = products?.data?.results?.map((row: any) => row.id) || [];

    const handleCheck = (id: number, checked: boolean) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            checked ? next.add(id) : next.delete(id);
            return next;
        });
    };

    const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(new Set(allIds));
            setIsAllChecked(true);
        } else {
            setSelectedIds(new Set());
            setIsAllChecked(false);
        }
    };

    useEffect(() => {
        if (!checkAllRef.current) return;

        if (selectedIds.size === 0) {
            checkAllRef.current.indeterminate = false;
            checkAllRef.current.checked = false;
        } else if (selectedIds.size === allIds.length) {
            checkAllRef.current.indeterminate = false;
            checkAllRef.current.checked = true;
        } else {
            checkAllRef.current.indeterminate = true;
            checkAllRef.current.checked = false;
        }
    }, [selectedIds, allIds]);

    useEffect(() => {
        if (selectedId) {
            const formData = new FormData()
            formData.append("image", fileMeta?.file)
            updateProductMutation(
                { id: selectedId, formData },
                {
                    onSuccess: () => {
                        toast.success("Image successfully updated");
                        setFileMeta(null)
                        setSelectedId(null)
                        setSelectedAction("")
                    },
                    onError: (error: any) => {
                        toast.error(
                            error?.response?.data?.errors?.product_ids || "Something went wrong"
                        );
                    },
                }
            );
        }
    }, [selectedId])

    useEffect(() => {
        if ([...selectedIds].length) {
            const selectedPro = products?.data?.results?.filter((item: any) => [...selectedIds].includes(item.id));
            setSelectedData(selectedPro);
            setIsAllChecked([...selectedIds].length === products?.data?.results?.length);
        }
    }, [selectedIds, products?.data?.results]);

    const handleDelete = (row: any) => {
        deleteProduct(row?.id, {
            onSuccess: () => toast.success("Product deleted successfully"),
            onError: () => toast.error("Product not deleted successfully"),
        });
    };

    const handleUploadFile = async (file: File) => {
        setApiLoading(true);
        const formData = new FormData();
        formData.append("excel_file", file);

        uploadProductFile(formData, {
            onSuccess: () => {
                setIsUploadModalOpen(false);
                toast.success("File uploaded successfully");
            },
            onError: (error: any) => {
                const errors = error?.response?.data;
                Object.keys(errors || {}).forEach((key) => {
                    toast.error(errors[key] || "Something went wrong");
                });
            },
            onSettled: () => {
                setApiLoading(false);
            },
        });
    };

    const handleUploadClick = () => {
        setIsUploadModalOpen(true);
    };

    const closeUploadModal = () => {
        setIsUploadModalOpen(false);
        setApiLoading(false);
    };

    const applyFilter = () => {
        pageRef.current = 1;
        setCurrentPage(1);
    };

    const handleAction = (val: string) => {
        setSelectedAction(val);
        if (val !== "Export") {
            markAsSold({ product_ids: [...selectedIds] }, {
                onSuccess: () => {
                    toast.success("Mark as sold successfully");
                    setSelectedIds(new Set());
                    setSelectedData([]);
                    setIsAllChecked(false);
                    setSelectedAction("")
                },
                onError: (error: any) => {
                    toast.error(error?.response?.data?.errors?.product_ids || "Something went wrong");
                }
            });
        } else {
            if (selectedData.length > 0 && downloadRef.current) {
                downloadRef.current.handleClick();
                setTimeout(() => {
                    setSelectedIds(new Set());
                    setSelectedData([]);
                    setIsAllChecked(false);
                    setSelectedAction("")
                }, 100);
            }
        }

    };

    useEffect(() => {
        if (!isOpen) {
            setProduct(null);
        }
    }, [isOpen]);

    // Sync page state with URL when browser back/forward is used
    useEffect(() => {
        const pageParam = Number(params.get("page_number")) || 1;
        setCurrentPage(pageParam);
    }, [params]);

    // Update the URL when currentPage changes
    useEffect(() => {
        const queryParams = new URLSearchParams(params.toString());
        if (currentPage > 1) {
            queryParams.set("page_number", currentPage.toString());
        } else {
            queryParams.delete("page_number");
        }
        navigate.push(`/inventory/?${queryParams.toString()}`);
    }, [currentPage]);


    const currencyFields = [
        "buying_price",
        "sold_price",
        "wholesale_price",
        "profit",
        "shipping_price",
        "repair_cost",
        "fees",
        "msrp",
        "website_price"
    ]

    return (
        <div>
            {(apiLoading || isFetching) && (
                <div className='fixed z-40 top-0 left-0 right-0 bottom-0 m-auto flex justify-center items-center bg-black/40'>
                    <Spinner className="" size="lg" color="white" />
                </div>
            )}

            <RoundedBox as='section' className="lg:px-4 lg:py-5 gap-3 mb-0.5 lg:!bg-white !bg-transparent">
                <Heading as="h1" className="col-span-12 pb-4">Overall Inventory</Heading>
                <div className='flex justify-between lg:flex-nowrap flex-wrap lg:gap-0 gap-y-3'>
                    <div className="lg:w-auto sm:w-[49%] w-full lg:p-0 p-4 rounded-lg grid grid-cols-1 gap-3 border-r border-gray-200 bg-white lg:pe-14 md:pe-8 pe-3">
                        <Heading>Categories</Heading>
                        <div className=' font-semibold text-base text-gray-600'>{stats?.data?.categories?.count}</div>
                        <div className=' font-semibold text-base text-gray-500'>{stats?.data?.categories?.label}</div>
                    </div>
                    <div className="lg:w-auto sm:w-[49%] w-full lg:p-0 p-4 rounded-lg grid grid-cols-1 gap-3 border-r border-gray-200 bg-white  xl:px-12 lg:px-6 md:px-4 px-3">
                        <Heading className=' text-orange-800'>Total Products</Heading>
                        <div className='grid grid-cols-2 font-semibold text-base text-gray-600'>
                            <span>{stats?.data?.total_products?.count}</span>
                            <span className="text-center">{stats?.data?.total_products?.revenue}</span>
                        </div>
                        <div className='grid grid-cols-2 gap-10 font-semibold text-base text-gray-500'>
                            <span>{stats?.data?.total_products?.label}</span>
                            <span className="text-center">Revenue</span>
                        </div>
                    </div>
                    <div className="lg:w-auto sm:w-[49%] w-full lg:p-0 p-4 rounded-lg grid grid-cols-1 gap-3 border-r border-gray-200 bg-white  xl:px-12 lg:px-6 md:px-4 px-3">
                        <Heading className=' text-pink-500'>Top Selling</Heading>
                        <div className='grid grid-cols-2 gap-10 font-semibold text-base text-gray-600'>
                            <span>{stats?.data?.top_selling?.count}</span>
                            <span className="text-center">{stats?.data?.top_selling?.cost}</span>
                        </div>
                        <div className='grid grid-cols-2 gap-10 font-semibold text-base text-gray-500'>
                            <span>{stats?.data?.top_selling?.label}</span>
                            <span className="text-center">Cost</span>
                        </div>
                    </div>
                    <div className="lg:w-auto sm:w-[49%] w-full lg:p-0 p-4 rounded-lg grid grid-cols-1 bg-white gap-3 xl:ps-12 lg:ps-6 md:ps-4 ps-3">
                        <Heading className=' text-red-700'>Low Stocks</Heading>
                        <div className='grid grid-cols-2 gap-10 font-semibold text-base text-gray-600'>
                            <span>{stats?.data?.low_stocks?.ordered}</span>
                            <span className="text-end">{stats?.data?.low_stocks?.not_in_stock}</span>
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
                    <Heading className='text-start md:w-auto w-full md:-order-1 order-1'>Products {selectedId}</Heading>
                    {[...selectedIds]?.length ? <div className='w-[140px]'>
                        <SelectWidget
                            selected={selectedAction}
                            onValueChange={(value) => handleAction(value)}
                            placeholder="Acitons"
                            options={["Export", "Mark as sold"]}
                            classNames={{
                                trigger: "!rounded-lg bg-transparent capitalize border !text-[#1C274C] !border-[#1C274C] font-normal text-sm",
                                base: "rounded-none",
                                popoverContent: "rounded-none",

                            }}
                        />
                    </div> : null}
                    <ul className='flex items-center gap-3 md:mb-0 mb-5 md:flex-nowrap flex-wrap md:w-auto w-full inventory-btns'>
                        <li className='xs:w-auto w-[48%]'><Button title='Add Product' className='h-10 ' onPress={onOpen} /></li>
                        <li className='xs:w-auto w-[48%]'><InventoryFilterModal brands={categories} onApplyFilter={applyFilter} /></li>
                        <li className='xs:w-auto w-[48%]'>
                            <Dropdown className='!rounded-lg'>
                                <DropdownTrigger>
                                    <TransparentButton title='Upload' className='h-10 !text-[#1C274C] !border-[#1C274C]' icon='upload' iconFill='#1C274C' />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
                                    <DropdownItem
                                        key="upload"
                                        className='text-gray-180 text-sm font-medium ps-1 hover:!bg-transparent hover:!border-transparent'
                                        startContent={<Icon name='upload' stroke='#acacac' />}
                                        onPress={handleUploadClick}                                   >
                                        Upload
                                    </DropdownItem>
                                    <DropdownItem
                                        key="download"
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
                    !products?.data?.results?.length && !apiLoading ? <Notfound label='No Products Found' /> :
                        <div className='pt-3'>
                            <div className=" overflow-x-auto">
                                <table className="border-collapse min-w-[1200px] w-full text-start">
                                    <thead className="bg-blue-gradient text-white">
                                        <tr>
                                            <th className="w-3 rounded-tl-lg rounded-bl-lg">
                                                <div className='w-4 ps-3'>
                                                    <Checkbox
                                                        checked={isAllChecked}
                                                        onChange={handleCheckAll}
                                                    />
                                                </div>
                                            </th>
                                            <th className="px-4 text-sm font-medium py-3">Actions</th>
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
                                            <th className="px-4 text-sm font-medium py-3 rounded-tr-lg rounded-br-lg">Availability</th>

                                        </tr>
                                    </thead>
                                    <tbody>{
                                        products?.data?.results?.map((row: any, rowIndex: number) => (
                                            <tr
                                                key={rowIndex}
                                                className="border-b border-gray-200 last:border-b-0 text-sm font-medium text-dark-700"
                                            >
                                                <td>
                                                    <div className='ps-2.5'>
                                                        <Checkbox
                                                            value={row.id}
                                                            checked={selectedIds.has(row.id)}
                                                            onChange={(e) => handleCheck(row.id, e.target.checked)}
                                                        />

                                                    </div>
                                                </td>
                                                <td className='text-center'>
                                                    <div className='flex items-center'>

                                                        <Dropdown className='!rounded-lg'>
                                                            <DropdownTrigger>
                                                                <button className='p-3'><Icon name='more' /></button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
                                                                <DropdownItem
                                                                    onPress={() => navigate.push(`inventory/${row?.id}`)}
                                                                    key="eye"
                                                                    className='text-gray-180 text-sm font-medium ps-1 hover:!bg-transparent hover:!border-transparent'
                                                                    startContent={<Icon name='filledEye' size='1.1rem' stroke='#acacac' />}>
                                                                    View
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    onPress={() => { onOpen(); setProduct(row) }}
                                                                    key="edit"
                                                                    className='text-gray-180 text-sm font-medium ps-1 hover:!bg-transparent hover:!border-transparent'
                                                                    startContent={<Icon name='edit' stroke='#acacac' />}>
                                                                    Edit
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    onPress={() => handleDelete(row)}
                                                                    key="delete"
                                                                    className='text-gray-180 text-sm font-medium hover:!bg-transparent hover:!border-transparent'
                                                                    startContent={<Icon name='trash' stroke='#acacac' />}>
                                                                    Delete
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </div>
                                                </td>
                                                <td>
                                                    <RoundedBox className="relative items-center justify-center flex  my-2 !bg-gray-80 p-2 h-14 w-14">
                                                        {row?.image ? <img src={row?.image} width={48} alt="image" className='w-full h-full rounded-md' /> :
                                                            <div className='inventory-filepicker'>
                                                                <FileUploader
                                                                    onChange={(fileData) => {
                                                                        setSelectedId(row?.id)
                                                                        setFileMeta(null)
                                                                        setFileMeta(fileData);
                                                                    }}
                                                                    presentationClass='rounded'
                                                                >
                                                                    <RoundedBox className={clsx(" ")}>

                                                                        {row?.id == selectedId ? (
                                                                            <img
                                                                                width={140}
                                                                                // @ts-ignore
                                                                                src={fileMeta?.url || fileMeta}
                                                                                alt="Selected Image"
                                                                                className="w-full h-full object-cover rounded-lg"
                                                                            />
                                                                        ) : <div>
                                                                            <Icon name='uploadImage' stroke='#acacac' />
                                                                        </div>}
                                                                    </RoundedBox>
                                                                </FileUploader></div>}
                                                    </RoundedBox>
                                                </td>


                                                {columns.map((col, colIndex) => (
                                                    col !== 'id' && col !== "image" && col !== "category" && col !== "availability" && col !== "owner" ? (
                                                        <td
                                                            key={colIndex}
                                                            className={clsx("py-5 px-4", colIndex === 0 && "w-14")}
                                                            style={
                                                                col === "hold_time"
                                                                    ? {
                                                                        color:
                                                                            row.hold_time > 90
                                                                                ? holdTimeColors["90"]
                                                                                : row.hold_time <= 90 && row?.hold_time > 30 ? "#565607" : holdTimeColors["30"]
                                                                    }
                                                                    : {}
                                                            }
                                                        >
                                                            <div className={clsx("whitespace-nowrap px-4 text-center")}>
                                                                {
                                                                    currencyFields.includes(col)
                                                                        ? row?.[col]
                                                                            ? <span className="flex items-center">{formatCurrency(row?.[col], 'en-US', 'USD')}</span>
                                                                            : "-"
                                                                        : col === "profit_margin"
                                                                            ? row?.[col] ? `${row?.[col]}%` : "-"
                                                                            : col === "hold_time"
                                                                                ? `~${row?.[col]}`
                                                                                : col === "is_sold"
                                                                                    ? <div className={clsx("min-w-5 mx-auto w-5 h-5 rounded border flex items-center justify-between", row?.is_sold ? "bg-blue-850" : "")}>
                                                                                        <Icon name='checkmark' className=' text-white text-lg' />
                                                                                    </div>
                                                                                    : row?.[col] || "-"
                                                                }
                                                            </div>
                                                        </td>
                                                    ) : null
                                                ))}


                                                <td className={clsx("first-letter:capitalize text-center", STOCKCOLORS[row.availability])}>{row?.availability?.replaceAll("_", " ")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {
                                products?.data?.count > 20 ?
                                    <Pagination
                                        totalPages={Math.ceil(products?.data?.count / 20)}
                                        currentPage={currentPage}
                                        onPageChange={(page) => {
                                            setCurrentPage(page);
                                        }}
                                    /> : null}
                        </div>}
            </RoundedBox>
            <AddInventoryModal
                options={categories}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                callBack={() => {
                    // fetchData()
                }}
                defaultData={product}
                formTitle={product ? "Update Product" : "New Product"}
            />
            <UploadFileModal isOpen={isUploadModalOpen} onOpen={closeUploadModal} callBack={handleUploadFile} isLoading={apiLoading} />

            <CsvDownloader
                ref={downloadRef}
                className="hidden"
                datas={selectedData}
                filename="inventory-data"
                extension=".csv"
                columns={columns.map(col => ({
                    id: col,
                    displayName: col
                }))}
            />
        </div >
    )
}

export default Inventory
