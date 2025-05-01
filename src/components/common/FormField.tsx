import { Controller } from "react-hook-form";
import clsx from "clsx";
import Icon from "./Icon";

interface StyleProps {
    containerClass?: string,
    inputClass?: string,
    labelClass?: string,
    inputContainer?: string,
    icon?: string,
    iconPosition?: "left" | "right",
    stroke?: string,
    fill?: string,
    iconClass?: ""
    iconSize?: string,
    isDisabled?: boolean
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
    iconClass = "",
    fill = "#48505e",
    iconSize = "1.2rem",
    onPasswordToggle = () => { },
    options = [],
    isDisabled = false
}) => {

    return (
        <div className={clsx("", containerClass)}>
            <label htmlFor={name} className={clsx("min-w-[130px] text-base font-medium text-dark-300 pt-3 ",
                errors[name] && errors[name] && "text-red-800", labelClass
            )}>
                {label}
            </label>
            <div className={inputContainer}>
                <div className=" relative flex items-center justify-between">
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
                                                    "text-base focus-within:outline-blue-500 text-dark-300 border appearance-none border-gray-70 shadow-md rounded-lg px-3 min-h-11 w-full",
                                                    errors[name] && errors[name] ? "border-red-800" : field.value ? "border-green-600" : !field.value ? "text-gray-170" : ""
                                                )}
                                            >
                                                <option value="" className="text-gray-170" disabled>Select {label}</option>
                                                {options.map((opt) => (
                                                    <option key={opt.value} value={opt.value} className="text-dark-300">
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className=" absolute right-0"><Icon name="caret" fill="#d9d9d9" /></span>
                                        </div>
                                    );
                                default:
                                    return (
                                        <>
                                            <input
                                                {...field}
                                                type={type}
                                                ref={field.ref}
                                                placeholder={placeholder}
                                                disabled={isDisabled}
                                                
                                                onClick={(e) => {
                                                    if (type === "date") {
                                                        try {
                                                            (e.target as HTMLInputElement).showPicker?.();
                                                        } catch (_) {
                                                        }
                                                    }
                                                }}
                                                className={clsx(
                                                    "text-base focus-within:outline-blue-500 text-dark-300 placeholder:text-gray-170 border border-gray-70 shadow-md rounded-lg px-3 min-h-11 w-full",
                                                    inputClass,
                                                    errors[name] ? "border-red-800" : field.value ? "border-green-600" : ""
                                                )}
                                            />
                                            {type === "date" && (
                                                <button
                                                    type="button"
                                                    className="absolute right-3 bg-white"
                                                >
                                                    <Icon name="calender" />
                                                </button>
                                            )}
                                        </>

                                    );
                            }
                        }}
                    />

                    {icon ?
                        <button type="button" onClick={icon ? () => onPasswordToggle(name) : undefined} className=" absolute right-3"><Icon name={icon} stroke={stroke} fill={fill} className={iconClass} size={iconSize} /></button> : null}
                </div>
                {errors[name] && (
                    <p className="text-sm text-red-800">{errors[name]?.message as string}</p>
                )}
            </div>
        </div>
    );
};

export default FormField;
