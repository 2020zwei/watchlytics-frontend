"use client"

import React, { useEffect, useState } from 'react';
import Icon from '../common/Icon';
import Heading from '../common/heading';
import { useParams } from 'next/navigation';
import { METHODS, URLS } from '@/utils/constants';
import { RequestTypes } from '@/types';
import { sendRequest } from '@/utils/apis';
import { Spinner } from '@heroui/react';

const ProductDetail = () => {
    const { id } = useParams()
    const [product, setProduct] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const getProductDetail = async () => {
        setLoading(true)
        const PAYLOAD: RequestTypes = {
            url: `${URLS.PRODUCTS}/${id}/`,
            method: METHODS.GET,
        }
        sendRequest(PAYLOAD).then((res) => {
            if (res?.status === 200) {
                console.log(res?.data)
                setProduct(res.data)
            }
        }).finally(() => setLoading(false))
    }

    useEffect(() => { getProductDetail() }, [id])
    if (loading) {
        return <div className='text-center mt-5'><Spinner /></div>
    }
    return (
        <div className="p-4 bg-white rounded-lg font-inter text-dark-300 font-medium">
            <div className=" mb-6 border-b">
                <div className='flex justify-between items-center font-archivo'>
                    <Heading>🕒 {product?.product_name}</Heading>
                    <button className="h-10 w-[86px] flex px-3 justify-between hidden items-center border rounded-md text-sm text-gray-700 hover:bg-gray-100">
                        <span><Icon name='edit' fill='#808080' /></span>
                        <span className="text-dark-700 text-sm font-archivo font-medium">Edit</span>
                    </button>
                </div>

                <div className='pt-7'>
                    <h4 className="mt-1 text-sm text-dark-300 font-normal w-fit pb-2 relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:bg-[#1366D9] before:w-full before:h-[2px]">
                        Overview
                    </h4>

                </div>
            </div>

            {/* Primary & Stats Section */}
            <div className="flex justify-between gap-8 items-start lg:ps-11 md:ps-6 sm:ps-4 xs:ps-2 sm:flex-row flex-col-reverse">
                {/* Left - Primary & Supplier Details */}
                <div className="w-max md:min-w-[400px] sm:min-w-[300px] flex-1">
                    <div>
                        <h3 className="font-semibold text-dark-300 mb-4">Primary Details</h3>
                        <div className="grid grid-cols-1 gap-y-8 gap-x-4 text-sm">
                            <div className='flex items-center justify-between gap-4'>
                                <div className='text-start flex-1 text-gray-500'>Product name</div>
                                <div className='text-start flex-1 text-gray-500'>{product?.product_name}</div>
                            </div>

                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Reference number</div>
                                <div className=' text-start flex-1 text-gray-500'>{product?.product_id}</div>
                            </div>

                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Product category</div>
                                <div className=' text-start flex-1 text-gray-500'>{product?.category_name}</div>
                            </div>

                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Availability</div>
                                <div className="text-green-600 font-medium text-start flex-1 capitalize">{product?.availability?.replaceAll("_"," ")}</div>
                            </div>

                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Quantity</div>
                                <div className=' text-start flex-1 text-gray-500'>{product?.quantity} pieces</div>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>MSRP</div>
                                <div className=' text-start flex-1 text-gray-500'>${product?.msrp}</div>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Listed On</div>
                                <div className=' text-start flex-1 text-gray-500'>{product?.listed_on || "-"}</div>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Website Price</div>
                                <div className=' text-start flex-1 text-gray-500'>${product?.website_price || "-"}</div>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Website Price</div>
                                <div className=' text-start flex-1 text-gray-500'>${product?.website_price || "-"}</div>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Whole Price</div>
                                <div className=' text-start flex-1 text-gray-500'>${product?.whole_price || "-"}</div>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Sold Price</div>
                                <div className=' text-start flex-1 text-gray-500'>${product?.sold_price || "-"}</div>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Profit Margin</div>
                                <div className=' text-start flex-1 text-gray-500'>${product?.profit_margin || "0"}</div>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Date Purchased</div>
                                <div className=' text-start flex-1 text-gray-500'>{product?.date_purchased || "-"}</div>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Date Sold</div>
                                <div className=' text-start flex-1 text-gray-500'>{product?.date_sold || "-"}</div>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Hold Time</div>
                                <div className=' text-start flex-1 text-[#EDED25]'>~{product?.hold_time || "-"}</div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-11">
                        <h3 className="font-semibold text-dark-300 mb-4">Supplier Details</h3>
                        <div className="grid grid-cols-1 gap-y-8 gap-x-4 text-sm">
                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Buying Price</div>
                                <div className=' text-start flex-1 text-gray-500'>{product?.buying_price || "-"}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className=' text-start flex-1 text-gray-500'>Shipping Price</div>
                                <div className=' text-start flex-1 text-gray-500'>{product?.shipping_price || "-"}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className=' text-start flex-1 text-gray-500'>Repair Cost</div>
                                <div className=' text-start flex-1 text-gray-500'>{product?.repair_cost || "-"}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className=' text-start flex-1 text-gray-500'>Fees</div>
                                <div className=' text-start flex-1 text-gray-500'>{product?.fees || "-"}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className=' text-start flex-1 text-gray-500'>Commission</div>
                                <div className=' text-start flex-1 text-gray-500'>{product?.commission || "-"}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className=' text-start flex-1 text-gray-500'>Purchased From</div>
                                <div className=' text-start flex-1 text-gray-500'>{product?.purchased_from || "-"}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className=' text-start flex-1 text-gray-500'>Source of Sale</div>
                                <div className=' text-start flex-1 text-gray-500'>{product?.source_of_sale || "-"}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className=' text-start flex-1 text-gray-500'>Sold Source</div>
                                <div className=' text-start flex-1 text-gray-500'>{product?.sold_source || "-"}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right - Image & Stock Info */}
                <div className="md:min-w-[300px] sm:min-w-[250px] min-w-full xl:pe-[60px] lg:pe-10 md:pe-6 pe-4 flex sm:flex-col flex-row sm:justify-center justify-between">
                    <div className=" flex justify-center items-center outline-dashed outline-1 outline-[#9D9D9D] xl:w-[170px] xl:h-[170px] lg:w-[140px] lg:h-[140px] w-[170px] h-[170px] p-2 sm:mx-auto">
                        <img src={product?.image} alt="Watch" className=" max-w-full rounded" />
                    </div>
                    <div className=" flex-col sm:gap-y-8 gap-4 font-normal sm:pt-8 hidden">
                        <div className="flex items-center justify-between gap-4">
                            <span className=' text-start flex-1 text-gray-500 whitespace-nowrap'>Opening Stock</span>
                            <span className="flex-1 text-gray-500 font-medium text-end">{product?.product_name}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className=' text-start flex-1 text-gray-500 whitespace-nowrap'>Remaining Stock</span>
                            <span className="flex-1 text-gray-500 font-medium text-end">{product?.product_name}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className=' text-start flex-1 text-gray-500 whitespace-nowrap'>On the way</span>
                            <span className="flex-1 text-gray-500 font-medium text-end">{product?.product_name}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className=' text-start flex-1 text-gray-500 whitespace-nowrap'>Impact</span>
                            <span className="text-green-600 font-medium text-end">{product?.product_name}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stock Locations */}
            <div className="mt-8 max-w-[690px] lg:ps-11 md:ps-6 sm:ps-4 xs:ps-2 hidden">
                <h3 className="font-semibold text-dark-300 mb-4">Stock Locations</h3>
                <div className="border border-l-0 border-r-0 overflow-hidden text-sm">
                    <div className="grid grid-cols-2 bg-gray-200 text-gray-600 font-semibold px-4 py-2">
                        <div>Store Name</div>
                        <div className='text-end pe-5'>Stock in hand</div>
                    </div>
                    <div className="grid grid-cols-2 py-4 border-t">
                        <div className='text-gray-500'>Sulur Branch</div>
                        <div className="text-[#1366D9] font-medium text-end pe-10">{product?.product_name}</div>
                    </div>
                    <div className="grid grid-cols-2 py-4 border-t">
                        <div className='text-gray-500'>Singanallur Branch</div>
                        <div className="text-[#1366D9] font-medium text-end pe-10">{product?.product_name}</div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProductDetail;