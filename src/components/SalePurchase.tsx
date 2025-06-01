"use client";

import Chart from '@/components/common/Chart';
import React, { useEffect, useState } from 'react';
import { usePurchaseReports } from '@/hooks/useReportHooks';
import { Spinner } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';

const DEFAULT_PERIOD = "monthly";

const SalePurchase = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState<string>(DEFAULT_PERIOD);
    const { data, isLoading } = usePurchaseReports(
        { period: filter },
        { enabled: !!filter }
    );
    useEffect(() => {
        const queryParam = searchParams.get("period");
        if (queryParam) {
            setFilter(queryParam);
        } else {
            const params = new URLSearchParams();
            params.set("period", DEFAULT_PERIOD);
            router.replace(`?${params.toString()}`);
        }
    }, [searchParams]);

    const chartData = data?.data?.chart_data?.map((item: any) => ({
        month: item?.month || item?.date,
        purchase: Math.max(item.purchase || 0, 0),
        sale: Math.max(item.sale || 0, 0),
    })) || [];

    const updateFilter = (value: string) => {
        setFilter(value);
        const params = new URLSearchParams();
        params.set("period", value);
        router.push(`?${params.toString()}`);
    };

    if (isLoading) {
        return <div className="text-center"><Spinner /></div>;
    }

    return (
        <div>
            <Chart
                selected={filter}
                lineA="purchase"
                lineB="sale"
                label="Purchase & Sales Report"
                data={chartData}
                callBack={updateFilter}
                lineACol="#448DF2"
                lineBCol="#DBA36247"
            />
        </div>
    );
};

export default SalePurchase;

