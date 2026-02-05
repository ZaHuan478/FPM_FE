import { useState } from "react";
import { AuthLayout } from "../../template/AuthLayout/AuthLayout";
import { LoginForm } from "../../organisms/LoginForm/LoginForm";
import { Card } from "../../atoms/Card/Card";
import { authService } from "../../../services/auth.service";

type LoginPageProps = {
    onSwitchToRegister?: () => void;
}

export function LoginPage({ onSwitchToRegister }: LoginPageProps) {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError("");
            await authService.login({ email, password });
            window.location.href = "/dashboard";
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <Card className="w-full max-w-md p-8 shadow-xl border-0">
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}
                <LoginForm onLogin={handleLogin} onSwitchToRegister={onSwitchToRegister} />
                {loading && <div className="text-center mt-4 text-gray-600">Loading...</div>}
            </Card>
        </AuthLayout>
    );
}