import React from 'react';
import Icon from '../common/Icon';
import Heading from '../common/heading';

interface ProductDetailProps {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const ProductDetail = () => {
    return (
        <div className="p-4 bg-white rounded-lg font-inter text-dark-300 font-medium">
            <div className=" mb-6 border-b">
                <div className='flex justify-between items-center font-archivo'>
                    <Heading>🕒 Franck Muller</Heading>
                    <button className="h-10 w-[86px] flex px-3 justify-between items-center border rounded-md text-sm text-gray-700 hover:bg-gray-100">
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
                                <div className='text-start flex-1 text-gray-500'>Franck Muller</div>
                            </div>

                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Product ID</div>
                                <div className=' text-start flex-1 text-gray-500'>FRA 658.0314.3.031</div>
                            </div>

                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Product category</div>
                                <div className=' text-start flex-1 text-gray-500'>Sports Watch</div>
                            </div>

                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Availability</div>
                                <div className="text-green-600 font-medium text-start flex-1 ">In-stock</div>
                            </div>

                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Impact</div>
                                <div className=' text-start flex-1 text-gray-500'>3.2%</div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-11">
                        <h3 className="font-semibold text-dark-300 mb-4">Supplier Details</h3>
                        <div className="grid grid-cols-1 gap-y-8 gap-x-4 text-sm">
                            <div className='flex items-center justify-between gap-4'>
                                <div className=' text-start flex-1 text-gray-500'>Supplier name</div>
                                <div className=' text-start flex-1 text-gray-500'>Ronald Martin</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className=' text-start flex-1 text-gray-500'>Contact Number</div>
                                <div className=' text-start flex-1 text-gray-500'>98789 86757</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right - Image & Stock Info */}
                <div className="md:min-w-[300px] sm:min-w-[250px] min-w-full xl:pe-[60px] lg:pe-10 md:pe-6 pe-4 flex sm:flex-col flex-row sm:justify-center justify-between">
                    <div className=" outline-dashed outline-1 outline-[#9D9D9D] xl:w-[170px] xl:h-[170px] lg:w-[140px] lg:h-[140px] w-[170px] h-[170px] p-2 sm:mx-auto">
                        <img src="/images/clock-2.png" alt="Watch" className=" max-w-full" />
                    </div>
                    <div className="flex flex-col sm:gap-y-8 gap-4 font-normal sm:pt-8">
                        <div className="flex items-center justify-between gap-4">
                            <span className=' text-start flex-1 text-gray-500 whitespace-nowrap'>Opening Stock</span>
                            <span className="flex-1 text-gray-500 font-medium text-end">40</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className=' text-start flex-1 text-gray-500 whitespace-nowrap'>Remaining Stock</span>
                            <span className="flex-1 text-gray-500 font-medium text-end">34</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className=' text-start flex-1 text-gray-500 whitespace-nowrap'>On the way</span>
                            <span className="flex-1 text-gray-500 font-medium text-end">15</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className=' text-start flex-1 text-gray-500 whitespace-nowrap'>Impact</span>
                            <span className="text-green-600 font-medium text-end">3.2%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stock Locations */}
            <div className="mt-8 max-w-[690px] lg:ps-11 md:ps-6 sm:ps-4 xs:ps-2">
                <h3 className="font-semibold text-dark-300 mb-4">Stock Locations</h3>
                <div className="border border-l-0 border-r-0 overflow-hidden text-sm">
                    <div className="grid grid-cols-2 bg-gray-200 text-gray-600 font-semibold px-4 py-2">
                        <div>Store Name</div>
                        <div className='text-end pe-5'>Stock in hand</div>
                    </div>
                    <div className="grid grid-cols-2 py-4 border-t">
                        <div className='text-gray-500'>Sulur Branch</div>
                        <div className="text-[#1366D9] font-medium text-end pe-10">150</div>
                    </div>
                    <div className="grid grid-cols-2 py-4 border-t">
                        <div className='text-gray-500'>Singanallur Branch</div>
                        <div className="text-[#1366D9] font-medium text-end pe-10">300</div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProductDetail;