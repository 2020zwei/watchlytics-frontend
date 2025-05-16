"use client"
import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import Icon from '@/components/common/Icon';
import { DROPDWONOPTION, RequestTypes } from '@/types';
import { sendRequest } from '@/utils/apis';
import { METHODS, URLS } from '@/utils/constants';
import { Button } from '@heroui/react';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Select from 'react-select'
import { Controller } from "react-hook-form";


import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/dateFormater';

export const TradeFormSchema = z.object({
    name_of_trade: z.string().min(1, "Trade name is required"),
    transaction_type: z.string().min(1, "Transaction type is required"),
    date: z.preprocess(
        (val) => (typeof val === "string" ? new Date(val) : val),
        z.date({ required_error: "Date is required" })
    ),
    purchase_price: z.number().min(0, "Purchase price must be 0 or more"),
    sale_price: z.number().min(0, "Sale price must be 0 or more"),
    product: z
        .array(z.any())
        .min(1, "At least one transaction item is required"),
    customer: z.string().optional(),
});


export type TradeFormValues = z.infer<typeof TradeFormSchema>;


const AddTrading = () => {
    const [categories, setCategories] = useState<DROPDWONOPTION[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [quantities, setQuantities] = useState<any[]>([]);
    const [product, setProduct] = useState<any[]>([]);
    const id = useSearchParams().get('id');
    const dateRef = React.useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false)
    const [originalQty, setOriginalQty] = useState(0)
    const navigate = useRouter()
    const {
        register,
        control,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors, isValid, isDirty },
        reset,
    } = useForm<TradeFormValues>({

        // @ts-ignore
        resolver: zodResolver(TradeFormSchema),
        defaultValues: {
            name_of_trade: '',
            transaction_type: 'sale',
            date: undefined,
            purchase_price: 0,
            sale_price: 0,
            product: [],
            customer: '',
        },
        mode: "onChange",
    });

    const fetchCategories = async () => {
        const PAYLOAD: RequestTypes = {
            url: `${URLS.PRODUCTS}/?is_transaction=${true}/`,
            method: METHODS.GET,
        };
        sendRequest(PAYLOAD).then((res) => {
            if (res.status === 200) {
                const options = res?.data?.results?.map((item: any) => ({
                    value: item.id,
                    label: item.model_name,
                }));
                setProducts(res?.data?.results);
                setCategories(options);
            }
        });
    };

    const fetchTradeById = async () => {
        if (!id) return;
        const PAYLOAD: RequestTypes = {
            url: `${URLS.TRANSACTIONS}${id}/`,
            method: METHODS.GET,
        };
        sendRequest(PAYLOAD).then((res) => {
            if (res.status === 200) {
                const data = res.data;
                reset({
                    name_of_trade: data.name_of_trade || '',
                    transaction_type: data.transaction_type || '',
                    purchase_price: Number(data?.purchase_price) || 0,
                    sale_price: Number(data.total_sale_price) || 0,
                    customer: data.customer || '',
                    product: data.product || [],
                    date: data.date
                });
                const selectedProducts = data?.items.map((el: any) => ({
                    id: el?.product,
                    image: el?.product_details?.image,
                    model_name: el?.product_details?.model_name,
                    sold_price: Number(el?.sale_price),
                    buying_price: Number(el?.purchase_price),
                    quantity: Number(el?.quantity),
                }));
                const selectedOptions = selectedProducts.map((p: any) => ({
                    label: p.model_name,
                    value: p.id,
                }));

                setValue('product', selectedOptions);
                handleAddProduct(selectedOptions);
                selectedProducts?.forEach((item: any) => setQuantities(Array(selectedProducts?.length).fill(item?.quantity)))
                setProduct(selectedProducts);
                trigger();

            }
        });
    };

    const handleIncrement = (index: number, item: any) => {
        const matched = products.find((el) => el.id === item.id);
        const copyMatched = JSON.stringify(matched)
        setOriginalQty((prev) => {
            if (!prev) {
                return JSON.parse(copyMatched).quantity
            }
            else {
                return prev
            }
        })



        if (!matched) {
            toast.error(`Product ${item.name || item.id} not found in available stock!`);
            return;
        }

        const currentProduct = product.find((el) => el.id === item.id);

        if (!currentProduct) {
            toast.error(`Selected product ${item.name || item.id} not found!`);
            return;
        }

        if (!id) { matched["quantity"] = matched["quantity"] - 1 }
        if (matched.quantity == 0) {
            toast.info(`Only ${matched.quantity} units available`);
            return;
        }
        if (id) { matched["quantity"] = matched["quantity"] - 1 }
        const updatedProducts = product.map(el =>
            el.id === item.id ? { ...el, quantity: el.quantity + 1 } : el
        );
        setProduct(updatedProducts);
    };


    const handleDecrement = (index: number, item: any) => {
        const matched = products.find((el) => el.id === item.id);
        matched['quantity'] = matched['quantity'] + 1
        const updatedProducts = product.map(el => el.id === item.id ? { ...el, quantity: el.quantity - 1 } : el)
        setProduct(updatedProducts)
    };

    const handleAddProduct = (items: any[]) => {
        const selectedIds = items.map((item) => item.value);

        const updated = selectedIds.map((id) => {
            const existing = product.find((p) => p.id === id);
            const prod = products.find((p) => p.id === id);

            return existing || {
                id: prod.id,
                image: prod.image,
                model_name: prod?.model_name,
                sold_price: prod?.sold_price || 0,
                buying_price: prod?.buying_price || 0,
                quantity: 1,
            };
        });

        setProduct(updated);
    };


    const onSubmit = (data: TradeFormValues) => {
        setLoading(true)
        const products = product?.map((item, index) => ({
            "product": item.id,
            "quantity": item?.quantity,
            "purchase_price": item.buying_price * item?.quantity,
            "sale_price": item.sold_price || "0",
        }));
        const PAYLOAD: RequestTypes = {
            url: id ? `${URLS.TRANSACTIONS}${id}/` : URLS.TRANSACTIONS,
            method: id ? METHODS.PATCH : METHODS.POST,
            payload: { ...data, "date": formatDate(data?.date), transaction_items: products }
        };

        delete PAYLOAD?.payload?.product
        sendRequest(PAYLOAD).then((res) => {
            if (res.status === 201 || res.status === 200) {
                toast.success(`Trade successfully ${id ? "updated" : "created"}`)
                navigate.push("/transaction")
            }
            if (res.status === 400) {
                res?.response?.data?.details?.non_field_errors.forEach((error: string) => {
                    toast.error(error || "Something went wrong")
                })
            }

        }).finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (id && products?.length) {
            fetchTradeById();
        }
    }, [id, products]);

    useEffect(() => {
        const sumOfPurchesPrice = product.reduce((acc, curr) => acc + Number(curr.buying_price * curr?.quantity || 0), 0);
        const sumOfSalePrice = product.reduce((acc, curr) => acc + Number(curr.sold_price || 0), 0);
        setValue('purchase_price', sumOfPurchesPrice);
        setValue("sale_price", sumOfSalePrice);
    }, [quantities, product])

    return (
        <RoundedBox>
            <div className='flex items-center justify-between px-4 pt-7 pb-3 border-b border-[#F0F1F3]'>
                <Heading>{id ? 'Edit' : 'Add'} Transaction Details</Heading>
            </div>
            {/* @ts-ignore */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='pt-5 px-4 pb-8 flex flex-col gap-3'>

                    {/* Name of Trade */}
                    <div className='flex items-center'>
                        <label className='min-w-[160px] text-sm font-medium text-dark-700'>Name Of Transaction:</label>
                        <div className="flex-1 max-w-[320px]">
                            <input
                                {...register("name_of_trade")}
                                type="text"
                                placeholder='Name Of Transaction'
                                className='w-full outline-none font-normal border text-sm placeholder:text-gray-180 rounded-lg px-3 h-[34px] border-gray-70 text-dark-800'
                            />
                            {errors.name_of_trade && <p className="text-red-500 text-xs mt-1">{errors.name_of_trade.message}</p>}
                        </div>
                    </div>

                    {/* Product Select */}
                    <div className='flex items-center'>
                        <label className='min-w-[160px] text-sm font-medium text-dark-700'>Add Watches:</label>
                        <div className='flex items-center relative flex-1'>
                            <span className='start-2 z-10 absolute'><Icon name='search' size='1.3rem' /></span>
                            <Controller
                                // @ts-ignore
                                name="product"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        isMulti
                                        {...field}
                                        options={categories}
                                        placeholder="Add Watches"
                                        isSearchable
                                        classNamePrefix="searchbale-select"
                                        styles={{ container: (base) => ({ ...base, width: "100%", maxWidth: "320px" }) }}
                                        onChange={(item: any) => {
                                            field.onChange(item);
                                            handleAddProduct(item);
                                        }}
                                        value={field.value || []}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Quantity Block */}
                    {product.length ? (
                        <div className='flex'>
                            <div className='min-w-[160px] text-sm font-medium text-dark-700'>Quantity:</div>
                            <div className='w-full flex flex-col gap-3'>
                                {product.map((item, i) => (
                                    <div key={item?.id} className=" flex items-center justify-between w-full max-w-[320px]">
                                        <div className="flex items-center gap-3 text-dark-800 font-normal text-sm">
                                            <div className="w-8 h-8 rounded py-1 bg-[#f9f9f9]">
                                                <img src={item?.image} alt="" className="w-full h-full rounded" />
                                            </div>
                                            <span>{item?.model_name}</span>
                                        </div>
                                        <div className="w-[77px] flex items-center justify-between px-2 h-7 rounded-3xl border border-[#F0F1F3]">
                                            <button disabled={item?.quantity < 2} type="button" onClick={() => handleDecrement(i, item)} className="text-[#ACACAC] text-lg">-</button>
                                            <span className="font-poppins">{item?.quantity}</span>
                                            <button type="button" onClick={() => handleIncrement(i, item)} className="text-[#ACACAC] text-lg">+</button>
                                        </div>
                                        <div className="font-medium"><span>$</span>{item?.quantity * item?.buying_price}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {/* Date Input */}
                    <div className='flex items-center'>
                        <label className='min-w-[160px] text-sm font-medium text-dark-700'>Transaction Date:</label>
                        <div className="flex-1 max-w-[320px] relative">
                            <Controller
                                name="date"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <input
                                            ref={(el) => {
                                                field.ref(el);
                                                dateRef.current = el;
                                            }}
                                            onClick={() => dateRef.current?.showPicker()}
                                            type="date"
                                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            className={clsx(
                                                'w-full outline-none font-normal border text-sm rounded-lg px-3 h-[34px] border-gray-70 text-dark-800',
                                                field.value ? '' : 'text-gray-180'
                                            )}
                                            placeholder="Transaction Date"
                                        />
                                        <span onClick={() => dateRef.current?.showPicker()} className="absolute right-3 top-[6px] bg-white">
                                            <Icon name="calender" />
                                        </span>
                                    </>
                                )}
                            />

                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                        </div>
                    </div>

                    {/* Purchase Price */}
                    <div className='flex items-center'>
                        <label className='min-w-[160px] text-sm font-medium text-dark-700'>Purchase Price:</label>
                        <div className="flex-1 max-w-[320px]">
                            <input {...register("purchase_price", { valueAsNumber: true })} type="number"
                                className='w-full outline-none font-normal border text-sm rounded-lg px-3 h-[34px] border-gray-70 text-dark-800' />
                            {errors.purchase_price && <p className="text-red-500 text-xs mt-1">{errors.purchase_price.message}</p>}
                        </div>
                    </div>

                    {/* Sale Price */}
                    <div className='flex items-center'>
                        <label className='min-w-[160px] text-sm font-medium text-dark-700'>Sale Price:</label>
                        <div className="flex-1 max-w-[320px]">
                            <input {...register("sale_price", { valueAsNumber: true })} type="number"
                                className='w-full outline-none font-normal border text-sm rounded-lg px-3 h-[34px] border-gray-70 text-dark-800' />
                            {errors.sale_price && <p className="text-red-500 text-xs mt-1">{errors.sale_price.message}</p>}
                        </div>
                    </div>

                    {/* Buyer Info */}
                    <div className='border-t border-[#F0F1F3] mt-1'>
                        <h4 className='font-semibold text-dark-800 my-4'>Buyer Details</h4>
                        <div className='flex items-center'>
                            <label className='min-w-[160px] text-sm font-medium text-dark-700'>Name:</label>
                            <div className='flex items-center relative flex-1 pointer-events-none opacity-50'>
                                <span className='start-2 z-10 absolute'><Icon name='search' size='1.3rem' /></span>
                                <Controller
                                    name="customer"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            options={categories}
                                            onChange={(item) => field.onChange(item?.value)}
                                            value={categories.find((opt) => opt.value === field.value) || null}
                                            placeholder="Buyer Name"
                                            classNamePrefix="searchbale-select"
                                            isSearchable
                                            styles={{ container: (base) => ({ ...base, width: '100%', maxWidth: "320px" }) }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className='flex gap-3 px-4 py-5 border-t border-[#F0F1F3]'>
                    <Button type="submit" className="h-10 bg-blue-gradient text-white"
                        isDisabled={!isValid}
                        isLoading={loading}
                    >
                        {id ? "Update" : "Add"}
                    </Button>
                    <Button onPress={() => navigate.back()} type="button" className="h-10 border bg-transparent">
                        Cancel
                    </Button>
                </div>
            </form>
        </RoundedBox>
    );
};

export default AddTrading;
