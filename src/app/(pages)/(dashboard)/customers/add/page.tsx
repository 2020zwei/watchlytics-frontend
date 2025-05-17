
"use client"
import dynamic from "next/dynamic"
const AddCustomerWidget = dynamic(() => import('@/components/customers/AddCustomerWidget'), {
    ssr: false
});

const page = () => {
    return (
        <AddCustomerWidget />
    )
}

export default page
