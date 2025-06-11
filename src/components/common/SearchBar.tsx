"use client";
import React, {
    ChangeEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import clsx from "clsx";
import Icon from "./Icon";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
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
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);

    const initialValue = searchParams.get(paramName) || "";
    const [value, setValue] = useState(initialValue);

    // Debounced search handler with FRESH query params
    const debouncedSearch = useMemo(() => {
        return debounce((val: string) => {
            const params = new URLSearchParams(window.location.search);
            if (val) {
                params.set(paramName, val);
            } else {
                params.delete(paramName);
            }
            router.push(`${pathname}?${params.toString()}`);
            onChange(val);
        }, debounceTime);
    }, [pathname, router, paramName, debounceTime, onChange]);

    useEffect(() => {
        setValue(initialValue);
    }, [resetKey, initialValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);
        debouncedSearch(val);
    };

    const handleClearSearch = () => {
        setValue("");
        if (inputRef.current) {
            inputRef.current.value = "";
        }

        const params = new URLSearchParams(window.location.search);
        params.delete(paramName);
        router.push(`${pathname}?${params.toString()}`);
        onChange(null);
        debouncedSearch.cancel();
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return (
        <div className={clsx("relative flex items-center w-full", boxClass)}>
            <input
                ref={inputRef}
                key={resetKey}
                type="text"
                value={value}
                onChange={handleChange}
                className={clsx(
                    "border-0 h-12 focus:outline-none px-3 w-full bg-transparent",
                    inputClass,
                    placeholderClass
                )}
                placeholder={placeholder}
            />

            {icon && (
                <span className={iconClass}>
                    <Icon name={icon} className={clsx("ms-2", iconClass)} size={size} />
                </span>
            )}

            {value && (
                <button
                    type="button"
                    onClick={handleClearSearch}
                    className="me-2 p-1 order-4"
                >
                    <Icon name="close" size="1rem" fill="#da3e33" />
                </button>
            )}
        </div>
    );
};

export default SearchBar;




































// "use client";
// import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
// import clsx from "clsx";
// import Icon from "./Icon";
// import { usePathname, useRouter } from "next/navigation";
// import debounce from "lodash/debounce";

// interface PropsType {
//     onChange?: (value: string | undefined | null) => void;
//     icon?: string;
//     iconClass?: string;
//     boxClass?: string;
//     inputClass?: string;
//     placeholder: string;
//     placeholderClass?: string;
//     size?: string;
//     resetKey?: string;
//     paramName?: string;
//     debounceTime?: number;
// }

// const SearchBar: React.FC<PropsType> = ({
//     icon = "",
//     iconClass,
//     inputClass,
//     resetKey = "",
//     paramName = "search",
//     boxClass,
//     placeholder,
//     placeholderClass,
//     size = "1.3rem",
//     onChange = () => { },
//     debounceTime = 500,
// }) => {
//     const router = useRouter();
//     const pathName = usePathname();
//     const inputRef = useRef<HTMLInputElement>(null);
//     const [value, setValue] = useState("")

//     const debouncedSearch = useMemo(
//         () =>
//             debounce((value: string) => {
//                 const params = new URLSearchParams();
//                 setValue(value)
//                 if (value) {
//                     params.set(paramName, value);
//                 }
//                 router.push(`${pathName}?${params.toString()}`);
//                 onChange(value);
//             }, debounceTime),
//         [router, pathName, onChange, debounceTime]
//     );

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         debouncedSearch(e.target.value);
//     };

//     const handleClearSearch = () => {
//         if (inputRef.current) {
//             inputRef.current.value = "";
//         }
//         const params = new URLSearchParams();
//         router.push(`${pathName}?${params.toString()}`);
//         onChange(null);
//         setValue("")
//         debouncedSearch.cancel();
//     };

//     useEffect(() => {
//         return () => {
//             debouncedSearch.cancel();
//         };
//     }, [debouncedSearch]);

//     return (
//         <>
//             <input
//                 ref={inputRef}
//                 onInput={handleChange}
//                 key={resetKey}
//                 type="text"
//                 className={clsx(
//                     "border-0 h-12 focus:outline-none px-3 w-full bg-transparent",
//                     inputClass,
//                     placeholderClass
//                 )}
//                 placeholder={placeholder}
//                 value={value}
//             />
//             <span className={iconClass}>
//                 <Icon name={icon} className={clsx("ms-2", iconClass)} size={size} />
//             </span>
//             {value && <button
//                 className="me-2 !order-5 border border-red-500 rounded-full"
//                 onClick={handleClearSearch}
//             >
//                 <Icon name="close" size="1rem" />
//             </button>}
//         </>
//     );
// };

// export default SearchBar;
