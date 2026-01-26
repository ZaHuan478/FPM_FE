import React from "react";
import Button from "../../atoms/Button/Button";

type GoogleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({
    text = "Continue with Google",
    className = "",
    ...props
}) => {
    return (
        <Button
            type="button"
            variant="outline"
            className={`
                flex items-center justify-center gap-3
                h-12 w-full
                rounded-xl
                border-2 border-gray-200
                bg-white
                hover:bg-gray-50 hover:border-gray-300
                active:scale-[0.98]
                transition-all duration-200
                shadow-sm hover:shadow-md
                font-medium text-gray-700
                ${className}
            `}
            {...props}
        >
            {/* Google Logo */}
            <svg
                width="20"
                height="20"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#EA4335"
                    d="M24 9.5c3.48 0 6.57 1.2 9.02 3.55l6.7-6.7C35.64 2.54 30.27 0 24 0 14.64 0 6.53 5.38 2.65 13.22l7.79 6.04C12.3 13.3 17.7 9.5 24 9.5z"
                />
                <path
                    fill="#4285F4"
                    d="M46.5 24.5c0-1.56-.14-3.05-.4-4.5H24v9h12.7c-.55 2.96-2.21 5.47-4.7 7.17l7.2 5.59c4.22-3.9 6.3-9.65 6.3-17.26z"
                />
                <path
                    fill="#FBBC05"
                    d="M10.44 28.26a14.55 14.55 0 010-8.52l-7.79-6.04a24 24 0 000 20.6l7.79-6.04z"
                />
                <path
                    fill="#34A853"
                    d="M24 48c6.27 0 11.64-2.06 15.52-5.6l-7.2-5.59c-2 1.35-4.56 2.15-8.32 2.15-6.3 0-11.7-3.8-13.56-9.26l-7.79 6.04C6.53 42.62 14.64 48 24 48z"
                />
            </svg>

            <span className="text-[15px]">{text}</span>
        </Button>
    );
};

export default GoogleButton;