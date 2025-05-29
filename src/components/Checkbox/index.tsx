import React, { type InputHTMLAttributes, forwardRef } from 'react';
import './index.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, ...rest }, ref) => {
    return (
        <label className="checkbox-wrapper">
            <input
                type="checkbox"
                className="checkbox"
                ref={ref}
                {...rest}
            />
            {label}
        </label>
    );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
