import { REPORTFILTEROPTIONS } from '@/utils/mock'
import React, { useEffect, useState } from 'react'
import SelectWidget from './SelectWidget'
import { usePathname, useRouter } from 'next/navigation'
const RPORTLINKS: { [key: string]: string } = {
    "Inventory Valuation Report": "reports",
    "Purchase & Sales Report": "purchase-sales-report",
    "Profit & Loss Report": "profit-loss-report",
    "Stock Aging": "stock-aging-report",
    "Expense Report": "expense-report"
};


const ReportFilters = ({ selectedReport }: { selectedReport: string }) => {
    const navigate = useRouter()
    const [selected, setSelected] = useState(selectedReport)
    const pathname = usePathname();
    useEffect(() => {
        const match = pathname.startsWith("/reports/");
        if (match) {
            const slug = pathname.split("/reports/")[1]?.replaceAll("-", " ");
            if (slug) {
                setSelected(slug);
            }
        }
    }, [pathname]);
    const onValueChange = (slug: string) => {
        setSelected(slug);
        const path = RPORTLINKS[slug];
        if (path) {
            navigate.push(path);
        }
    };

    return (
        <div className='border rounded-lg border-gray-200 ms-auto text-end w-[300px]'>
            <SelectWidget
                options={REPORTFILTEROPTIONS}
                onValueChange={onValueChange}
                selected={selected}
                classNames={{
                    trigger: "!shadow-none !border-0 !bg-transparent text-[#858D9D] font-normal text-sm",
                    base: "rounded-none",
                    popoverContent: "rounded-none",

                }}
            />
        </div>
    )
}

export default ReportFilters
