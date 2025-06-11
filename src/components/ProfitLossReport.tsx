"use client";

import Chart from '@/components/common/Chart';
import React, { useEffect, useState } from 'react';
import { useProfitLoseReport } from '@/hooks/useReportHooks';
import { Spinner } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';

const DEFAULT_PERIOD = "monthly";

const ProfitLossReport = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState<string>(DEFAULT_PERIOD);
    const { data, isLoading } = useProfitLoseReport(
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
        month: item?.period || item?.period,
        profit: Math.max(item.profit || 0, 0),
        loss: Math.max(item.loss || 0, 0),
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
                selected={filter ?? ""}
                lineA="profit"
                lineB="loss"
                label="Profit & Loss Report"
                data={chartData}
                callBack={updateFilter}
                lineACol="#80F58D"
                lineBCol="#7459D9"
            />
        </div>
    );
};

export default ProfitLossReport

