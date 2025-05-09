import Chart from '@/components/common/Chart'
import React from 'react'

const page = () => {
    const data = [
        { month: "Sep", sales: 125000, purchase: 1000 },
        { month: "Oct", sales: 125000, purchase: 10300 },
        { month: "Nov", sales: 12400, purchase: 100000 },
        { month: "Dec", sales: 125000, purchase: 100000 },
        { month: "Jan", sales: 125000, purchase: 120000 },
        { month: "Feb", sales: 125000, purchase: 1300 },
        { month: "Mar", sales: 100, purchase: 1500 },
    ];
    return (
        <div>
            <Chart label='Profit & Loss Report' data={data}/>
        </div>
    )
}

export default page
