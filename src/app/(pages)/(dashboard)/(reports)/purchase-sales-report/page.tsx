"use client"

import Chart from '@/components/common/Chart'
import { RequestTypes } from '@/types';
import { sendRequest } from '@/utils/apis';
import { METHODS, URLS } from '@/utils/constants';
import { Spinner } from '@heroui/react';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        setLoading(true)
        const PAYLOAD: RequestTypes = {
            url: URLS.PURCHASE_SALES,
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

    useEffect(() => {
        fetchReports();
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
                lineA="purchase"
                lineB="sale"
                label="Purchase & Sales Report"
                data={normalizedData}
                callBack={(filter) => { console.log(filter) }}
                lineACol="#448DF2"
                lineBCol="#DBA36247"
            />
        </div>
    );
};

export default Page;
