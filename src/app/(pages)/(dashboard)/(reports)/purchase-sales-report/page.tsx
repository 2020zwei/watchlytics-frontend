"use client"

import Chart from '@/components/common/Chart'
import { RequestTypes } from '@/types';
import { sendRequest } from '@/utils/apis';
import { METHODS, URLS } from '@/utils/constants';
import { Spinner } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<any>();
    const navigate = useRouter()

    const fetchReports = async (query: any) => {
        setLoading(true)
        const PAYLOAD: RequestTypes = {
            url: `${URLS.PURCHASE_SALES}?period=${query}`,
            method: METHODS.GET,
        };
        sendRequest(PAYLOAD)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res)
                    setReports(res?.data?.chart_data);
                }
            }).finally(() => setLoading(false))
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

    const normalizedData = reports?.map((item: any) => ({
        month: item.date,
        sales: item.sale || 0,
        purchase: item.purchase || 0
    }));
    if (loading) {
        return <div className='text-center'><Spinner /></div>;
    }
    return (
        <div>
            <Chart
                selected={filter}
                lineA="purchase"
                lineB="sale"
                label="Purchase & Sales Report"
                data={normalizedData}
                callBack={updateFilter}
                lineACol="#448DF2"
                lineBCol="#DBA36247"
            />
        </div>
    );
};

export default Page;
