"use client";
import RoundedBox from '@/components/common/baseButton/RoundedBox';
import Heading from '@/components/common/heading';
import ReportFilters from '@/components/common/ReportFilters';
import SelectWidget from '@/components/common/SelectWidget';
import { useStockAgingReport } from '@/hooks/useReportHooks';
import { Spinner } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const COLORS = {
    '<30': '#FFAF00',
    '30-60': '#F46920',
    '60-90': '#F53255',
    '90+': '#F857C1',
};

const StockAgingReportWidget = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [categories, setCategories] = useState<string[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [modelNames, setModelNames] = useState<string[]>([]);

    const filters = useMemo(() => ({
        brand: searchParams.get('brand') || '',
        model: searchParams.get('model') || ''
    }), [searchParams]);

    const { data, isLoading } = useStockAgingReport(filters);

    useEffect(() => {
        if (data?.status === 200) {
            const transformed = data?.data.chart_data?.map((item: any) => ({
                name: item.id,
                '<30': item.less_than_30,
                '30-60': item['30_to_60'],
                '60-90': item['60_to_90'],
                '90+': item['91_plus'],
            }));
            setChartData(transformed);
            setCategories(data?.data.available_brands);
            setModelNames(data?.data.available_models);
        }
    }, [data]);

    const updateURLWithFilters = (updatedFilters: { brand: string; model: string }) => {
        const params = new URLSearchParams();
        if (updatedFilters.brand) params.set('brand', updatedFilters.brand);
        if (updatedFilters.model) params.set('model', updatedFilters.model);
        router.push(`/stock-aging-report?${params.toString()}`);
    };

    const handleFilterChange = (key: 'brand' | 'model', value: string) => {
        const updated = { ...filters, [key]: value };
        updateURLWithFilters(updated);
    };

    if (isLoading) {
        return <div className="text-center"><Spinner /></div>;
    }

    return (
        <>
            <div className="mb-4 flex sm:flex-row flex-col items-center sm:justify-between">
                <Heading as="h3" className="md:text-2xl text-lg w-full">Stock Aging Report</Heading>
                <ReportFilters selectedReport="Stock Aging" />
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="min-w-[140px]">
                    <SelectWidget
                        onValueChange={(value) => handleFilterChange("brand", value)}
                        selected={filters.brand}
                        placeholder="Brand"
                        options={categories}
                        classNames={{
                            trigger: "!rounded-lg bg-transparent border !border-gray-70 text-dark-700 font-normal text-sm",
                            base: "rounded-none",
                            popoverContent: "rounded-none",
                        }}
                    />
                </div>
                <div className="min-w-[140px]">
                    <SelectWidget
                        onValueChange={(value) => handleFilterChange("model", value)}
                        selected={filters.model}
                        placeholder="Model Name"
                        options={modelNames}
                        classNames={{
                            trigger: "!rounded-lg bg-transparent border !border-gray-70 text-dark-700 font-normal text-sm",
                            base: "rounded-none",
                            popoverContent: "rounded-none",
                        }}
                    />
                </div>
            </div>

            <RoundedBox className="!p-4 !ps-0 flex gap-2">
                <div className="flex-1">
                    <div className="overflow-x-auto">
                        {/* Optional: Display length */}
                        {/* {chartData.length} */}

                        <div
                            className={
                                chartData.length > 6
                                    ? 'min-w-[1000px]' // 👈 Force horizontal scroll
                                    : 'w-full'         // 👈 Fit container if <= 9
                            }
                        >
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={chartData}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                    barGap={0}
                                >
                                    <CartesianGrid vertical={false} stroke="#3333331A" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={{ stroke: '#3333331A' }}
                                        fontSize={14}
                                        tickLine={false}
                                    />
                                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                                    <Tooltip cursor={false} />
                                    <Bar dataKey="<30" stackId="a" fill={COLORS['<30']} barSize={44} />
                                    <Bar dataKey="30-60" stackId="a" fill={COLORS['30-60']} barSize={44} />
                                    <Bar dataKey="60-90" stackId="a" fill={COLORS['60-90']} barSize={44} />
                                    <Bar dataKey="90+" stackId="a" fill={COLORS['90+']} barSize={44} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>



                <div className="min-w-[215px] h-full bg-[#F9F9F9] rounded-lg p-4 overflow-x-auto">
                    <h3 className="font-medium text-dark-800 pb-4">Days in Inventory</h3>
                    <div className="flex flex-col gap-2">
                        {[{ label: '<30 Days', color: COLORS['<30'] },
                        { label: '>30 -< 60 Days', color: COLORS['30-60'] },
                        { label: '>60 -< 90 Days', color: COLORS['60-90'] },
                        { label: '91+ Days', color: COLORS['90+'] }]
                            .map(({ label, color }) => (
                                <div key={label} className="flex items-center gap-3">
                                    <span className="w-5 h-5 rounded" style={{ backgroundColor: color }}></span>
                                    <span className="text-[#808080] text-sm">{label}</span>
                                </div>
                            ))}
                    </div>
                </div>
            </RoundedBox>
        </>
    );
};

export default StockAgingReportWidget;
