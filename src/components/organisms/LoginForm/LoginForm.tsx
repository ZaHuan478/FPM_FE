import { useState } from "react";
import Button from "../../atoms/Button/Button";
import { FormInput } from "../../molecules/FormInput/FormInput";
import { Mail, Lock } from "lucide-react";
import Separator from "../../atoms/Separator/Separator";
import GoogleButton from "../../molecules/GoogleButton/GoogleButton";

type LoginFormProps = {
    onLogin: (email: string, password: string) => void;
    onSwitchToRegister?: () => void;
}

export function LoginForm({ onLogin, onSwitchToRegister }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="text-gray-500">Sign in to access your dashboard</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <FormInput
                    label="Email Address"
                    icon={Mail}
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={setEmail}
                />

                <FormInput
                    label="Password"
                    icon={Lock}
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={setPassword}
                />

                <div className="flex justify-end">
                    <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                        Forgot password?
                    </button>
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl">
                    Sign In
                </Button>
            </form>

            <div className="my-6">
                <Separator>
                    Or continue with
                </Separator>
            </div>

            <div className="my-6">
                <GoogleButton />
            </div>

            {onSwitchToRegister && (
                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-500">Don't have an account?</span>{" "}
                    <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                        onClick={onSwitchToRegister}
                    >
                        Sign Up
                    </button>
                </div>
            )}
        </div>
    );
}