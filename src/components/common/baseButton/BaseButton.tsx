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
    type?: "button" | "submit" | "reset",
    isLoading?:boolean
}

export const Button = ({ title, className = "text-white",isLoading=false, type = "button", radius = "sm", size = "lg", color = "primary",
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
            type={type}
            isLoading={isLoading}
            className={clsx("hover:opacity-90 border cursor-pointer text-sm font-medium bg-blue-gradient", className)}
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

