import React from "react";

type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "muted";
    spacing?: "sm" | "md" | "lg";
    children?: React.ReactNode;
}

const orientationStyle = {
    horizontal: "w-full h-px",
    vertical: "h-full w-px",
};

const variantStyle = {
    default: "bg-gray-200",
    muted: "bg-gray-100",
};

const spacingStyle = {
    sm: "my-3",
    md: "my-5",
    lg: "my-8",
};

const Separator: React.FC<SeparatorProps> = ({
    orientation = "horizontal",
    variant = "default",
    spacing = "md",
    className = "",
    children,
    ...props
}) => {
    if (children) {
        return (
            <div className="relative">
                <div
                    role="separator"
                    className={`
                        ${orientationStyle[orientation]}
                        ${variantStyle[variant]}
                        ${orientation === "horizontal" ? spacingStyle[spacing] : ""}
                        ${className}
                    `}
                    {...props}
                />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
                    {children}
                </span>
            </div>
        );
    }

    return (
        <div
            role="separator"
            className={`
                ${orientationStyle[orientation]}
                ${variantStyle[variant]}
                ${orientation === "horizontal" ? spacingStyle[spacing] : ""}
                ${className}
            `}
            {...props}
        />
    );
};

export default Separator;