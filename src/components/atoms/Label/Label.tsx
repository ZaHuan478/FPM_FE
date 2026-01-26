import React from "react";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "muted" | "error" | "success";
}

const baseStyle = "block font-medium select-none";

const variantStyle = {
    default: "text-gray-800",
    muted: "text-gray-500",
    error: "text-red-600",
    success: "text-green-600",
};

const sizeStyle = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
};

const Label: React.FC<LabelProps> = ({
    children,
    variant = "default",
    size = "md",
    required = false,
    className = "",
    ...props
}) => {
    return (
        <label
            className={`
                ${baseStyle}
                ${variantStyle[variant]}
                ${sizeStyle[size]}
                ${className}
            `}
            {...props}
        >
            {children}
            {required && (
                <span className="ml-1 text-red-500">*</span>
            )}
        </label>
    );
};

export default Label;