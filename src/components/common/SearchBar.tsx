"use client";
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Icon from "./Icon";
import { usePathname, useRouter } from "next/navigation";
import debounce from "lodash/debounce";

interface PropsType {
    onChange?: (value: string | undefined | null) => void;
    icon?: string;
    iconClass?: string;
    boxClass?: string;
    inputClass?: string;
    placeholder: string;
    placeholderClass?: string;
    size?: string;
    resetKey?: string;
    paramName?: string;
    debounceTime?: number;
}

const SearchBar: React.FC<PropsType> = ({
    icon = "",
    iconClass,
    inputClass,
    resetKey = "",
    paramName = "search",
    boxClass,
    placeholder,
    placeholderClass,
    size = "1.3rem",
    onChange = () => { },
    debounceTime = 500,
}) => {
    const router = useRouter();
    const pathName = usePathname();
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState("")

    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                const params = new URLSearchParams();
                setValue(value)
                if (value) {
                    params.set(paramName, value);
                }
                router.push(`${pathName}?${params.toString()}`);
                onChange(value);
            }, debounceTime),
        [router, pathName, onChange, debounceTime]
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value);
    };

    const handleClearSearch = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        const params = new URLSearchParams();
        router.push(`${pathName}?${params.toString()}`);
        onChange(null);
        setValue("")
        debouncedSearch.cancel();
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return (
        <>
            <input
                ref={inputRef}
                onInput={handleChange}
                key={resetKey}
                type="text"
                className={clsx(
                    "border-0 h-12 focus:outline-none px-3 w-full bg-transparent",
                    inputClass,
                    placeholderClass
                )}
                placeholder={placeholder}
            />
            <span className={iconClass}>
                <Icon name={icon} className={clsx("ms-2", iconClass)} size={size} />
            </span>
            {value && <button
                className="me-2 !order-5 border border-red-500 rounded-full"
                onClick={handleClearSearch}
            >
                <Icon name="close" size="1rem" />
            </button>}
        </>
    );
};

export default SearchBar;
