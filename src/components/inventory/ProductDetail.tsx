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
        <div className="p-4 bg-white rounded-lg shadow-sm font-inter text-dark-300 font-medium">
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
            <div className="grid grid-cols-12 md:grid-cols-3 gap-6">
                {/* Left - Primary & Supplier Details */}
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h3 className="font-semibold text-dark-300 mb-2">Primary Details</h3>
                        <div className="grid grid-cols-1 gap-4 text-sm">
                            <div className='col-span-7 flex items-center justify-between'>
                                <div>Product name</div>
                                <div>Franck Muller</div>
                            </div>

                            <div>
                                <div className="text-gray-500">Product ID</div>
                                <div className="text-gray-900">FRA 658.0314.3.031</div>
                            </div>
                            <div>
                                <div className="text-gray-500">Product category</div>
                                <div className="text-gray-900">Sports Watch</div>
                            </div>
                            <div>
                                <div className="text-gray-500">Availability</div>
                                <div className="text-green-600 font-medium">In-stock</div>
                            </div>
                            <div>
                                <div className="text-gray-500">Impact</div>
                                <div className="text-gray-900">3.2%</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-dark-300 mb-2">Supplier Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-gray-500">Supplier name</div>
                                <div className="text-gray-900">Ronald Martin</div>
                            </div>
                            <div>
                                <div className="text-gray-500">Contact Number</div>
                                <div className="text-gray-900">98789 86757</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right - Image & Stock Info */}
                <div className="space-y-4">
                    <div className=" outline-dashed outline-1 outline-[#9D9D9D] xl:w-[170px] xl:h-[170px] lg:w-[140px] lg:h-[140px] sm:w-[120px] sm:h-[120px] p-2 mx-auto">
                        <img src="/images/clock-2.png" alt="Watch" className=" max-w-full" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Opening Stock</span>
                            <span className="text-gray-900">40</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Remaining Stock</span>
                            <span className="text-gray-900">34</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">On the way</span>
                            <span className="text-gray-900">15</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Impact</span>
                            <span className="text-green-600 font-semibold">3.2%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stock Locations */}
            <div className="mt-8">
                <h3 className="font-semibold text-dark-300 mb-2">Stock Locations</h3>
                <div className="border rounded-lg overflow-hidden text-sm">
                    <div className="grid grid-cols-2 bg-gray-100 text-gray-600 font-medium px-4 py-2">
                        <div>Store Name</div>
                        <div>Stock in hand</div>
                    </div>
                    <div className="grid grid-cols-2 px-4 py-2 border-t">
                        <div>Sulur Branch</div>
                        <div className="text-blue-600 font-semibold">150</div>
                    </div>
                    <div className="grid grid-cols-2 px-4 py-2 border-t">
                        <div>Singanallur Branch</div>
                        <div className="text-blue-600 font-semibold">300</div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProductDetail;