import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "outline" | "ghost";
    padding?: "sm" | "md" | "lg";
};

const baseStyle =
    "rounded-xl bg-white transition-shadow";

const variantStyle = {
    default: "shadow-md",
    outline: "border border-gray-200",
    ghost: "bg-transparent",
};

const paddingStyle = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
};

const Card: React.FC<CardProps> = ({
    children,
    variant = "default",
    padding = "md",
    className = "",
    ...props
}) => {
    return (
        <div
            className={`
                ${baseStyle}
                ${variantStyle[variant]}
                ${paddingStyle[padding]}
                ${className}
            `}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
