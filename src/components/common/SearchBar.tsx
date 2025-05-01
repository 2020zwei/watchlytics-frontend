"use client"
import React, { ChangeEvent } from "react"
import clsx from "clsx";
import Icon from "./Icon";
import { usePathname, useRouter } from "next/navigation";

interface PropsType {
    onChange?: (value: string | undefined | null) => void;
    icon?: string,
    iconClass?: string,
    boxClass?: string,
    inputClass?: string,
    placeholder: string,
    placeholderClass?: string,
    size?: string,
    resetKey?: string,
}
const SearchBar: React.FC<PropsType> = ({ icon = "", iconClass, inputClass, resetKey = "", boxClass, placeholder, placeholderClass, size = "1.3rem", onChange = () => { } }) => {
    const router = useRouter();
    const pathName = usePathname();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const params = new URLSearchParams();
        if (value) {
            params.set("search", value);
        }
        router.push(`${pathName}?${params.toString()}`);
    };

    return (
        <>
            <input onInput={handleChange} key={resetKey} type="text" className={clsx("border-0 h-12 focus:outline-none px-3 w-full", inputClass, placeholderClass)} placeholder={placeholder} />
            <span className={iconClass}><Icon name={icon} className={clsx("ms-2", iconClass)} size={size} /></span>
        </>
    )
}

export default SearchBar
