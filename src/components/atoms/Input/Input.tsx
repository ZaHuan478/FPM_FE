import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
}

const Input: React.FC<InputProps> = ({
    error,
    className = "",
    ...props
}) => {
    return (
        <div className="w-full">
            <input
                className={`
                    w-full rounded-md border px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-black
                    ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
                    ${className}
                `}
                {...props}
            />

            {error && (
                <p className="mt-1 text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    )
}

export default Input;