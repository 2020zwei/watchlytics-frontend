import { Spinner } from '@heroui/react'
import React from 'react'
interface FilterLoaderProps {
    isLoading: boolean,
    color?: "white" | "current" | "default" | "primary" | "secondary" | "success" | "warning" | "danger"
}
const FilterLoader = ({ isLoading = false, color = "white" }: FilterLoaderProps) => {
    return (
        isLoading ?
            <div className="fixed z-50 flex justify-center items-center bottom-0 bg-black/45 h-full start-0 end-0">
                <Spinner color={color} />
            </div> : null
    )
}

export default FilterLoader