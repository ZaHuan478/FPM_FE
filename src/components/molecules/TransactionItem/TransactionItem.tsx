import type { LucideIcon } from "lucide-react";

interface TransactionItemProps {
  name: string;
  category: string;
  amount: number;
  date: string;
  icon: LucideIcon;
}

export function TransactionItem({ name, category, amount, date, icon: Icon }: TransactionItemProps) {
  const isPositive = amount > 0;

  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-accent transition-colors">
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-xl ${
            isPositive
              ? "bg-green-100 dark:bg-green-900/30"
              : "bg-slate-100 dark:bg-slate-800"
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              isPositive
                ? "text-green-600 dark:text-green-400"
                : "text-slate-600 dark:text-slate-400"
            }`}
          />
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{category}</div>
        </div>
      </div>
      <div className="text-right">
        <div
          className={`font-medium ${
            isPositive ? "text-green-600 dark:text-green-400" : ""
          }`}
        >
          {isPositive ? "+" : ""}${Math.abs(amount).toFixed(2)}
        </div>
        <div className="text-sm text-muted-foreground">{date}</div>
      </div>
    </div>
  );
}
