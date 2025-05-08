"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import React, { useEffect, useState } from "react";
import RoundedBox from "./baseButton/RoundedBox";
import Heading from "./heading";
import Icon from "./Icon";
import ReportFilters from "./ReportFilters";
import { usePathname } from "next/navigation";

const data = [
    { month: "Sep", sales: 125000, purchase: 1000 },
    { month: "Oct", sales: 125000, purchase: 10300 },
    { month: "Nov", sales: 12400, purchase: 100000 },
    { month: "Dec", sales: 125000, purchase: 100000 },
    { month: "Jan", sales: 125000, purchase: 120000 },
    { month: "Feb", sales: 125000, purchase: 1300 },
    { month: "Mar", sales: 100, purchase: 1500 },
];

const COLORS: Record<string, string> = {
    PURCHESE: "#448DF2",
    SALE: "#DBA36247",
};
const LOSTCHARTCOLORS: Record<string, string> = {
    PROFIT: "#80F58D",
    LOSE: "#7459D9",
};

interface ChartProps {
    isProfitChart?: boolean
}

const Chart: React.FC<ChartProps> = () => {
    const [isProfitChart, setIsProfitChart] = useState<boolean>(true)
    const [selected, setSelected] = useState("Inventory Valuation Report")
    const pathname = usePathname();
    const [visibleLines, setVisibleLines] = useState({
        purchase: true,
        sale: true,
    });

    const handleLegendClick = (dataKey: string) => {
        setVisibleLines((prev) => ({
            ...prev,
            [dataKey]: !prev[dataKey],
        }));
    };

    useEffect(() => {
        const match = pathname.startsWith("/reports/");
        if (match) {
            const slug = pathname.split("/reports/")[1]?.replaceAll("-", " ");
            if (slug) {
                setSelected(slug);
            }
        }
    }, [pathname]);

    const renderCustomLegend = () => (
        <div className="flex gap-6 px-4 pb-2  justify-center pt-5">
            {Object.entries(isProfitChart ? LOSTCHARTCOLORS : COLORS).map(([key, color]) => (
                <div
                    key={key}
                    onClick={() => handleLegendClick(key)}
                    className="flex items-center gap-2 cursor-pointer select-none"
                >
                    <div
                        className="w-4 h-4 rounded-full"
                        style={{
                            backgroundColor: color,
                            opacity: visibleLines[key] ? 1 : 0.2,
                        }}
                    />
                    <span
                        className="text-sm font-medium lowercase first-letter:uppercase"
                        style={{ opacity: visibleLines[key] ? 1 : 0.5 }}
                    >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <div className='flex items-center justify-between mb-4'>
                <Heading as='h3' className=' md:text-2xl text-lg'>
                    {/* {isProfitChart ? "Purchase & Sales Report" : "Profit & Loss Report"} */}
                    {selected}
                </Heading>
                <ReportFilters />
            </div>
            <RoundedBox className="w-full h-[calc(100vh-170px)] pb-5">
                <div className="flex items-center justify-between px-4 pb-10 pt-4">
                    <Heading>{selected}</Heading>
                    <div className="min-w-[140px] min-h-8 px-4 gap-3 border rounded-xl flex items-center justify-between">
                        <span><Icon name="calener" /></span>
                        <select onChange={() => setIsProfitChart(!isProfitChart)} name="" id="" className=" outline-none flex-1 text-sm font-medium text-dark-700">
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 90 }}
                    >
                        <CartesianGrid strokeDasharray="0 0" vertical={false} strokeOpacity={0.4} />
                        <XAxis dataKey="month" tick={{ fontSize: 14, fill: "#858D9D" }} padding={{ right: 0, left: 0 }} tickMargin={20} axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: "#858D9D" }} domain={['dataMin - 100', 'dataMax']} />
                        <Tooltip />
                        <Legend content={renderCustomLegend} />
                        {visibleLines.purchase && (
                            <Line
                                type="monotone"
                                dataKey="purchase"
                                stroke={isProfitChart ? LOSTCHARTCOLORS.PROFIT : COLORS.PURCHESE}
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        )}
                        {visibleLines.sale && (
                            <Line
                                type="monotone"
                                dataKey="sale"
                                stroke={isProfitChart ? LOSTCHARTCOLORS.LOSE : COLORS.SALE}
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </RoundedBox>
        </div>
    );
};

export default Chart;
