"use client";

import React from "react";
import Icon from "./Icon";

interface DropdownOption {
    value: string;
    label: string;
    icon?: string;
}

interface DropdownMenuProps {
    open?: boolean;
    options?: DropdownOption[];
    onSelect?: (value: string) => void;
    ulClass?: string;
    liClass?: string;
    containerClass?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    open = false,
    options = [],
    onSelect,
    ulClass = "",
    liClass = "",
    containerClass = "",
}) => {
    if (!open) return null;

    return (
        <div
            className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 ${containerClass}`}
        >
            <ul className={`py-2 ${ulClass}`}>
                {options.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => onSelect(item.value)}
                        className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 ${liClass}`}
                    >
                        {item.icon && <Icon name={item.icon} className="w-4 h-4 text-gray-600" />}
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DropdownMenu;
