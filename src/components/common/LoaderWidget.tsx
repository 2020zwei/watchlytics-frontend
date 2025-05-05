import { Spinner } from '@heroui/react'
import React from 'react'

const LoaderWidget = () => {
    return (
        <div className='flex items-center justify-center h-[calc(100vh-8rem)]'>
            <Spinner />
        </div>
    )
}

export default LoaderWidget
