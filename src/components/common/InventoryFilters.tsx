"use client";

import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { TransparentButton } from "./baseButton/TransparentButton";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Icon from "./Icon";
import { DROPDWONOPTION } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

interface InventoryFilterModalTypes {
    brands: { value: string, label: string }[];
}

const InventoryFilterModal: React.FC<InventoryFilterModalTypes> = ({ brands }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();
    const searchParams = useSearchParams();

    const staetDateRef = React.useRef<HTMLInputElement>(null);
    const endDateRef = React.useRef<HTMLInputElement>(null);

    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [condition, setCondition] = useState<string | null>(null);
    const [buyer, setBuyer] = useState<string | null>(null);
    const [seller, setSeller] = useState<string | null>(null);

    const openStartDatePicker = () => {
        staetDateRef.current?.showPicker();
    };
    const openEndDatePicker = () => {
        endDateRef.current?.showPicker();
    };

    // Function to update search params with new filters
    const updateFilters = (newFilters: { [key: string]: string }) => {
        const currentParams = new URLSearchParams(searchParams.toString());

        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) {
                currentParams.set(key, value);  // Use set to update the value or add a new one
            } else {
                currentParams.delete(key);  // Remove the filter if the value is empty or cleared
            }
        });

        router.push(`/inventory?${currentParams.toString()}`);
    };

    // Handle checkbox change for brands (multiple selection)
    const handleBrandFilter = (label: string, checked: boolean) => {
        const currentFilters = new URLSearchParams(searchParams.toString());
        if (checked) {
            currentFilters.append("brand", label);  // Add brand filter
        } else {
            const values = currentFilters.getAll("brand");
            const filteredValues = values.filter((value) => value !== label);  // Remove brand filter
            currentFilters.delete("brand");
            filteredValues.forEach((value) => currentFilters.append("brand", value));
        }
        router.push(`/inventory?${currentFilters.toString()}`);
    };

    const handleFilter = (item: DROPDWONOPTION) => {
        const filters = { [item.value]: item.label };
        updateFilters(filters);
    };

    // Handle filter changes for date, buyer, and seller
    const handleDateFilter = (field: string, value: string) => {
        updateFilters({ [field]: value });
        if (field === "start_date") setStartDate(value);
        if (field === "end_date") setEndDate(value);
    };

    const handleTextFilter = (field: string, value: string) => {
        updateFilters({ [field]: value });
        if (field === "buyer") setBuyer(value);
        if (field === "seller") setSeller(value);
    };

    const handleConditionFilter = (value: string) => {
        updateFilters({ condition: value });
        setCondition(value);
    };

    useEffect(() => {
        const currentParams = new URLSearchParams(searchParams.toString());
        setSelectedBrands(currentParams.getAll("brand"));
        setStartDate(currentParams.get("start_date") || null);
        setEndDate(currentParams.get("end_date") || null);
        setCondition(currentParams.get("condition") || null);
        setBuyer(currentParams.get("buyer") || null);
        setSeller(currentParams.get("seller") || null);
    }, [searchParams]);

    // Reset all filters when the user clicks "Cancel"
    const resetFilters = () => {
        const currentParams = new URLSearchParams();
        router.push(`/inventory?${currentParams.toString()}`);
    };

    return (
        <>
            <TransparentButton onPress={onOpen} title="Filters" className="h-10 " icon="filter" />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent className="max-w-[750px] px-4">
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-xl font-medium text-dark-800 px-0">
                                <div className="border-b w-full pb-2 border-gray-80">Filters</div>
                            </ModalHeader>
                            <ModalBody className="max-h-[calc(100vh-200px)] gap-6 overflow-y-auto px-0">
                                {/* Brand Section */}
                                <div>
                                    <h2 className="text-blue-850 font-normal">Brand</h2>
                                    <div className="flex flex-wrap gap-4 text-dark-800 font-normal text-sm">
                                        {brands?.map((brand: DROPDWONOPTION) => (
                                            <label className="flex items-center gap-2" key={brand.value}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBrands.includes(brand.label)}
                                                    onChange={(e) => handleBrandFilter(brand.label, e.target.checked)}
                                                    className="text-dark-800 font-normal text-sm border-gray-70"
                                                />
                                                {brand.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Date Range Section */}
                                <div>
                                    <h2 className="text-blue-850 font-normal mb-2">Date Range</h2>
                                    <div className="flex items-center gap-5">
                                        <div className="max-w-[240px] flex-1" onClick={openStartDatePicker}>
                                            <label className="block text-dark-800 font-normal text-sm mb-1">Date Purchased</label>
                                            <div className="flex items-center justify-between relative">
                                                <input
                                                    ref={staetDateRef}
                                                    type="date"
                                                    className={clsx("border rounded-lg px-3 py-2 w-full text-gray-180 text-xs border-gray-70")}
                                                    value={startDate || ""}
                                                    onChange={(e) => handleDateFilter("start_date", e.target.value)}
                                                />
                                                <span className="absolute right-3 bg-white"><Icon name="calender" /></span>
                                            </div>
                                        </div>
                                        <div className="max-w-[240px] flex-1" onClick={openEndDatePicker}>
                                            <label className="block mb-1 text-dark-800 font-normal text-sm">Date Sold</label>
                                            <div className="flex items-center justify-between relative">
                                                <input
                                                    ref={endDateRef}
                                                    type="date"
                                                    className={clsx("border rounded-lg px-3 py-2 w-full text-gray-180 text-xs border-gray-70")}
                                                    value={endDate || ""}
                                                    onChange={(e) => handleDateFilter("end_date", e.target.value)}
                                                />
                                                <span className="absolute right-3 bg-white"><Icon name="calender" /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Watch Condition */}
                                <div>
                                    <h2 className="text-blue-850 font-normal mb-2">Watch Condition</h2>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 text-dark-800 font-normal text-sm">
                                            <input
                                                type="radio"
                                                name="condition"
                                                checked={condition === "new"}
                                                onChange={() => handleConditionFilter("new")}
                                            />
                                            New
                                        </label>
                                        <label className="flex items-center gap-2 text-dark-800 font-normal text-sm">
                                            <input
                                                type="radio"
                                                name="condition"
                                                checked={condition === "used"}
                                                onChange={() => handleConditionFilter("used")}
                                            />
                                            Used
                                        </label>
                                    </div>
                                </div>

                                {/* Buyer Details */}
                                <div className="max-w-[240px]">
                                    <h2 className="text-blue-850 font-normal mb-2">Buyer Details</h2>
                                    <input
                                        type="text"
                                        placeholder="Enter buyer name"
                                        value={buyer || ""}
                                        className="border placeholder:text-gray-180 placeholder:text-xs rounded-lg px-3 h-[36px] w-full border-gray-70"
                                        onChange={(e) => handleTextFilter("buyer", e.target.value)}
                                    />
                                </div>

                                {/* Seller Details */}
                                <div className="max-w-[240px]">
                                    <h2 className="text-blue-850 font-normal mb-2">Seller Details</h2>
                                    <input
                                        type="text"
                                        placeholder="Enter seller name"
                                        value={seller || ""}
                                        className="border placeholder:text-gray-180 placeholder:text-xs rounded-lg px-3 w-full h-[36px] border-gray-70"
                                        onChange={(e) => handleTextFilter("seller", e.target.value)}
                                    />
                                </div>
                            </ModalBody>

                            <ModalFooter className="flex gap-4">
                                <Button color="primary" onPress={onClose}>
                                    Add
                                </Button>
                                <Button color="default" variant="flat" onPress={() => { resetFilters(); onClose(); }}>
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

export default InventoryFilterModal;
