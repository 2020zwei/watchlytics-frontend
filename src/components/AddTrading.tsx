"use client"
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import Icon from '@/components/common/Icon';
import { CATEGORES, DROPDWONOPTION, RequestTypes } from '@/types';
import { sendRequest } from '@/utils/apis';
import { METHODS, URLS } from '@/utils/constants';
import { Button } from '@heroui/react';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

const AddTrading = () => {
    const [categories, setCategories] = useState<DROPDWONOPTION[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [quantities, setQuantities] = useState(Array(4).fill(1));
    const [product, setProduct] = useState<any>();
    const id = useSearchParams().get('id')
    const [date, setDate] = useState<any>()
    const dateRef = React.useRef<HTMLInputElement>(null);

    const fetchCategories = async () => {
        const PAYLOAD: RequestTypes = {
            url: `${URLS.PRODUCTS}/`,
            method: METHODS.GET,
        }
        sendRequest(PAYLOAD).then((res) => {
            if (res.status === 200) {
                const options = res?.data?.results?.map((item: any) => ({ value: item.id, label: item.product_name }))
                setProducts(res?.data?.results)
                setCategories(options)
            }
        })
    }

    const handleIncrement = (index: number) => {
        setQuantities((prev) => {
            const newQuantities = [...prev];
            newQuantities[index] += 1;
            return newQuantities;
        });
    };

    const handleDecrement = (index: number) => {
        setQuantities((prev) => {
            const newQuantities = [...prev];
            if (newQuantities[index] > 0) newQuantities[index] -= 1;
            return newQuantities;
        });
    };

    const handleAddProduct = (item: any) => {
        const result = products.find(el => el.id === item.value)
        console.log(result)
        setProduct(result)
    }

    useEffect(() => {
        fetchCategories()
    }, [])
    return (
        <RoundedBox>
            <div className='flex items-center justify-between px-4 pt-7 pb-3 border-b border-[#F0F1F3]'>
                <Heading>Add Trade Details</Heading>
            </div>
            <form >
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
                                options={categories}
                                onChange={(item) => handleAddProduct(item)}
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
                    {product ?
                        <div className='flex'>
                            {/* {JSON.stringify(product)} */}
                            <div className='sm:min-w-[140px] min-w-[130px] text-sm font-medium text-dark-700'>Quantity:</div>
                            <div className='w-full flex flex-col gap-3'>
                                <div className="flex items-center justify-between w-full max-w-[320px]">
                                    <div className="flex items-center gap-3 text-dark-800 font-normal text-sm">
                                        <div className="w-8 h-8 rounded py-1 bg-[#f9f9f9]">
                                            <img src={product?.image} alt="" className="w-full h-full rounded" />
                                        </div>
                                        <span>{product?.product_name}</span>
                                    </div>
                                    <div className="w-[77px] max-w-[77px] flex items-center justify-between px-2 h-7 rounded-3xl border border-[#F0F1F3]">
                                        <button
                                            className="text-[#ACACAC] text-lg"
                                            onClick={() => handleIncrement(1)}
                                        >
                                            +
                                        </button>
                                        <span className="font-poppins">{quantities[1]}</span>
                                        <button
                                            className="text-[#ACACAC] text-lg"
                                            onClick={() => handleDecrement(1)}
                                        >
                                            -
                                        </button>
                                    </div>
                                    <div className="font-medium">
                                        <span>$</span>{quantities[1] * product?.buying_price}
                                    </div>
                                </div>
                            </div>
                        </div> : null}
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
                                    options={categories}
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
                <div className=' flex gap-3 px-4 py-5 border-t border-[#F0F1F3]'>
                    <Button
                        type="submit"
                        className="h-10 bg-blue-gradient text-white"
                    >Add</Button>
                    <Button
                        type="button"
                        className="h-10 border bg-transparent"
                    >Cancel</Button>
                </div>
            </form>
        </RoundedBox>
    )
}

export default AddTrading
