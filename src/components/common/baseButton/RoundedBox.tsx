import clsx from "clsx";
import React, { ElementType, HTMLAttributes } from "react";

interface RoundedBoxProps<T extends ElementType = "div"> extends HTMLAttributes<HTMLElement> {
    as?: T;
    className?: string;
}

const RoundedBox = <T extends ElementType = "div">({
    as,
    children,
    className,
    ...rest
}: RoundedBoxProps<T>) => {
    const Component = as || "div";

    return (
        <Component
            className={clsx("rounded-lg bg-white", className)}
            {...rest}
        >
            {children}
        </Component>
    );
};

export default RoundedBox;
