import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";
import type { LucideIcon } from "lucide-react";

type FormInputProps = {
    label: string;
    type?: string;
    placeholder?: string;
    icon: LucideIcon;
    value: string;
    onChange: (value: string) => void;
}

export function FormInput({
    label,
    type = "text",
    placeholder,
    icon: Icon,
    value,
    onChange,
}: FormInputProps) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pl-10 h-12 rounded-xl"
                    required
                />
            </div>
        </div>
    );
}