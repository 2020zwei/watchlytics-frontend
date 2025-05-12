"use client";

import Chart from '@/components/common/Chart';
import React, { useEffect, useState } from 'react';
import { sendRequest } from '@/utils/apis';
import { METHODS, URLS } from '@/utils/constants';
import { RequestTypes } from '@/types';
import { Spinner } from '@heroui/react';

const Page = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        setLoading(true);
        const PAYLOAD: RequestTypes = {
            url: URLS.MONTHLY_PROFIT,
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

    useEffect(() => {
        fetchReports();
    }, []);
    if (loading) {
        return <div className='text-center'><Spinner /></div>;
    }
    return (
        <div>
            <Chart
                lineA="profit"
                lineB="loss"
                label="Profit & Loss Report"
                data={reports}
                callBack={(filter) => { console.log(filter) }}
                lineACol="#80F58D"
                lineBCol="#7459D9"
            />
        </div>
    );
};

export default Page;
