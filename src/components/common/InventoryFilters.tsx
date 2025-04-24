import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger
} from '@heroui/react';
import React from 'react';
import { TransparentButton } from './baseButton/TransparentButton';
import { Filters } from '@/utils/mock';

interface InventoryFiltersTypes {
    onChange: (selected: string) => void;
}

const InventoryFilters: React.FC<InventoryFiltersTypes> = ({ onChange }) => {
    return (
        <Dropdown className='!rounded-lg'>
            <DropdownTrigger>
                <TransparentButton title='Filters' className='h-10' icon='filter' />
            </DropdownTrigger>
            <DropdownMenu
                aria-label='Dropdown menu with description'
                variant='faded'
                onAction={(key) => onChange(key as string)}
            >
                {Filters.map((option: string) => (
                    <DropdownItem
                        key={option}
                        className='text-blue-850 text-sm'
                    >
                        {option}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default InventoryFilters;
