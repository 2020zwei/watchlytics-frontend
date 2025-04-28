"use client"
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
  } from 'recharts';
  

const lineData = [
    { month: "Sep 2024", sales: 125000, purchase: 100000 },
    { month: "Sep 2024", sales: 95000, purchase: 125000 },
    { month: "Sep 2024", sales: 115000, purchase: 115000 },
    { month: "Sep 2024", sales: 90000, purchase: 140000 },
    { month: "Sep 2024", sales: 110000, purchase: 115000 },
    { month: "Sep 2024", sales: 87000, purchase: 135000 },
    { month: "Sep 2024", sales: 70000, purchase: 150000 },
    { month: "Sep 2024", sales: 100000, purchase: 125000 },
    { month: "Sep 2024", sales: 95000, purchase: 115000 },
];

const pieData = [
    { name: "Target", value: 25, color: "#0052CC" },
    { name: "Income", value: 40, color: "#1E5EFF" },
    { name: "Pending", value: 35, color: "#E6E6E6" },
];

export default function ExpenseTrackingChart() {
    return (
        <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
            <div className="flex-1">
                <div className="text-lg font-semibold mb-1">Expense Tracking</div>
                <div className="text-sm font-medium text-gray-500 mb-3">Payments</div>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[30000, 180000]} />
                        <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
                        <Line type="monotone" dataKey="sales" stroke="#EB2F96" dot={{ r: 3 }} strokeWidth={2} />
                        <Line type="monotone" dataKey="purchase" stroke="#52C41A" dot={{ r: 3 }} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="w-1/4 flex flex-col items-center justify-center">
                <div className="text-lg font-semibold mb-4">Income</div>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={0}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-between w-full mt-4 text-sm">
                    {pieData.map((entry) => (
                        <div key={entry.name} className="flex items-center gap-1">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            ></div>
                            <span>{entry.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
