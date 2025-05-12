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
import React from "react";
import RoundedBox from "./baseButton/RoundedBox";
import Heading from "./heading";
import Icon from "./Icon";
import ReportFilters from "./ReportFilters";

interface ChartProps {
    lineA: "profit" | "purchase";
    lineB: "loss" | "sale";
    lineACol: string;
    lineBCol: string;
    label: string;
    data: any[];
    callBack?: (value: string) => void;
}

// Custom legend rendering both items with color and label
const renderCustomLegend = (lineA: string, lineB: string, lineACol: string, lineBCol: string) => {
    const items = [
        { key: lineA, color: lineACol },
        { key: lineB, color: lineBCol },
    ];

    return (
        <div className="flex gap-6 px-4 pb-2 justify-center pt-5">
            {items.map(({ key, color }) => (
                <div key={key} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-sm font-medium capitalize">{key}</span>
                </div>
            ))}
        </div>
    );
};

const Chart: React.FC<ChartProps> = ({ lineA, lineB, label, data, lineACol, lineBCol, callBack }) => {
    const handleChartTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        callBack?.(e.target.value as string);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <Heading as="h3" className="md:text-2xl text-lg">
                    {label}
                </Heading>
                <ReportFilters
                    selectedReport={
                        lineA === "profit"
                            ? "Profit & Loss Report"
                            : "Purchase & Sales Report"
                    }
                />
            </div>
            <RoundedBox className="w-full h-[calc(100vh-170px)] pb-5">
                <div className="flex items-center justify-between px-4 pb-10 pt-4">
                    <Heading>{label}</Heading>
                    <div className="min-w-[180px] min-h-8 px-4 gap-3 border rounded-xl flex items-center justify-between">
                        <span>
                            <Icon name="calener" />
                        </span>
                        <select
                            onChange={handleChartTypeChange}
                            className="outline-none flex-1 text-sm font-medium text-dark-700"
                        >
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 90 }}
                    >
                        <CartesianGrid strokeDasharray="0 0" vertical={false} strokeOpacity={0.4} />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 14, fill: "#858D9D" }}
                            tickMargin={20}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            domain={[0, "auto"]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 14, fill: "#858D9D" }}
                        />
                        <Tooltip />
                        <Legend content={() => renderCustomLegend(lineA, lineB, lineACol, lineBCol)} />
                        {data.some((d) => d[lineA] > 0) && (
                            <Line
                                type="monotone"
                                dataKey={lineA}
                                stroke={lineACol}
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        )}
                        {data.some((d) => d[lineB] > 0) && (
                            <Line
                                type="monotone"
                                dataKey={lineB}
                                stroke={lineBCol}
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
