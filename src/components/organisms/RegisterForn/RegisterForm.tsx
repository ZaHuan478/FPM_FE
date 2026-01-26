import { useState } from "react";
import Button from "../../atoms/Button/Button";
import { FormInput } from "../../molecules/FormInput/FormInput";
import { Mail, Lock, User } from "lucide-react";
import Separator from "../../atoms/Separator/Separator";
import GoogleButton from "../../molecules/GoogleButton/GoogleButton";

type RegisterFormProps = {
    onRegister: (fullName: string, email: string, password: string) => void;
    onSwitchToLogin?: () => void;
}

export function RegisterForm({ onRegister, onSwitchToLogin }: RegisterFormProps) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRegister(fullName, email, password);
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                <p className="text-gray-500">Sign up to start managing your finances</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <FormInput
                    label="Full Name"
                    icon={User}
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={setFullName}
                />

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

                <Button type="submit" className="w-full h-12 rounded-xl">
                    Create Account
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


            {onSwitchToLogin && (
                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-500">Already have an account?</span>{" "}
                    <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                        onClick={onSwitchToLogin}
                    >
                        Sign In
                    </button>
                </div>
            )}
        </div>
    );
}
