import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "danger" | "outline";
    size?: "sm" | "md" | "lg";
}

const baseStyle =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyle = {
    primary:
        "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500",
    secondary:
        "bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-400",
    danger:
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
    outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
};

const sizeStyle = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
};

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...props
}) => {
    return (
        <button
            className={`
                ${baseStyle}
                ${variantStyle[variant]}
                ${sizeStyle[size]}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;