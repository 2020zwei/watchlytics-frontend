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
