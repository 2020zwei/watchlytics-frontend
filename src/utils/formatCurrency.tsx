
import { JSX } from "react";
export function formatCurrency(
    amount: number,
    locale: string = 'en-US',
    currency?: string
): JSX.Element {
    const options: Intl.NumberFormatOptions = currency
        ? { style: 'currency', currency }
        : { minimumFractionDigits: 0 };

    const formatted = new Intl.NumberFormat(locale, options).format(amount);
    const match = formatted.match(/^(\D*)([\d.,]+)/);
    const symbol = match?.[1] ?? '';
    const value = match?.[2] ?? '';

    return (
        <span className="flex items-center">
            <span className="text-[17px] leading-[20px]">{symbol} </span>
            < span > {value} </span>
        </span>
    );
}
