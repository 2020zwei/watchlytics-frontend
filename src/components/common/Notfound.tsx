import React from 'react'

const Notfound = ({ label }: { label?: string }) => {
    return (
        <div className='flex justify-center items-center h-24'>{label || "Data Not Found"}</div>
    )
}

export default Notfound
