import { AuthBranding } from "../../organisms/AuthBranding/AuthBranding";

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">
            <AuthBranding />
            <div className="flex-1 flex items-center justify-center bg-slate-50">
                {children}
            </div>
        </div>
    );
}
