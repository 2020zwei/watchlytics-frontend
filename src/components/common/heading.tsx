import clsx from "clsx";
import React, { ElementType, HTMLAttributes } from "react";

interface HeadingProps<T extends ElementType = "div"> extends HTMLAttributes<HTMLElement> {
    as?: T;
    className?: string;
}

const Heading = <T extends ElementType = "h5">({
    as,
    children,
    className,
    ...rest
}: HeadingProps<T>) => {
    const Component = as || "h5";

    return (
        <Component
            className={clsx(className,"font-medium text-xl text-dark-800")}
            {...rest}
        >
            {children}
        </Component>
    );
};

export default Heading;
