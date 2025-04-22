import { Button as HeroButton, ButtonProps } from "@heroui/react";
import clsx from "clsx";
import Icon from "../Icon";

interface PrimaryButtonProps extends ButtonProps {
    title: string;
    className?: string,
    radius?: "sm" | "lg" | "md" | "none" | "full"
    size?: "sm" | "lg" | "md" | undefined,
    color?: "primary" | "default" | "secondary" | "success" | "warning" | "danger";
    icon?: string,
    iconPosition?: "left" | "right",
    iconClass?: string,
    iconFill?: "",
    iconStroke?: "",
    iconSize?: "",
}

export const TransparentButton = ({ title, className = "text-white", radius = "sm", size = "lg", color = "primary",
    icon = "",
    iconPosition = "left",
    iconStroke = "",
    iconClass = "",
    iconFill = "",
    iconSize = "",
    ...rest }: PrimaryButtonProps) => {
    return (
        <HeroButton
            radius={radius}
            size={size}
            color={color}
            className={clsx("hover:opacity-90 hover:bg-gray-30 border h-10 border-gray-70 shadow-md text-sm !text-gray-180 bg-transparent font-medium", className)}
            {...rest}
        >
            {icon && iconPosition === 'left' ? <Icon
                name={icon}
                className={iconClass}
                fill={iconFill}
                stroke={iconStroke}
                size={size}
            /> : null}
            {title}
            {icon && iconPosition === 'right' ? <Icon
                name={icon}
                className={iconClass}
                fill={iconFill}
                stroke={iconStroke}
                size={size}
            /> : null}
        </HeroButton>
    );
};

