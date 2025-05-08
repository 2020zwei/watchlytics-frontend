"use client"
import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import RoundedBox from "./baseButton/RoundedBox";
import Heading from "./heading";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import SelectWidget from "./SelectWidget";
import { RequestTypes } from "@/types";
import { sendRequest } from "@/utils/apis";
import { METHODS, URLS } from "@/utils/constants";


const lineData = [
    { month: "Sep 2024", sales: 125000, purchase: 100000 },
    { month: "Sep 2024", sales: 95000, purchase: 125000 },
    { month: "Sep 2024", sales: 115000, purchase: 115000 },
    { month: "Sep 2024", sales: 90000, purchase: 140000 },
    { month: "Sep 2024", sales: 110000, purchase: 115000 },
    { month: "Sep 2024", sales: 87000, purchase: 135000 },]

const pieData = [
    { name: "Target", value: 25, color: "#1F79B5" },
    { name: "Income", value: 40, color: "#E0E0E0" },
    { name: "Pending", value: 35, color: "#0D3C61" },
];

export default function ExpenseTrackingChart() {
    const [categories, setCategories] = useState<string[]>([]);
    const fetchCategories = async () => {
        const PAYLOAD: RequestTypes = {
            url: `${URLS.PRODUCTS}/`,
            method: METHODS.GET,
        };
        sendRequest(PAYLOAD).then((res) => {
            if (res.status === 200) {
                const options = res?.data?.results?.map((item: any) => item.product_name);
                setCategories(options);
            }
        });
    };

    useEffect(() => {
        fetchCategories()
    }, [])
    return (
        <>
            <RoundedBox className="p-4 pb-5">
                <Heading>Stock Tracking</Heading>
                <div className=" grid md:grid-cols-4 xs:grid-cols-2 grid-cols-1 mt-6 gap-3">
                    <div className=" rounded-lg bg-white shadow-lg p-4 border-blue-700 border-t-2">
                        <div className="text-lg font-medium pb-3 text-blue-700">Manage in Stock</div>
                        <select name="" id="" className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none">
                            <option value="868" className="">868</option>
                        </select>
                    </div>
                    <div className=" rounded-lg bg-white shadow-lg p-4 border-t-2 border-red-600">
                        <div className="text-lg font-medium pb-3 text-red-600">Sold</div>
                        <div className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none flex items-center gap-1">
                            <span className="text-gray-180">$</span>
                            <span>1.5M</span>
                        </div>
                    </div>
                    <div className=" rounded-lg bg-white shadow-lg p-4 border-t-2 border-orange-600">
                        <div className="text-lg font-medium pb-3 text-orange-600">Pending Sale</div>
                        <select name="" id="" className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none">
                            <option value="868" className="">102</option>
                        </select>
                    </div>
                    <div className=" rounded-lg bg-white shadow-lg p-4 border-t-2 border-green-600">
                        <div className="text-lg font-medium pb-3 text-green-600">Total Orders</div>
                        <div className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none flex items-center gap-1">
                            150
                        </div>
                    </div>
                </div>
            </RoundedBox>
            <div className="flex gap-4 mt-6 md:flex-row flex-col">
                <RoundedBox className="flex-1 py-4 h-[430px] pe-5">
                    <div className="px-4 pb-3 flex items-center justify-between">
                        <div>
                            <Heading>Expense Tracking</Heading>
                            <div className="text-sm font-semibold text-dark-800">Payments</div>
                        </div>
                        <div className="flex gap-4 text-sm font-medium">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-[#EB2F96]" />
                                <span>Sales</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-[#52C41A]" />
                                <span>Purchase</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineData} margin={{ top: 10, right: 0, left: 0, bottom: 90 }}>
                            <CartesianGrid vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="month"  tick={{ fontSize: 12 }} padding={{ right: 10, left: 30 }} tickMargin={40} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={['dataMin - 10000', 'dataMax']} />
                            <Tooltip formatter={(value:any) => new Intl.NumberFormat().format(value)} />
                            <Line type="monotone" dataKey="sales" stroke="#EB2F96" dot={{ r: 3 }} strokeWidth={2} />
                            <Line type="monotone" dataKey="purchase" stroke="#52C41A" dot={{ r: 3 }} strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </RoundedBox>
                <RoundedBox className="pt-5 px-4 max-h-[430px] lg:w-[270px] flex flex-col justify-between pb-4">
                    <Heading>Income</Heading>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart margin={{ top: 0 }}>
                            <Pie
                                data={pieData}
                                innerRadius={40}
                                outerRadius={70}
                                paddingAngle={0}
                                cornerRadius={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-between w-full text-sm border-t pt-10 border-[#AEAEAE80]">
                        {pieData.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-1">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: entry.color }}
                                ></div>
                                <span>{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </RoundedBox>
            </div>
            <RoundedBox className="mt-5">
                <div className="flex items-center sm:justify-between justify-start px-5 sm:flex-row flex-col py-5">
                    <div className='sm:w-auto w-full'>
                        <Heading>Market Comparison</Heading>
                    </div>
                    <div className="flex items-center sm:mb-0 mb-5 sm:mt-0 mt-3 sm:w-auto w-full xs:flex-row flex-col gap-3">
                        <div className='sm:min-w-[320px] w-full flex items-center border rounded-lg placeholder: flex-1 ps-3 border-[#F0F1F3] font-normal'>
                            <SearchBar placeholder='Rolex Submariner 114060' icon='search'
                                inputClass='order-1 bg-transparent !h-10'
                                placeholderClass='placeholder:text-[#858D9D] placeholder:text-xs'
                            />
                        </div>
                        <div className="xs:w-[167px] w-full">
                            <SelectWidget
                                options={categories}
                                classNames={{
                                    trigger: "!rounded-lg bg-transparent border !border-gray-[#F0F1F3] text-[#858D9D] font-normal text-sm",
                                    base: "rounded-none",
                                    popoverContent: "rounded-none",

                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className=''>
                    <table className='w-full'>
                        <thead className='h-12'>
                            <tr className='text-white text-sm font-medium bg-blue-gradient'>
                                <th className='text-start ps-4 first:rounded-s-lg  overflow-hidden'>
                                    Image
                                </th>
                                <th className='text-start ps-4 overflow-hidden'>
                                    Buying Price
                                </th>
                                <th className='text-start ps-4 overflow-hidden'>
                                    ebay
                                </th>
                                <th className='text-start ps-4 overflow-hidden'>
                                    Chrono24
                                </th>
                                <th className='text-start ps-4 overflow-hidden'>
                                    Bezel
                                </th>
                                <th className='text-end pe-4 last:rounded-e-lg overflow-hidden'>
                                    Grailzee
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                                <td className=' text-start py-3 px-4'>Value</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="px-4 pb-5">
                    <Pagination
                        totalPages={34}
                        currentPage={2}
                        onPageChange={(page) => { }}
                    />
                </div>
            </RoundedBox>
        </>
    );
}
