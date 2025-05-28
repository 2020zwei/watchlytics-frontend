// utils/formatCurrency.ts

/**
 * Formats a number with commas based on locale.
 * Example: 5000 => "5,000"
 *
 * @param amount - The number to format
 * @param locale - Optional locale string, defaults to "en-US"
 * @param currency - Optional currency code, if you want currency formatting
 */
export function formatCurrency(
    amount: number,
    locale: string = 'en-US',
    currency?: string
): string {
    const options: Intl.NumberFormatOptions = currency
        ? { style: 'currency', currency }
        : { minimumFractionDigits: 0 };

    return new Intl.NumberFormat(locale, options).format(amount);
}
