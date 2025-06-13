"use client"

import RoundedBox from "@/components/common/baseButton/RoundedBox";
import Heading from "@/components/common/heading";
import Icon from "@/components/common/Icon";
import LoaderWidget from "@/components/common/LoaderWidget";
import Notfound from "@/components/common/Notfound";
import { useCustomerOrders } from "@/hooks/useCustomerHooks";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateToYMD } from "@/utils/formatDateToYMD";

export default function UserDetailPage({ params }: { params: { id: number } }) {
    const { data, isLoading } = useCustomerOrders(params.id!)
    if (isLoading) {
        return <LoaderWidget />
    }
    console.log(data)
    return (
        <div>
            <RoundedBox className='pb-4 order'>
                <Heading className='p-3'>Customer orders</Heading>
                <div className=" overflow-x-auto">
                    {
                        data?.data?.orders?.length ?
                            <table className='w-full min-w-[1200px]'>
                                <thead className='h-12'>
                                    <tr className='text-white text-sm font-medium bg-blue-gradient'>
                                        <th className='capitalize whitespace-nowrap text-start ps-4 first:rounded-s-lg  overflow-hidden'>
                                            Customer name
                                        </th>
                                        <th className='text-center capitalize whitespace-nowrap px-4'>items count</th>
                                        <th className='text-center capitalize whitespace-nowrap px-4'>name of trade</th>
                                        <th className='text-center capitalize whitespace-nowrap px-4'>profit</th>
                                        <th className='text-center capitalize whitespace-nowrap px-4'>purchase price</th>
                                        <th className='text-center capitalize whitespace-nowrap px-4 last:rounded-e-lg overflow-hidden'>sale category</th>
                                        <th className='text-center capitalize whitespace-nowrap px-4 last:rounded-e-lg overflow-hidden'>sale price</th>
                                        <th className='text-center capitalize whitespace-nowrap px-4 last:rounded-e-lg overflow-hidden'>total purchase price</th>
                                        <th className='text-center capitalize whitespace-nowrap px-4 last:rounded-e-lg overflow-hidden'>total sale price</th>
                                        <th className='text-center capitalize whitespace-nowrap px-4 last:rounded-e-lg overflow-hidden'>transaction type</th>
                                        <th className='text-center capitalize whitespace-nowrap px-4 last:rounded-e-lg overflow-hidden'>created at</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data?.data?.orders?.map((order: any) => (
                                        <tr key={order?.id} className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                                            <td className=' text-start whitespace-nowrap py-3 px-4'>{order?.customer_name ?? "No Data"}</td>
                                            <td className="text-center px-4 whitespace-nowrap">{order?.items_count ?? "No Data"}</td>
                                            <td className="text-center px-4 whitespace-nowrap">{order?.name_of_trade ?? "No Data"}</td>
                                            <td className="text-center px-4 whitespace-nowrap">{order?.profit ? formatCurrency(order?.profit, 'en-US', 'USD') : "No Data"}</td>
                                            <td className="text-center px-4 whitespace-nowrap">{order?.purchase_price ? formatCurrency(order?.purchase_price, 'en-US', 'USD') : "No Data"}</td>
                                            <td className="text-center px-4 whitespace-nowrap">{order?.sale_category ?? "No Data"}</td>
                                            <td>{order?.sale_price ? formatCurrency(order?.sale_price, 'en-US', 'USD') : "No Data"}</td>
                                            <td className="text-center px-4 whitespace-nowrap" >{order?.total_purchase_price ? formatCurrency(order?.total_purchase_price, 'en-US', 'USD') : "No Data"}</td>
                                            <td className="text-center px-4 whitespace-nowrap">{order?.total_sale_price ? formatCurrency(order?.total_sale_price, 'en-US', 'USD') : "No Data"}</td>
                                            <td className="text-center px-4 whitespace-nowrap">{order?.transaction_type ?? "No Data"}</td>
                                            <td className="text-center px-4 whitespace-nowrap">{formatDateToYMD(order?.created_at)?? "No Data"}</td>
                                        </tr>))}
                                </tbody>
                            </table>
                            : <Notfound label='Reports not found' />
                    }
                </div>
            </RoundedBox>
        </div>
    )
}
