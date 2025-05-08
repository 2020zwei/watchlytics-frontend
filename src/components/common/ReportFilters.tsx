import { REPORTFILTEROPTIONS } from '@/utils/mock'
import React, { useEffect, useState } from 'react'
import SelectWidget from './SelectWidget'
import { usePathname, useRouter } from 'next/navigation'

const ReportFilters = () => {
    const navigate = useRouter()
    const [selected, setSelected] = useState("Inventory Valuation Report")
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
        setSelected(slug)
        navigate.push(`/reports/${slug?.replaceAll(" ", "-")}`)
    }
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
