import { useState } from "react";
import { AuthLayout } from "../../template/AuthLayout/AuthLayout";
import { RegisterForm } from "../../organisms/RegisterForn/RegisterForm";
import { Card } from "../../atoms/Card/Card";
import { authService } from "../../../services/auth.service";

type RegisterPageProps = {
    onSwitchToLogin?: () => void;
}

export function RegisterPage({ onSwitchToLogin }: RegisterPageProps) {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (fullName: string, email: string, password: string) => {
        console.log('🟢 handleRegister called with:', { fullName, email, password });
        try {
            setLoading(true);
            setError("");
            await authService.register({ fullName, email, password });
            window.location.href = "/dashboard";
        } catch (err: any) {

            setError(err.response?.data?.message || "Registration failed. Please try again.");
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
                <RegisterForm onRegister={handleRegister} onSwitchToLogin={onSwitchToLogin} />
                {loading && <div className="text-center mt-4 text-gray-600">Loading...</div>}
            </Card>
        </AuthLayout>
    );
}