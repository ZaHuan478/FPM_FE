import { Card, CardContent, CardHeader, CardTitle } from "../../atoms/Card/Card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "primary" | "success" | "danger";
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, subtitle, icon: Icon, variant = "default", trend }: StatCardProps) {
  const variantStyles = {
    default: "border-0 shadow-lg hover:shadow-xl transition-shadow",
    primary: "md:col-span-2 border-0 shadow-lg overflow-hidden relative",
    success: "border-0 shadow-lg hover:shadow-xl transition-shadow",
    danger: "border-0 shadow-lg hover:shadow-xl transition-shadow",
  };

  const iconVariantStyles = {
    default: "bg-slate-100 dark:bg-slate-800",
    primary: "bg-white/10",
    success: "bg-green-100 dark:bg-green-900/30",
    danger: "bg-red-100 dark:bg-red-900/30",
  };

  const iconColorStyles = {
    default: "text-slate-600 dark:text-slate-400",
    primary: "text-white",
    success: "text-green-600 dark:text-green-400",
    danger: "text-red-600 dark:text-red-400",
  };

  if (variant === "primary") {
    return (
      <Card className={variantStyles.primary}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="text-white/90 flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-5xl text-white mb-4">{value}</div>
          {trend && (
            <div className={`flex items-center gap-2 ${trend.isPositive ? 'text-green-200' : 'text-red-200'}`}>
              <span>{trend.isPositive ? '+' : ''}{trend.value}</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={variantStyles[variant]}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-base text-muted-foreground">{title}</span>
          <div className={`p-2 rounded-xl ${iconVariantStyles[variant]}`}>
            <Icon className={`w-5 h-5 ${iconColorStyles[variant]}`} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl mb-2">{value}</div>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
