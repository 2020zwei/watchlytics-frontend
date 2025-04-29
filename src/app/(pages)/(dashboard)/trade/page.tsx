import RoundedBox from '@/components/common/baseButton/RoundedBox'
import Heading from '@/components/common/heading'
import Icon from '@/components/common/Icon'
import TradingModal from '@/components/common/TradingModal'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <RoundedBox>
            <div className='flex items-center justify-between px-5 pt-7 pb-3'>
                <Heading>All Trades</Heading>
                <Link href="/add-trading"
                    className="h-10 px-3 text-sm font-medium flex items-center justify-between text-white rounded-lg bg-blue-gradient"
                >Add Trade Details</Link>
            </div>
            <div className=''>
                <table className='w-full'>
                    <thead className='h-12'>
                        <tr className='text-white text-sm font-medium bg-blue-gradient'>
                            <th className='text-start ps-4 first:rounded-s-lg  overflow-hidden'>
                                Name Of Trade
                            </th>
                            <th className='text-end pe-4 last:rounded-e-lg overflow-hidden'>
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                            <td className=' text-start py-3 px-4'>Trade 1</td>
                            <td className='text-end py-3 px-4'>
                                <div className='flex items-center justify-end gap-3 text-[#808080]'>
                                    <button><Icon name='edit' size='1.7rem' /></button>
                                    <TradingModal modalTile="Trade 1" data={[]} />
                                </div>
                            </td>
                        </tr>
                        <tr className=' border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                            <td className=' text-start py-3 px-4'>Trade 1</td>
                            <td className='text-end py-3 px-4'>
                                <div className='flex items-center justify-end gap-3 text-[#808080]'>
                                    <button><Icon name='edit' size='1.7rem' /></button>
                                    <TradingModal modalTile="Trade 1" data={[]} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </RoundedBox>
    )
}

export default page
