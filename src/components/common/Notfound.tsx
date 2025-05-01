import React from 'react'

const Notfound = ({ label }: { label?: string }) => {
    return (
        <div className='flex justify-center items-center h-24'>{label || "Data No Found"}</div>
    )
}

export default Notfound
