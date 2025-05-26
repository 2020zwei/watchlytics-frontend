"use client"

import { useState } from "react";
import {
    Select,
    SelectItem,
    Selection,
    SelectProps,
} from "@heroui/react";

interface SelectWidgetProps
    extends Omit<SelectProps<object>, "children" | "onSelectionChange" | "selectedKeys"> {
    placeholder?: string;
    selected?: string;
    options?: string[];
    onValueChange?: (key: string) => void;
}

export default function SelectWidget({
    placeholder = "Select an option",
    selected: externalSelected,
    onValueChange,
    options = [],
    ...rest
}: SelectWidgetProps) {
    const [internalSelected, setInternalSelected] = useState<string>("");
    const selectedValue = externalSelected ?? internalSelected;
    const handleSelectionChange = (keys: Selection) => {
        const selectedKey: any = typeof keys === "string" ? keys : Array.from(keys)[0];
        setInternalSelected(selectedKey)
        onValueChange?.(selectedKey);
    };

    return (
        <Select
            placeholder={placeholder}
            aria-label={placeholder}
            selectedKeys={selectedValue ? [selectedValue] : []}
            onSelectionChange={handleSelectionChange}
            {...rest}
        >
            {options.map((option) => (
                <SelectItem key={option} textValue={option}>
                    {option}
                </SelectItem>
            ))}
        </Select>
    );
}
