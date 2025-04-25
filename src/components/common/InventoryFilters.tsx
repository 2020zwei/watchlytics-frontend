import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger
} from '@heroui/react';
import React from 'react';
import { TransparentButton } from './baseButton/TransparentButton';
import { Filters } from '@/utils/mock';
import { useSearchParams } from 'next/navigation';

interface InventoryFiltersTypes {
    onChange: (selected: string) => void;
}

const InventoryFilters: React.FC<InventoryFiltersTypes> = ({ onChange }) => {
    const searchParams = useSearchParams();
    const handleSelection = (key: string) => {
        onChange(key);
    };
    const filter = searchParams?.toString()
    const selOption=filter?.slice(filter?.indexOf("=")+1)

    return (
        <Dropdown className='!rounded-lg'>
            <DropdownTrigger>
                <TransparentButton title='Filters' className='h-10' icon='filter' />
            </DropdownTrigger>
            <DropdownMenu
                aria-label='Dropdown menu with description'
                variant='faded'
                onAction={(key) => handleSelection(key as string)}
            >
                {Filters.map((option: string) => (
                    <DropdownItem
                        key={option}
                        className={` capitalize text-sm ${selOption === option ? 'bg-gray-300' : 'text-blue-850'
                            }`}
                    >
                        {option}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default InventoryFilters;
