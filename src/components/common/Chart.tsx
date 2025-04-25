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
import React, {useState } from "react";
import RoundedBox from "./baseButton/RoundedBox";
import Heading from "./heading";
import Icon from "./Icon";

const data = [
    { month: "Jan", purchase: 4000, sale: 2400 },
    { month: "Feb", purchase: 3000, sale: 1398 },
    { month: "Mar", purchase: 2000, sale: 9800 },
    { month: "Apr", purchase: 2780, sale: 3908 },
    { month: "May", purchase: 1890, sale: 4800 },
    { month: "Jun", purchase: 2390, sale: 3800 },
    { month: "Jul", purchase: 3490, sale: 4300 },
    { month: "Aug", purchase: 4000, sale: 2400 },
    { month: "Sep", purchase: 3000, sale: 1398 },
    { month: "Oct", purchase: 2000, sale: 9800 },
    { month: "Nov", purchase: 2780, sale: 3908 },
    { month: "Dec", purchase: 1890, sale: 4800 },
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

    const renderCustomLegend = () => (
        <div className="flex gap-6 px-4 pb-2  justify-center">
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
                    {isProfitChart ? "Purchase & Sales Report" : "Profit & Loss Report"}
                </Heading>
                <div className='border rounded-lg border-gray-200 md:px-5 px-3'>
                    <select onChange={(e) => setIsProfitChart(e.target.value === "1")}className=' bg-transparent outline-none text-sm text-gray-650 min-h-10 md:pe-6 pe-3 md:min-w-[290px]'>
                        <option value="1">Purchase & Sales Report</option>
                        <option value="0">Monthly Profit & Loss Chart</option>
                    </select>
                </div>
            </div>
            <RoundedBox className="w-full h-[calc(100vh-170px)] pb-5">
                <div className="flex items-center justify-between px-4 pb-10 pt-4">
                    <Heading>{isProfitChart ? "Purchase  & Sale" : "Profit & Losss"}</Heading>
                    <div className="min-w-[140px] min-h-8 px-4 gap-3 border rounded-xl flex items-center justify-between">
                        <span><Icon name="calener" /></span>
                        <select name="" id="" className=" outline-none flex-1 text-sm font-medium text-dark-700">
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="80%">
                    <LineChart
                        data={data}
                        margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="0 0" vertical={false} strokeOpacity={0.4} />
                        <XAxis dataKey="month" tick={{ fontSize: 14, fill: "#858D9D" }} axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: "#858D9D" }} />
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
