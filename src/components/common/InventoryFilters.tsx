"use client";

import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react";
import { TransparentButton } from "./baseButton/TransparentButton";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Icon from "./Icon";
import { DROPDWONOPTION } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

interface InventoryFilterModalTypes {
    brands: { value: string; label: string }[];
    onApplyFilter?: (value: any) => void
}

const InventoryFilterModal: React.FC<InventoryFilterModalTypes> = ({
    brands, onApplyFilter = () => { }
}) => {
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

    const handleBrandFilter = (label: string, checked: boolean) => {
        if (checked) {
            setSelectedBrands((prev) => [...prev, label]);
        } else {
            setSelectedBrands((prev) => prev.filter((item) => item !== label));
        }
    };

    const handleDateFilter = (field: string, value: string) => {
        if (field === "start_date") setStartDate(value);
        if (field === "end_date") setEndDate(value);
    };

    const handleTextFilter = (field: string, value: string) => {
        if (field === "buyer") setBuyer(value);
        if (field === "seller") setSeller(value);
    };

    const handleConditionFilter = (value: string) => {
        setCondition(value);
    };

    const applyFilters = () => {
        const params = new URLSearchParams();
        selectedBrands.forEach((brand) => params.append("brand", brand));
        if (startDate) params.set("start_date", startDate);
        if (endDate) params.set("end_date", endDate);
        if (condition) params.set("condition", condition);
        if (buyer) params.set("buyer", buyer);
        if (seller) params.set("seller", seller);
        onApplyFilter(params)
        router.push(`/inventory?${params.toString()}`);
    };

    const resetFilters = () => {
        setSelectedBrands([]);
        setStartDate(null);
        setEndDate(null);
        setCondition(null);
        setBuyer(null);
        setSeller(null);
        router.push("/inventory");
    };
    const clearFilter = () => {
        setSelectedBrands([]);
        setStartDate(null);
        setEndDate(null);
        setCondition(null);
        setBuyer(null);
        setSeller(null);

        // Clear URL params
        router.push("/inventory");
    };

    const hasActiveFilters = () => {
        return (
            selectedBrands.length > 0 ||
            startDate !== null ||
            endDate !== null ||
            condition !== null ||
            buyer !== null ||
            seller !== null
        );
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
    useEffect(() => {
        hasActiveFilters(); // not necessary unless you're tracking this separately
    }, [selectedBrands, startDate, endDate, condition, buyer, seller]);



    return (
        <>
            <div className="flex items-center gap-3">
                {hasActiveFilters() && (
                    <Button
                        title="Clear"
                        variant="bordered"
                        className="bg-transparent h-10 border-1 !text-[#1C274C] !border-[#1C274C]"
                        onPress={clearFilter}
                    >
                        Clear
                    </Button>
                )}
                <button
                    onClick={onOpen}
                    className="border rounded-lg p-0 bg-transparent h-[38px] px-2.5 border-[#003bff]"
                ><Icon name='keef' fill='#003bff' size="1.5rem"/></button>
            </div>


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
                                            <label
                                                className="flex items-center gap-2"
                                                key={brand.value}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBrands.includes(brand.label)}
                                                    onChange={(e) =>
                                                        handleBrandFilter(brand.label, e.target.checked)
                                                    }
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
                                        <div
                                            className="max-w-[240px] flex-1"
                                            onClick={openStartDatePicker}
                                        >
                                            <label className="block text-dark-800 font-normal text-sm mb-1">
                                                Date Purchased
                                            </label>
                                            <div className="flex items-center justify-between relative">
                                                <input
                                                    ref={staetDateRef}
                                                    type="date"
                                                    className={clsx(
                                                        "border rounded-lg px-3 h-9 w-full text-gray-180 text-xs border-gray-70"
                                                        , startDate ? "!text-dark-800 !text-base" : "text-gray-180"
                                                    )}
                                                    value={startDate || ""}
                                                    onChange={(e) =>
                                                        handleDateFilter("start_date", e.target.value)
                                                    }
                                                    max={endDate || undefined}
                                                />
                                                <span className="absolute right-3 bg-white">
                                                    <Icon name="calender" />
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="max-w-[240px] flex-1"
                                            onClick={openEndDatePicker}
                                        >
                                            <label className="block mb-1 text-dark-800 font-normal text-sm">
                                                Date Sold
                                            </label>
                                            <div className="flex items-center justify-between relative">
                                                <input
                                                    ref={endDateRef}
                                                    type="date"
                                                    className={clsx(
                                                        "border rounded-lg px-3 h-9 w-full  text-xs border-gray-70"
                                                        , endDate ? "!text-dark-800 !text-base" : "text-gray-180"
                                                    )}
                                                    value={endDate || ""}
                                                    onChange={(e) =>
                                                        handleDateFilter("end_date", e.target.value)
                                                    }
                                                    min={startDate || undefined}
                                                />
                                                <span className="absolute right-3 bg-white">
                                                    <Icon name="calender" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Watch Condition */}
                                <div>
                                    <h2 className="text-blue-850 font-normal mb-2">
                                        Watch Condition
                                    </h2>
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

                                {/* Buyer */}
                                <div className="max-w-[240px]">
                                    <h2 className="text-blue-850 font-normal mb-2">
                                        Buyer Details
                                    </h2>
                                    <input
                                        type="text"
                                        placeholder="Enter buyer name"
                                        value={buyer || ""}
                                        className="border placeholder:text-gray-180 placeholder:text-xs rounded-lg px-3 h-[36px] w-full border-gray-70"
                                        onChange={(e) => handleTextFilter("buyer", e.target.value)}
                                    />
                                </div>

                                {/* Seller */}
                                <div className="max-w-[240px]">
                                    <h2 className="text-blue-850 font-normal mb-2">
                                        Seller Details
                                    </h2>
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
                                <Button
                                    className="bg-blue-gradient text-white rounded-lg h-10 w-[107px]"
                                    onPress={() => {
                                        applyFilters();
                                        onClose();
                                    }}
                                    isDisabled={((startDate && !endDate) || (startDate! > endDate!)) ? true : false}
                                >
                                    Apply
                                </Button>
                                <Button
                                    color="default"
                                    className=" bg-transparent rounded-lg border border-gray-70 text-gray-180 w-[107px]"
                                    variant="flat"
                                    onPress={() => {
                                        resetFilters();
                                        onClose();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default InventoryFilterModal;
