"use client";

import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { TransparentButton } from "./baseButton/TransparentButton";
import clsx from "clsx";
import React from "react";
import Icon from "./Icon";
import { DROPDWONOPTION } from "@/types";
interface InventoryFilterModalTypes {
    brands: { value: string, label: string }
}

const InventoryFilterModal: React.FC<InventoryFilterModalTypes> = ({ brands }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const staetDateRef = React.useRef<HTMLInputElement>(null);
    const endDateRef = React.useRef<HTMLInputElement>(null);

    const openStartDatePicker = () => {
        staetDateRef.current?.showPicker();
    };
    const openEndDatePicker = () => {
        endDateRef.current?.showPicker();
    };
    const handleBrand = (item: DROPDWONOPTION) => {
        console.log(item)
    }
    return (
        <>
            <TransparentButton onPress={onOpen} title='Filters' className='h-10' icon='filter' />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent className="max-w-[750px] px-4">
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-xl font-medium text-dark-800 px-0">
                                <div className=" border-b w-full pb-2 border-gray-80">Filters</div>
                            </ModalHeader>
                            <ModalBody className="max-h-[calc(100vh-200px)] gap-6 overflow-y-auto px-0">
                                {/* Brand Section */}
                                <div>
                                    <h2 className="text-blue-850 font-normal">Brand</h2>
                                    <div className="flex flex-wrap gap-4 text-dark-800 font-normal text-sm">
                                        {
                                            brands?.map((brand: DROPDWONOPTION) => (
                                                <label className="flex items-center gap-2">
                                                    <input onChange={() => handleBrand(brand)} type="checkbox" className="text-dark-800 font-normal text-sm border-gray-70" />
                                                    {brand.label}
                                                </label>
                                            ))
                                        }
                                    </div>
                                </div>

                                {/* Date Range Section */}
                                <div>
                                    <h2 className="text-blue-850 font-normal mb-2">Date Range</h2>
                                    <div className="flex items-center gap-5">
                                        <div className="max-w-[240px] flex-1" onClick={openStartDatePicker}>
                                            <label className="block text-dark-800 font-normal text-sm mb-1">Date Purchased</label>
                                            <div className="flex items-center justify-between relative">
                                                <input ref={staetDateRef} type="date" className={clsx("border rounded-lg px-3 py-2 w-full text-gray-180 text-xs border-gray-70")} />
                                                <span className=" absolute right-3 bg-white"><Icon name="calender" /></span>
                                            </div>
                                        </div>
                                        <div className="max-w-[240px] flex-1" onClick={openEndDatePicker}>
                                            <label className="block mb-1 text-dark-800 font-normal text-sm">Date Sold</label>
                                            <div className="flex items-center justify-between relative">
                                                <input ref={endDateRef} type="date" className={clsx("border rounded-lg px-3 py-2 w-full text-gray-180 text-xs border-gray-70")} />
                                                <span className=" absolute right-3 bg-white"><Icon name="calender" /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Watch Condition */}
                                <div>
                                    <h2 className="text-blue-850 font-normal mb-2">Watch Condition</h2>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 text-dark-800 font-normal text-sm">
                                            <input type="radio" name="condition" />
                                            New
                                        </label>
                                        <label className="flex items-center gap-2 text-dark-800 font-normal text-sm">
                                            <input type="radio" name="condition" />
                                            Used
                                        </label>
                                    </div>
                                </div>

                                {/* Buyer Details */}
                                <div className="max-w-[240px]">
                                    <h2 className="text-blue-850 font-normal mb-2">Buyer Details</h2>
                                    <input type="text" placeholder="Enter buyer name" className="border placeholder:text-gray-180 placeholder:text-xs rounded-lg px-3 h-[36px] w-full border-gray-70" />
                                </div>

                                {/* Seller Details */}
                                <div className="max-w-[240px]">
                                    <h2 className="text-blue-850 font-normal mb-2">Seller Details</h2>
                                    <input type="text" placeholder="Enter seller name" className=" border placeholder:text-gray-180 placeholder:text-xs rounded-lg px-3 w-full h-[36px] border-gray-70" />
                                </div>
                            </ModalBody>

                            <ModalFooter className="flex gap-4">
                                <Button color="primary" onPress={onClose}>
                                    Add
                                </Button>
                                <Button color="default" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default InventoryFilterModal

