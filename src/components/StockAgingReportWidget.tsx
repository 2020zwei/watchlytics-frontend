"use client"
import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'STK1', '<30': 20, '30-60': 15, '60-90': 20, '90+': 15 },
    { name: 'STK2', '<30': 10, '30-60': 10, '60-90': 10, '90+': 15 },
    { name: 'STK3', '<30': 25, '30-60': 25, '60-90': 25, '90+': 25 },
    { name: 'STK4', '<30': 20, '30-60': 18, '60-90': 20, '90+': 20 },
    { name: 'STK5', '<30': 15, '30-60': 10, '60-90': 15, '90+': 18 },
    { name: 'STK6', '<30': 10, '30-60': 10, '60-90': 10, '90+': 8 },
    { name: 'STK7', '<30': 18, '30-60': 15, '60-90': 15, '90+': 15 },
    { name: 'STK8', '<30': 20, '30-60': 20, '60-90': 22, '90+': 23 },
    { name: 'STK9', '<30': 15, '30-60': 15, '60-90': 15, '90+': 13 },
];

const COLORS = {
    '<30': '#FFA500',     // Orange
    '30-60': '#FF6347',   // Tomato
    '60-90': '#FF1493',   // Deep Pink
    '90+': '#FF69B4'      // Hot Pink
};

export default function StockAgingReportWidget() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke='#3333331A'/>
                <XAxis dataKey="name" axisLine={{ stroke: '#3333331A' }}/>
                <YAxis domain={[0, 100]} axisLine={false}/>
                <Tooltip cursor={false}/>
                <Legend
                    payload={[
                        { value: '<30 Days', type: 'square', id: '<30', color: COLORS['<30'] },
                        { value: '30 - 60 Days', type: 'square', id: '30-60', color: COLORS['30-60'] },
                        { value: '60 - 90 Days', type: 'square', id: '60-90', color: COLORS['60-90'] },
                        { value: '91+ Days', type: 'square', id: '90+', color: COLORS['90+'] }
                    ]}
                />
                <Bar dataKey="<30" stackId="a" fill={COLORS['<30']} />
                <Bar dataKey="30-60" stackId="a" fill={COLORS['30-60']} />
                <Bar dataKey="60-90" stackId="a" fill={COLORS['60-90']} />
                <Bar dataKey="90+" stackId="a" fill={COLORS['90+']} />
            </BarChart>
        </ResponsiveContainer>
    );
}

