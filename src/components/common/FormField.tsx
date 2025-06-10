import { Controller } from "react-hook-form";
import clsx from "clsx";
import Icon from "./Icon";
import { useRef } from "react";

interface StyleProps {
    containerClass?: string,
    inputClass?: string,
    placeholderClass?: string,
    labelClass?: string,
    inputContainer?: string,
    icon?: string,
    iconPosition?: "left" | "right",
    stroke?: string,
    formName?: string,
    fill?: string,
    iconClass?: ""
    iconSize?: string,
    isDisabled?: boolean,
    onPasswordToggle?: (value: string) => void
}
interface Option {
    label: string;
    value: string | number;
}

interface FormFieldProps extends StyleProps {
    label: string;
    name: string;
    control: any;
    placeholder: string;
    errors: any;
    type?: string;
    fieldType?: "input" | "textarea" | "select" | string;
    options?: Option[];
    min?: any,
    max?: any,
    isSearch?: boolean,
    field?: any,

}

const FormField: React.FC<FormFieldProps> = ({
    label,
    name,
    control,
    placeholder,
    errors,
    type = "text",
    fieldType = "input",
    containerClass = "flex items-start xl:gap-11 lg:gap-x-8",
    inputClass = "",
    labelClass = "",
    inputContainer = "flex-1",
    iconPosition = "right",
    icon = "",
    stroke = "",
    formName = "",
    iconClass = "",
    fill = "#48505e",
    iconSize = "1.2rem",
    onPasswordToggle = () => { },
    options = [],
    isDisabled = false,
    placeholderClass = "",
    isSearch = false,
    field,
    ...rest
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div className={clsx("", containerClass)} id={name}>
            <label htmlFor={name} className={clsx("min-w-[130px] text-base font-medium text-dark-300 pt-3 flex items-center gap-x-1",
                errors[name] && errors[name] && "text-red-800", labelClass
            )}>
                {label} {name === "client_id" && <Icon name="exclamation" size="1.2rem" />}
                {field?.required && <sup><Icon name="star" fill="red" size="0.5rem" /></sup>}
            </label>
            
            <div className={inputContainer}>
                <div className={clsx("relative flex items-center", type === "checkbox" ? "gap-2" : "justify-between")}
                >
                    <Controller
                        name={name}
                        control={control}
                        defaultValue=""
                        render={({ field }) => {
                            switch (fieldType) {
                                case "textarea":
                                    return (
                                        <textarea
                                            {...field}
                                            placeholder={placeholder}
                                            className={clsx(
                                                "text-base focus-within:outline-blue-500 text-dark-300 placeholder:text-gray-170 border border-gray-70 shadow-md rounded-lg px-3 py-2 w-full min-h-[100px]",
                                                errors[name] && errors[name] ? "border-red-800" : field.value ? "border-green-600" : ""
                                            )}
                                        />
                                    );
                                case "select":
                                    return (
                                        <div className="flex items-center relative w-full">
                                            <select
                                                {...field}
                                                className={clsx(
                                                    "text-base focus-within:outline-blue-500 text-dark-300 border appearance-none border-gray-70 shadow-md rounded-lg px-3 min-h-11 w-full", inputClass,
                                                    errors[name] && errors[name] ? "border-red-800" : field.value ? "border-green-600" : !field.value ? `text-gray-170 ${placeholderClass}` : ""
                                                )}
                                            >
                                                <option value="" className={clsx("text-gray-170")} disabled>{placeholder}</option>
                                                {options.map((opt) => (
                                                    <option key={opt.value} value={opt.value} className="text-dark-300">
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className=" absolute right-2"><Icon name="caret" fill="#d9d9d9" /></span>
                                        </div>
                                    );
                                default:
                                    return (
                                        <>
                                            {type === "checkbox" ? (
                                                <input
                                                    type="checkbox"
                                                    checked={field.value}
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                    ref={field.ref}
                                                    disabled={isDisabled}
                                                    {...rest}
                                                    className={clsx(
                                                        "text-base focus-within:outline-blue-500 text-dark-300 placeholder:text-gray-170 border border-gray-70",
                                                        inputClass,
                                                        errors[name] ? "border-red-800" : field.value ? "border-green-600" : "",
                                                        "w-5 h-5"
                                                    )}
                                                />
                                            ) : (
                                                <>
                                                    {isSearch && (
                                                        <span className="absolute start-3 bg-white">
                                                            <Icon name="search" size="1.2rem" stroke="#d9d9d9" />
                                                        </span>
                                                    )}
                                                    <input
                                                        {...field}
                                                        type={type}
                                                        ref={field.ref}
                                                        placeholder={placeholder}
                                                        disabled={isDisabled}
                                                        onClick={type === "date" ? () => inputRef.current?.showPicker() : undefined}
                                                        {...rest}
                                                        className={clsx(
                                                            "text-base focus-within:outline-blue-500 text-dark-300 placeholder:text-gray-170 border border-gray-70",
                                                            inputClass,
                                                            type === "date" && !field.value ? "text-gray-170" : "",
                                                            errors[name] ? "border-red-800" : field.value ? "border-green-600" : "",
                                                            "shadow-md rounded-lg min-h-11 w-full",
                                                            isSearch ? "ps-10 pe-3" : "px-3"
                                                        )}
                                                        // @ts-ignore
                                                        ref={(e) => {
                                                            field.ref(e);
                                                            inputRef.current = e;
                                                        }}
                                                    />
                                                    {type === "date" && (
                                                        <button
                                                            type="button"
                                                            onClick={() => inputRef.current?.showPicker()}
                                                            className="absolute right-3 bg-white"
                                                        >
                                                            <Icon name="calender" />
                                                        </button>
                                                    )}
                                                </>
                                            )}

                                        </>

                                    );
                            }
                        }}
                    />

                    {icon ?
                        <button type="button" onClick={icon ? () => onPasswordToggle(name) : undefined} className=" absolute right-3"><Icon name={icon} stroke={stroke} fill={"#A4A4A4"} className={iconClass} size={iconSize} /></button> : null}
                </div>
                {errors[name] && (
                    <p className="text-sm text-red-800">{errors[name]?.message as string}</p>
                )}
            </div>
        </div>
    );
};

export default FormField;
