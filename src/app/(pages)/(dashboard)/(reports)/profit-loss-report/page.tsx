"use client";

import Chart from '@/components/common/Chart';
import React, { useEffect, useState } from 'react';
import { sendRequest } from '@/utils/apis';
import { METHODS, URLS } from '@/utils/constants';
import { RequestTypes } from '@/types';
import { Spinner } from '@heroui/react';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<any>();
    const navigate = useRouter()
    const fetchReports = async (query: any) => {
        setLoading(true);
        const PAYLOAD: RequestTypes = {
            url: `${URLS.MONTHLY_PROFIT}?period=${query}`,
            method: METHODS.GET,
        };
        try {
            const res = await sendRequest(PAYLOAD);
            if (res.status === 200) {
                const normalized = res.data.map((item: any) => ({
                    month: item.month,
                    profit: Math.max(item.revenue - item.cost, 0),
                    loss: Math.max(item.cost - item.revenue, 0),
                }));
                setReports(normalized);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const updateFilter = (value: string) => {
        const newFilters = { "query": value };
        setFilter(value)
        const query = new URLSearchParams(newFilters).toString();
        navigate.push(`?${query}`);
        fetchReports(value);
    };
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setFilter(params.get("query"));
        fetchReports(params.get("query"));
    }, []);

    if (loading) {
        return <div className='text-center'><Spinner /></div>;
    }
    return (
        <div>
            <Chart
                selected={filter}
                lineA="profit"
                lineB="loss"
                label="Profit & Loss Report"
                data={reports}
                callBack={updateFilter}
                lineACol="#80F58D"
                lineBCol="#7459D9"
            />
        </div>
    );
};

export default Page;
