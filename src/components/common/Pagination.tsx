import React, { memo } from "react";
import { TransparentButton } from "./baseButton/TransparentButton";
import { PaginationTypes } from "@/types";

const Pagination: React.FC<PaginationTypes> = ({
    totalPages,
    currentPage,
    onPageChange
}) => {

    return (
        <div className='flex justify-between items-center mt-3 font-inter'>
            <TransparentButton title='Previous' isDisabled={currentPage < 2} onPress={() => onPageChange(currentPage - 1)} />
            <div className=' text-sm text-dark-300'>Page {currentPage} of {totalPages}</div>
            <TransparentButton title='Next' isDisabled={currentPage === totalPages} onPress={() => onPageChange(currentPage + 1)} />
        </div>
    );
};

export default memo(Pagination);
